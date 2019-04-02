import React from 'react';

//REACT
import axios from 'axios';
import PropTypes from 'prop-types';
import Navigation from '../Navigation/Nav';
import MyListCard from './card';


//FIREBASE
import * as firebase from "firebase";
import { loadDB } from "../../firebaseConfig/firebase";
import {addReview, editReview} from '../firebaseAPI/firebaseReviews';

//MaterialUI
import { withStyles } from '@material-ui/core/styles';
import { Store } from "../store";

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


 

const styles = theme => ({
    reviewDialog: {
        width: '548px',
        margin: '0',
        backgroundColor: '#3f51b5',
        '& h2': {
            color: 'white',
            fontWeight: 'bold'
        },
    },
    textField: {
        width: '100%',
        marginTop: '30px',
        '& div': {
            backgroundColor: 'white',
            padding: '0 0 0 0',
            '&:hover': {
                backgroundColor: 'white',
            }
        },
        '% label': {
            padding: '0',
            tranform : ''
        }
    },
    reviewButtons: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%'
    },
    toolbar : {
        padding:0,
        margin:"0 auto",
        width:"48%",
        display: 'flex',
        justifyContent: "space-between",
    },
    menu: {
        borderRadius: '50%',
        fontWeight: 'bold',
        fontSize: '20px'
    },
    homepageWrapper:{
        width:"80%",
        marginLeft:"26%"
    },
    myList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    myHeader: {
        display: 'flex',
        borderBottom: '1.5px solid rgba(0,0,0,.1)',
        margin: '20px',
        paddingBottom: '20px',
        alignItems: 'center',
        '& h1': {
            margin: '0 20px 0 20px'
        },
        '& button': {
            marginLeft: '20px'
        }
    },
    learningLabWrap: {
        marginTop: '40px'
    },
    currentCourses: {
        minHeight: '100px'
    }
});

const LearningLab = (props) => {

    //Might just use one big state, but don't want it to look too much like normal setState so
    // I don't really want to.
    const { classes } = props;
    const {state, dispatch} = React.useContext(Store)
    const [open, setOpen] = React.useState(false);
    const [openReview, setOpenReview] = React.useState(false);
    const [link, setLink] = React.useState("");
    const [metaData, setMetaData] = React.useState({});
    const [reviewContent, setReviewContent] = React.useState({rating: 5, title: '', content: '', postId: '', reviewID: ''});
    const [submitType, setSubmitType] = React.useState('');
    const [list, setList] = React.useState([]);
    const [UdemyList, setUdemyList] = React.useState([]);


    
 

    const onChangeHandler = ev => {
        setLink(ev.target.value)
    }

    //UPDATES REVIEW CONTENT WHEN INPUT CHANGES
    const reviewChange = ev => {
        setReviewContent({...reviewContent, [ev.target.name]: ev.target.value})
    }

    const addContent = async () => {
        let result = await loadDB();
        let db = result.firestore();
        let newLink = link.split("//").pop().replace(/[/]/g, "-");
        const contentRef = db.collection('content-collection');
        //do a call on a doc where new link is
        contentRef.doc(newLink).get().then((docSnapshot)=> {
        //see if it exists
            if(docSnapshot.exists){
                //if it exists, just update the array with the userId
                contentRef.doc(newLink).update({userList: firebase.firestore.FieldValue.arrayUnion(state.userID)}).then(()=>{
                    db.collection('user').doc(state.userID).update({ myList: firebase.firestore.FieldValue.arrayUnion(newLink)}).then(() => {
                        setList([...list, {author: metaData.author, description: metaData.description, link: link, photoUrl: metaData.img, review: null, title: metaData.title}])
                    })
                    console.log('Hello')
                    
                }).catch(err => {
                    console.log("Error adding newLink to myList in user docs", err)
                });
            } else {
                //else create the whole new document
                contentRef.doc(newLink).set({
                    title: metaData.title,
                    author: metaData.author,
                    photoUrl: metaData.img,
                    description: metaData.description,
                    link: link,
                    // Pseudo code make a real array
                    userList: firebase.firestore.FieldValue.arrayUnion(state.userID)
                }).then(() => {
                    console.log("Added content to the db", )
                    db.collection('user').doc(state.userID).update({ myList: firebase.firestore.FieldValue.arrayUnion(newLink)}).then(() => { 
                        setList([...list, {author: metaData.author, description: metaData.description, link: link, photoUrl: metaData.img, review: null, title: metaData.title}])
                    })
                }).catch((err) => {
                    console.log("error adding content to the db", err);
                });
            }
        }).catch((err) => {
            console.log("Error with getting the stuff. try a db call here if it is going to this catch", err)
        })
    }

    const updateReview = () => {
        const {rating, title, content, reviewID} = reviewContent;
        editReview(reviewID, content, title, rating)
        setReviewContent({rating: 5, title: '', content: '', postId: ''})
        setOpenReview(false)
    }

    const postReview = () => {
        const {rating, content, title, postId} = reviewContent;
        let newLink = postId.split("//").pop().replace(/[/]/g, "-");
        addReview(rating, content, title, state.userID, newLink);
        setOpenReview(false);
    }

    const getContentByUserId = async () => {
        let arr = [];
        let result = await loadDB();
        let db = result.firestore();
        db.collection("content-collection").where("userList", "array-contains", state.userID)
        .get()
        .then(async function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                const result = doc.data()
                console.log("RESULT", result)
                let newLink = (result.link).split("//").pop().replace(/[/]/g, "-");
                db.collection("reviews").where("userId", "==", state.userID).where("contentCollectionId", "==", newLink)
                .get()
                .then(async(res) => {
                    let response;
                    if(res.docs.length > 0) {
                        response = res.docs[0].data();
                        response["reviewId"] = res.docs[0].id;
                    } else {
                        response = null;
                    }
                    result["review"] = response;
                    setList(list => [
                        ...list, result
                    ])
                })
                .catch(err => {
                    console.log(err)
                })   
            
            }); 
            
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
        console.log("MY ARRAY", arr)
    }

    const getUdemyByUserId = async () => {
        let arr = [];
        let result = await loadDB();
        let db = result.firestore();
        db.collection("content-collection").where("UserList", "array-contains", state.userID)
        .get()
        .then(async function(querySnapshot) {
            await querySnapshot.forEach(function(doc) {
                const result = doc.data()
                arr.push(result)
                console.log("udemy result", result) 
            }); 
            console.log("this is the array", arr)
            setUdemyList([...arr])
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }

    const handleSubmit = () => {
        // sending link to web scraping backend that returns meta tags
        axios.post('https://getmetatag.herokuapp.com/get-meta', {url:link})
        .then((res) => {
            // saves useful meta tags to local state
            const { title, description, author, image } = res.data;
            setMetaData({title: title, description: description, author: author, img: image});  
        })
        .catch(err => {
            alert("ERROR");
        })
        setOpen(false);
    }

    React.useEffect(
        () => {
            getContentByUserId()
            getUdemyByUserId()
        },
        []
    );

    React.useEffect(
        () => {
            
            if (metaData.title) {
                console.log("HEY IM BEING CALLED!")
                addContent()
            }
        },
        [metaData.title]
    );

    console.log(reviewContent)
    return (
        <div>
            <Navigation />
            <div className={classes.learningLabWrap}>
                <div className={classes.myHeader}>
                    <h1>Current Courses</h1>
                </div>
                <div className={classes.myList}>
                {/* This is where user courses will show up */}
                {UdemyList.map(course => {
                        return <MyListCard content={course} /> 
                    })}
                </div>
                <div className={classes.myHeader}>
                    <h1>My List</h1>
                    <Fab color="primary" aria-label="Add" onClick={() => setOpen(true)}>
                        <AddIcon />
                    </Fab>
                </div>

                
                <div className={classes.myList}>
                    {console.log("MY LIST", list)} 
                    {list.map(item => 
                        <MyListCard content={item} reviewContent={reviewContent} setSubmitType={setSubmitType} setOpenReview={setOpenReview} setReviewContent={setReviewContent}/>  
                    )}
                </div>
            {/* COMPONENT FOR ADDING AN ITEM TO 'MY LIST' */}
            <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Enter Link to Blog/Course</DialogTitle>

                <DialogContent>
                    <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Link"
                    fullWidth
                    multiline
                    onChange={onChangeHandler}
                    />
                </DialogContent>
                
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                    Cancel
                    </Button>
                    {/* Change this to handle submit */}
                    <Button onClick={()=>handleSubmit(state.userID, link)} color="primary"> 
                    Add
                    </Button>
                </DialogActions>

            </Dialog>


            {/* THIS IS THE REVIEW POSTING POPUP COMPONENT*/}
            <Dialog  open={openReview}  onClose={() => setOpenReview(false)} aria-labelledby="simple-dialog-title">
                <DialogTitle className={classes.reviewDialog}id="simple-dialog-title">{submitType == 'post'? 'Post Review': 'Edit Review'}</DialogTitle>
                <DialogContent>
                   
                    <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name="title"
                    placeholder='Title'
                    className={classes.textField}
                    fullWidth
                    value={reviewContent.title}
                    onChange={reviewChange}
                    />

                    <TextField
                        id="filled-multiline-static"
                        multiline
                        rows="10"
                        name="content"
                        placeholder="Write your review here..."
                        className={classes.textField}
                        margin="normal"
                        variant="filled"
                        value={reviewContent.content}
                        onChange={reviewChange}
                    />
                    <div className={classes.reviewButtons}>
                        <button style={{backgroundColor: reviewContent.rating >= 1 ? 'yellow' : ''}} onClick={() => setReviewContent({...reviewContent, rating: 1})}></button>
                        <button style={{backgroundColor: reviewContent.rating >= 2 ? 'yellow' : ''}} onClick={() => setReviewContent({...reviewContent, rating: 2})}></button>
                        <button style={{backgroundColor: reviewContent.rating >= 3 ? 'yellow' : ''}} onClick={() => setReviewContent({...reviewContent, rating: 3})}></button>
                        <button style={{backgroundColor: reviewContent.rating >= 4 ? 'yellow' : ''}} onClick={() => setReviewContent({...reviewContent, rating: 4})}></button>
                        <button style={{backgroundColor: reviewContent.rating >= 5 ? 'yellow' : ''}} onClick={() => setReviewContent({...reviewContent, rating: 5})}></button>
                        <Button color="primary" onClick={() => {submitType == 'post' ? postReview() : updateReview() }} >
                            SAVE
                        </Button>
                        <Button onClick={() => {
                            setOpenReview(false)
                            setReviewContent({rating: 5, title: '', content: '', postId: ''})
                            }} color="primary">
                            CANCEL
                        </Button>
                        
                    </div>
                    

                </DialogContent>
            </Dialog>


            {/* COMPONENT THAT WILL BE PLACED WITH EVERY ITEM IN 'MY LIST' TO ALLOW USER TO REVIEW*/}
            
                
            
                
            </div>
        </div>
    );
}

LearningLab.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LearningLab);