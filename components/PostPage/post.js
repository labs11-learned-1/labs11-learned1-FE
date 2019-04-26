import React, {useState} from "react";
import Link from "next/link";

//FIREBASE
import {Store} from '../store'
import {getReviewList, editReview, addReview, deleteReview} from '../firebaseAPI/firebaseReviews'
import {getContentById, addRating} from '../firebaseAPI/firebaseCollection'
import { addPost } from "../firebaseAPI/firebasePosts";

//TOASTIFY
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//MATERIAL UI
import { makeStyles } from "@material-ui/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from "@fortawesome/free-solid-svg-icons"

const MAX_REVIEW_TITLE_LENGTH = 200;
const MAX_REVIEW_CONTENT_LENGTH = 1000;


const useStyles = makeStyles(theme => {
    return {
    postPageWrapper: {
        margin: '0 auto',
        maxWidth: '900px',
        width: '100%',
        marginBottom: '40px',
        marginTop: '90px',
    },
    card: {
        width: '900px',
    },
    media: {
        maxWidth: '900px',
        paddingTop: '56.25%', // 16:9
        
    },
    content: {
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        padding: '20px',
        marginTop: '20px'
    },
    extraInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    author: {
        display: 'flex',
        paddingTop: '10px'
    },
    myReview: {
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        marginTop: '20px',
        padding: '20px 40px 20px 40px',
        '& div': {
            width: '100%'
        },
        
    },
    myReviewContent: {
        boxShadow: 'none',
        paddingBottom: '20px',
        width: '100%'
    },
    myReviewButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        
    },
    presentReviewButtons: {
        '& button': {
            backgroundColor: theme.mixins.modernPink,
            color: 'white',      
        },
        '& :hover': {
            backgroundColor: `${theme.mixins.pinkBoot} !important`,
        }
    },
    ratingButtons: {
        display: 'flex',
        alignItems: 'center',
        padding: ' 5px 5px 5px 0',
        '& p': {
            paddingLeft: '10px'
        },
        '& button': {
            margin: '2px',
            height: '15px'
        }
    },
    star : {
        padding: '2px',
        '& path': {
            stroke: 'black', 
            strokeWidth: 10,
        }
    },
    writeReview: {
        width: '100%'
    },
    reviewListWrapper: {
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        marginTop: '20px',
        padding: '20px',
       
    },
    reviewItem: {
        border: '1px solid #ebebe0',
    },
    articleInfo: {
        paddingTop: '20px'
    },
    reviewListTR: {
        display: 'flex',
        alignItems: 'center'
    },
    noReviews: {
        fontSize: '1.3rem',
        textAlign: 'center',
        '& img': {
            width: '250px',
            height: '250px'
        }
    },
    reviewTitleInput: {
        '& label': {
            paddingLeft: '12px'
        },
        '& input': {
            paddingLeft: '9px'
        }
    },
    '@media(max-width: 400px)': {
        extraInfo: {
            display: 'block'
        }
    }
}});

const PostInfoPage = props => {
    const classes = useStyles(props.theme);
    const {state, dispatch} = React.useContext(Store);

    //General Post Infomration States
    const [contentInfo, setContentInfo] = useState({});

    //Review States
    const [reviewContent, setReviewContent] = useState([]);
    const [myReview, setMyReview] = useState({title: "", comment: "", rating: 5});
    const [editingMyReview, setEditingMyReview] = useState(true);
    const [baseReview, setBaseReview] = useState(null);
    const [reviewTitleLength, setReviewTitleLength] = useState(0);
    const [reviewContentLength, setReviewContentLength] = useState(0);
    const [windowURL, setWindowURL] = useState("");
 
    const notifyHandler = (type, success) => {
        if(type === 'post') {
            if (success) {
                toast.success("Successfuly posted review!", {
                    position: toast.POSITION.BOTTOM_RIGHT
                  });
            } else {
                toast.error("Error posting review...", {
                    position: toast.POSITION.BOTTOM_RIGHT
                  });
            }
        } else if (type === 'delete') {
            if (success) {
                toast.success("Successfuly deleted review!", {
                    position: toast.POSITION.BOTTOM_RIGHT
                  });
            } else {
                toast.error("Error deleting review...", {
                    position: toast.POSITION.BOTTOM_RIGHT
                  });
            }
        } else if (type === 'edit') {
            if (success) {
                toast.success("Successfuly saved review!", {
                    position: toast.POSITION.BOTTOM_RIGHT
                  });
            } else {
                toast.error("Error saving review...", {
                    position: toast.POSITION.BOTTOM_RIGHT
                  });
            }
        } else {
            if (success) {
                toast.success("Successfuly shared review!", {
                    position: toast.POSITION.BOTTOM_RIGHT
                  });
            } else {
                toast.error("Error sharing review...", {
                    position: toast.POSITION.BOTTOM_RIGHT
                  });
            }
        }
        
    }

    //Gets the review id from the url parameters and uses the id retrieved to get the article information
    //from our database. Then sets the contentInfo state equal to that information.
    const getPostContent = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const contentID = urlParams.get("content").split("//").pop().replace(/[/]/g, "-");
        await getContentById(contentID).then((res) => {
            setContentInfo({title: res.title, author: res.author, description: res.description, image: res.photoUrl, link: res.link, numRatings: res.numRatings, avgRating: res.avgRating});
        }); 
    }

    //Gets the review id from the url parameters and uses the id retrieved to get all reviews associated
    //with that article. Puts all reviews that are not the users into an array and into reviewContentState.
    //User review is stored seperately in myReview.
    const getReviewContent = async() => {
        const urlParams = new URLSearchParams(window.location.search);
        const contentID = urlParams.get("content");
        await getReviewList(contentID).then((res) => {
            let reviewArr = [];
            res.map((review) => {
                if(review.data().userId == state.userID) {
                    setEditingMyReview(false);
                    setMyReview({...review.data(), reviewID: review.id});
                    setBaseReview({title: review.data().title, comment: review.data().comment, rating: review.data().rating});
                    setReviewContentLength(review.data().comment.length);
                    setReviewTitleLength(review.data().title.length);
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
            console.log(baseReview.rating)
            addRating(contentInfo.link, null, "delete", baseReview.rating);
            console.log(baseReview.rating)
            notifyHandler('delete', true);
            setMyReview({title: "", comment: "", rating: 5});
            setBaseReview(null);
            setReviewContentLength(0);
            setReviewTitleLength(0);
        }).catch(err => {
            notifyHandler('delete', false);
        })

    }

    //Sets editingMyReview to false to switch from input to text. Calls function with api call to update our review.
    const handleEditSave = async() => {
        setEditingMyReview(false);
        await editReview(myReview.reviewID, myReview.comment, myReview.title, myReview.rating).then(() => {
            notifyHandler('edit', true);
            if(baseReview.rating != myReview.rating) {
                addRating(contentInfo.link, myReview.rating, "edit", baseReview.rating);
            }
            setBaseReview({...myReview, title: myReview.title, comment: myReview.comment, rating: myReview.rating}); 
        }).catch(err => {
            notifyHandler('edit', false);
        })
    }

    // When an edit is cancelled we reset the values back to the original.
    const handleEditCancel = async() => {
        setEditingMyReview(false);
        setReviewContentLength(baseReview.comment.length);
        setReviewTitleLength(baseReview.title.length);
        setMyReview({...myReview, title: baseReview.title , comment: baseReview.comment, rating: baseReview.rating});
    }

    //Uses the imported addReview function to make an api call to the database to add a new review. With the returned review id
    //it sets the baseReview and myReview, and attaches the reviewId to myReview so the user can edit or delete the new 
    //review in real time without refreshing.
    const handleReviewPost = async() => {
        setEditingMyReview(false);
        await addReview(myReview.rating, myReview.comment, myReview.title, state.userID, contentInfo.link, state.userImage, state.displayName)
        .then((res) => {
            if(res) {
                notifyHandler('post', true);
                setMyReview({...myReview, reviewID: res});
                setBaseReview({title: myReview.title, comment: myReview.comment, rating: myReview.rating});
                addRating(contentInfo.link ,myReview.rating, "post", null);
            } else {
                notifyHandler('post', false);
            }
        })
    }

    const handleSharePost = () => {         
        addPost(myReview.comment, contentInfo.link, state.userID, contentInfo.image, state.displayName, state.userImage, contentInfo.title, contentInfo.description).then(() => {
            notifyHandler('share', true);
        }).catch(err => {
            notifyHandler('share', false);
        })
    }

    //Handler used to update myReview depending on content type.
    const reviewChangeHandler = (ev) => {
        if(ev.target.name === 'title') {
            setReviewTitleLength(ev.target.value.length)
        } else {
            setReviewContentLength(ev.target.value.length)
        }
        setMyReview({ ...myReview, [ev.target.name]: ev.target.value });
    }

    React.useEffect(()=>{
        setBaseReview(null);
        setMyReview({title: "", comment: "", rating: 5})
        getPostContent();
        getReviewContent();
    }, [typeof window !== 'undefined' ? window.location.search : ''])

    //Conditional rendering variable initialization for following if statement...
    let myReviewContent;
    let postButton;
    let reviewContentType;
    let ratingButtons = <div className={classes.ratingButtons}>
        <FontAwesomeIcon className={classes.star} icon={faStar} style={{color: (myReview ? (myReview.rating >= 1 ? "yellow" : "white") : null)}}
        onClick={() => {editingMyReview ? setMyReview({ ...myReview, rating: 1 }) : null}}
        />
        <FontAwesomeIcon className={classes.star} icon={faStar} style={{color: (myReview ? (myReview.rating >= 2 ? "yellow" : "white") : null)}}
        onClick={() => {editingMyReview ? setMyReview({ ...myReview, rating: 2 }) : null}}
        />
        <FontAwesomeIcon className={classes.star} icon={faStar} style={{color: (myReview ? (myReview.rating >= 3 ? "yellow" : "white") : null)}}
        onClick={() => {editingMyReview ? setMyReview({ ...myReview, rating: 3 }) : null}}
        />
        <FontAwesomeIcon className={classes.star} icon={faStar} style={{color: (myReview ? (myReview.rating >= 4 ? "yellow" : "white") : null)}}
        onClick={() => {editingMyReview ? setMyReview({ ...myReview, rating: 4 }) : null}}
        />
        <FontAwesomeIcon className={classes.star} icon={faStar} style={{color: (myReview ? (myReview.rating >= 5 ? "yellow" : "white") : null)}}
        onClick={() => {editingMyReview ? setMyReview({ ...myReview, rating: 5 }) : null}}
        />
    </div>

    if(baseReview) {
        
        postButton = null;
        if(!editingMyReview) {
            reviewContentType = 
            <div>
                <div className={classes.myReviewContent}>
                    <h3 style={{wordBreak: 'break-all'}}>{myReview.title}</h3>
                    <p style={{wordBreak: 'break-all'}}>{myReview.comment}</p>
                    {ratingButtons}
                </div>
                <div className={classes.presentReviewButtons}>
                    <Button
                        color="primary"
                        onClick={() => {
                            handleSharePost();
                        }}
                        style={{marginRight: '10px'}}
                        >
                            SHARE REVIEW
                    </Button>
                    <Button
                        color="primary"
                        onClick={() => {
                            setEditingMyReview(true);
                        }}
                        style={{marginRight: '10px'}}
                        >
                        EDIT
                    </Button>
                    <Button
                        color="primary"
                        onClick={() => {
                            handleReviewDelete()
                        }}
                        style={{marginRight: '10px'}}
                        >
                        DELETE
                    </Button>
                </div>
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
                        className={classes.reviewTitleInput}
                        fullWidth
                        value={myReview.title}
                        onChange={reviewChangeHandler}
                        label={`${reviewTitleLength} / ${MAX_REVIEW_TITLE_LENGTH}`}
                        inputProps={{
                            maxLength: MAX_REVIEW_TITLE_LENGTH
                        }}
                    />
                    <TextField
                        id="filled-multiline-static"
                        multiline
                        rows="10"
                        name="comment"
                        placeholder="Write your review here..."
                        className={classes.writeReview}
                        margin="normal"
                        variant="filled"
                        value={myReview.comment}
                        onChange={reviewChangeHandler}
                        label={`${reviewContentLength} / ${MAX_REVIEW_CONTENT_LENGTH}`}
                        inputProps={{
                            maxLength: MAX_REVIEW_CONTENT_LENGTH
                        }}
                    />
                </div>
                <div className={classes.myReviewButtons}>
                    {ratingButtons}
                    <div className={classes.presentReviewButtons} style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button
                            color="primary"
                            onClick={() => {
                                handleEditSave();
                            }}
                            style={{marginLeft: '10px'}}
                            >
                            SAVE
                        </Button>
                        <Button
                            onClick={() => {
                                handleEditCancel();
                            }}
                            color="primary"
                            style={{marginLeft: '10px'}}
                            >
                            CANCEL
                        </Button>
                    </div>
                </div>
            </div>
        }
        myReviewContent = 
            <div>
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
                    className={classes.reviewTitleInput}
                    fullWidth
                    onChange={reviewChangeHandler}
                    label={`${reviewTitleLength} / ${MAX_REVIEW_TITLE_LENGTH}`}
                    inputProps={{
                        maxLength: MAX_REVIEW_TITLE_LENGTH
                    }}
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
                    label={`${reviewContentLength} / ${MAX_REVIEW_CONTENT_LENGTH}`}
                    inputProps={{
                        maxLength: MAX_REVIEW_CONTENT_LENGTH
                    }}
                />
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                {ratingButtons}
                <div  className={classes.presentReviewButtons} style={{width: 'auto'}}>
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
        </div>
    
    
    }
    
    return (
        <div className={classes.postPageWrapper}>
            <div>
                <Card className={classes.content} >
                    <h1 style={{paddingLeft: '10px'}}>{contentInfo.title}</h1>
                    <CardMedia
                        className={classes.media}
                        image={contentInfo.image ? contentInfo.image : 'https://www.honeystinger.com/c.3410322/sca-dev-elbrus/img/no_image_available.jpeg'}
                        />
                    <div className={classes.articleInfo}>
                        <Typography variant="h5" component="h3">
                        Description
                        </Typography>
                        <Typography component="p">
                            {contentInfo.description}
                        </Typography>
                        <div className={classes.author}>
                            <Typography variant="Title" component="h4">
                                Author: {contentInfo.author ? contentInfo.author: 'Not Included'}
                            </Typography>
                        </div>
                        
                        <div className={classes.extraInfo}>
                            <div className={classes.ratingButtons}>
                                <FontAwesomeIcon className={classes.star} icon={faStar} 
                                    style={{color: (contentInfo ? (contentInfo.avgRating >= 1 ? "yellow" : "white") : null)}}
                                />
                                <FontAwesomeIcon className={classes.star} icon={faStar} 
                                    style={{color: (contentInfo ? (contentInfo.avgRating >= 2 ? "yellow" : "white") : null)}}
                                />
                                <FontAwesomeIcon className={classes.star} icon={faStar} 
                                    style={{color: (contentInfo ? (contentInfo.avgRating >= 3 ? "yellow" : "white") : null)}}
                                />
                                <FontAwesomeIcon className={classes.star} icon={faStar} 
                                    style={{color: (contentInfo ? (contentInfo.avgRating >= 4 ? "yellow" : "white") : null)}}
                                />
                                <FontAwesomeIcon className={classes.star} icon={faStar} 
                                    style={{color: (contentInfo ? (contentInfo.avgRating >= 5 ? "yellow" : "white") : null)}}
                                />
                                <p>({contentInfo.numRatings ? contentInfo.numRatings : '0'} Reviews)</p>
                            </div>
                            <a target='_blank' href={contentInfo.link} className={classes.presentReviewButtons} style={{ textDecoration: 'none' }}>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        ;
                                    }}
                                >
                                READ MORE!
                                </Button>
                            </a>
                        </div>
                    </div>
                </Card>

                
            </div>
            
                <Card className={classes.myReview}>
                    <Typography variant="h4" component="h4" style={{paddingBottom: '20px', borderBottom: '1px solid black', marginBottom: '10px'}}>
                        My Review
                    </Typography>
                    {postButton}
                    {myReviewContent}
                </Card>
            <div>
                <Card className={classes.reviewListWrapper}>
                    <Typography variant="h4" component="h4" style={{paddingBottom: '20px', borderBottom: '1px solid black', marginBottom: '10px'}}>
                        Reviews
                    </Typography>
                    <List className={classes.reviewList}>
                        {reviewContent.length === 0 ?  <div className={classes.noReviews}><p>No Reviews...</p> <img src="https://seeklogo.com/images/F/facebook-cry-emoji-logo-DE407E489C-seeklogo.com.png"></img> </div> :
                            reviewContent.map(review => 
                            <ListItem alignItems="flex-start" className={classes.reviewItem}>
                                <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={review.displayImage} />
                                </ListItemAvatar>
                                <ListItemText
                            
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >   
                                            <div className={classes.reviewListTR}>
                                                {review.displayName}
                                                <div className={classes.ratingButtons} style={{marginLeft: '15px'}}>
                                                    <FontAwesomeIcon className={classes.star} icon={faStar} 
                                                        style={{color: (review ? (review.rating >= 1 ? "yellow" : "white") : null)}}
                                                    />
                                                    <FontAwesomeIcon className={classes.star} icon={faStar} 
                                                        style={{color: (review ? (review.rating >= 2 ? "yellow" : "white") : null)}}
                                                    />
                                                    <FontAwesomeIcon className={classes.star} icon={faStar} 
                                                        style={{color: (review ? (review.rating >= 3 ? "yellow" : "white") : null)}}
                                                    />
                                                    <FontAwesomeIcon className={classes.star} icon={faStar} 
                                                        style={{color: (review ? (review.rating >= 4 ? "yellow" : "white") : null)}}
                                                    />
                                                    <FontAwesomeIcon className={classes.star} icon={faStar} 
                                                        style={{color: (review ? (review.rating >= 5 ? "yellow" : "white") : null)}}
                                                    />
                                                </div>
                                            </div>
                                            <div style={{width: '100%', fontWeight: 'bold', marginBottom: '5px', wordBreak: 'break-all'}}>
                                                {review.title} 
                                            </div>
                                            <p style={{wordBreak: 'break-all'}}>{review.comment}</p>
                                        </Typography>                                   
                                    </React.Fragment>
                                }
                                />
                            </ListItem>
                        )}
                    </List>
                </Card>
            </div>
        </div>
    );
};

export default PostInfoPage;

//I will continue styling the algolia search bar, along with styling and adding a little more functionality to the product page.
//Yesterday was a lot of peer programming, making sure everyone had a working form of the master branch because for some reason it felt like we all had different information.