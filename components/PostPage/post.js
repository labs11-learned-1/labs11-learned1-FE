import React, {useState} from "react";
import Link from "next/link";

//FIREBASE
import * as firebase from "firebase";
import { loadDB } from "../../firebaseConfig/firebase";
import {Store} from '../store'
import {getReviewList, editReview, addReview, deleteReview} from '../firebaseAPI/firebaseReviews'
import {getContentById} from '../firebaseAPI/firebaseCollection'
import { addPost } from "../firebaseAPI/firebasePosts";

//MATERIAL UI
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    postPageWrapper: {

    },
    myReview: {

    }
}));

const PostInfoPage = props => {
    const classes = useStyles();
    const {state, dispatch} = React.useContext(Store)

    //General Post Infomration States
    const [contentInfo, setContentInfo] = useState({});

    //Review States
    const [reviewContent, setReviewContent] = useState([]);
    const [myReview, setMyReview] = useState({title: "", comment: "", rating: 5});
    const [editingMyReview, setEditingMyReview] = useState(true);
    const [baseReview, setBaseReview] = useState(null)

    //Gets the review id from the url parameters and uses the id retrieved to get the article information
    //from our database. Then sets the contentInfo state equal to that information.
    const getPostContent = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const contentID = urlParams.get("content").split("//").pop().replace(/[/]/g, "-");
        const content = await getContentById(contentID).then((res) => {
            setContentInfo({title: res.title, author: res.author, description: res.description, image: res.photoUrl, link: res.link})
        })  
    }

    //Gets the review id from the url parameters and uses the id retrieved to get all reviews associated
    //with that article. Puts all reviews that are not the users into an array and into reviewContentState.
    //User review is stored seperately in myReview.
    const getReviewContent = async() => {
        const urlParams = new URLSearchParams(window.location.search);
        const contentID = urlParams.get("content")
        const content = await getReviewList(contentID).then((res) => {
            let reviewArr = [];
            res.map((review) => {
                if(review.data().userId == state.userID) {
                    setMyReview({...review.data(), reviewID: review.id});
                    setBaseReview({title: review.data().title, comment: review.data().comment, rating: review.data().rating});
                } else {
                    reviewArr.push(review.data());
                }
            })
            setReviewContent(reviewArr);
        })  
    }

    //Calls the function holding the api call to delete the review in database, and removes local myReview.
    const handleReviewDelete = async() => { 
        await deleteReview(myReview.reviewID).then(() => {
            setMyReview({title: "", comment: "", rating: 5});
            setBaseReview(null);
        })

    }

    //Sets editingMyReview to false to switch from input to text. Calls function with api call to update our review.
    const handleEditSave = async() => {
        setEditingMyReview(false);
        editReview(myReview.reviewID, myReview.comment, myReview.title, myReview.rating)
    }

    // When an edit is cancelled we reset the values back to the original.
    const handleEditCancel = async() => {
        setEditingMyReview(false);
        setMyReview({...myReview, title: baseReview.title , comment: baseReview.comment, rating: baseReview.rating});
    }

    //Uses the imported addReview function to make an api call to the database to add a new review. With the returned review id
    //it sets the baseReview and myReview, and attaches the reviewId to myReview so the user can edit or delete the new 
    //review in real time without refreshing.
    const handleReviewPost = async() => {
        setEditingMyReview(false);
        await addReview(myReview.rating, myReview.comment, myReview.title, state.userID, contentInfo.link, state.userImage, state.displayName)
        .then((res) => {
            console.log(res)
            if(res) {
                setMyReview({...myReview, reviewID: res})
                setBaseReview({title: myReview.title, comment: myReview.comment, rating: myReview.rating});
            } else {
                alert("Error creating review")
            }
        })
    }

    //Handler used to update myReview depending on content type.
    const reviewChangeHandler = (ev) => {
        setMyReview({ ...myReview, [ev.target.name]: ev.target.value });
    }

    React.useEffect(()=>{
        getPostContent();
        getReviewContent();
    }, [])

    //Conditional rendering variable initialization for following if statement...
    let addMyListButton;

    //Conditional rendering variable initialization for following if statement...
    let myReviewContent;
    let reviewContentType;
    let postButton;
    let ratingButtons = <div>
        <button
        style={{ backgroundColor: (myReview ? (myReview.rating >= 1 ? "yellow" : "") : null) }}
        onClick={() => {editingMyReview ? setMyReview({ ...myReview, rating: 1 }) : null}}
        />
        <button
        style={{ backgroundColor: (myReview ? (myReview.rating >= 2 ? "yellow" : "") : null)}}
        onClick={() => {editingMyReview ? setMyReview({ ...myReview, rating: 2 }) : null}}
        />
        <button
        style={{ backgroundColor: (myReview ? (myReview.rating >= 3 ? "yellow" : "") : null)}}
        onClick={() => {editingMyReview ? setMyReview({ ...myReview, rating: 3 }) : null}}
        />
        <button
        style={{ backgroundColor: (myReview ? (myReview.rating >= 4 ? "yellow" : "") : null)}}
        onClick={() => {editingMyReview ? setMyReview({ ...myReview, rating: 4 }) : null}}
        />
        <button
        style={{ backgroundColor: (myReview ? (myReview.rating >= 5 ? "yellow" : "") : null)}}
        onClick={() => {editingMyReview ? setMyReview({ ...myReview, rating: 5 }) : null}}
        />
    </div>

    if(baseReview) {
        
        postButton = null;
        if(!editingMyReview) {
            reviewContentType = 
            <div>
                <div>
                    <h3>{myReview.title}</h3>
                    <p>{myReview.comment}</p>
                    {ratingButtons}
                </div>
                <Button
                color="primary"
                onClick={() => {
                    addPost(myReview.title, myReview.comment, myReview.contentCollectionId, state.userID);
                }}
                >
                    SHARE REVIEW
                </Button>
                <Button
                        color="primary"
                        onClick={() => {
                            setEditingMyReview(true);
                        }}
                        >
                        EDIT
                </Button>
                <Button
                        color="primary"
                        onClick={() => {
                            handleReviewDelete()
                        }}
                        >
                        DELETE
                </Button>
            </div>   
        } else {
            reviewContentType= 
            <div>
                <div>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="title"
                        placeholder="Title"
                        className={classes.textField}
                        fullWidth
                        value={myReview.title}
                        onChange={reviewChangeHandler}
                    />
                    <TextField
                        id="filled-multiline-static"
                        multiline
                        rows="10"
                        name="comment"
                        placeholder="Write your review here..."
                        className={classes.textField}
                        margin="normal"
                        variant="filled"
                        value={myReview.comment}
                        onChange={reviewChangeHandler}
                    />
                </div>
                {ratingButtons}
                <div>
                    <Button
                        color="primary"
                        onClick={() => {
                            handleEditSave();
                        }}
                        >
                        SAVE
                    </Button>
                    <Button
                        onClick={() => {
                            handleEditCancel();
                        }}
                        color="primary"
                        >
                        CANCEL
                    </Button>
                </div>
            </div>
        }
        myReviewContent = 
            <div className={classes.myReview}>
                <h2>My Review</h2>
                {reviewContentType}
            </div>
        
    } else {
        myReviewContent = 
        <div>
            <div>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name="title"
                    placeholder="Title"
                    className={classes.textField}
                    fullWidth
                    onChange={reviewChangeHandler}
                />
                <TextField
                    id="filled-multiline-static"
                    multiline
                    rows="10"
                    name="comment"
                    placeholder="Write your review here..."
                    className={classes.textField}
                    margin="normal"
                    variant="filled"
                    onChange={reviewChangeHandler}
                />
            </div>
            <div>
                {ratingButtons}
                <Button
                    color="primary"
                    onClick={() => {
                        handleReviewPost();
                    }}
                >
                POST
                </Button>
            </div>
        </div>
    
    
    }

    console.log(myReview)

    return (
        <div className={classes.postPageWrapper}>
            <div>
                <h1>{contentInfo.title}</h1>
                <img src={contentInfo.image}/>
                <p>Author: {contentInfo.author}</p>
                <h3>Description</h3>
                <p>{contentInfo.description}</p>
            </div>
            <div>
            <a href={contentInfo.link}>
                <Button
                    color="primary"
                    onClick={() => {
                        ;
                    }}
                >
                CHECK IT OUT!
                </Button>
            </a>
                {postButton}
            </div>
            {myReviewContent}
            <div>
                <List className={classes.reviewList}>
                    {reviewContent.map(review => 
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={review.displayImage} />
                            </ListItemAvatar>
                            <ListItemText
                            primary={review.title}
                            secondary={
                                <React.Fragment>
                                <Typography
                                    component="span"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {review.displayName}
                                </Typography>
                                {review.comment}
                                </React.Fragment>
                            }
                            />
                        </ListItem>
                    )}
                </List>
            </div>
        </div>
    );
};

export default PostInfoPage;

//I will continue styling the algolia search bar, along with styling and adding a little more functionality to the product page.
//Yesterday was a lot of peer programming, making sure everyone had a working form of the master branch because for some reason it felt like we all had different information.