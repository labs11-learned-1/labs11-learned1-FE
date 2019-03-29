import React from 'react';

//REACT
import PostForm from '../Posts/postForm';
import ReviewForm from '../Reviews/reviewForm';
import axios from 'axios';
import PropTypes from 'prop-types';
import Navigation from '../Navigation/Nav';
import Card from './card';


//FIREBASE
import * as firebase from "firebase";
import { loadDB } from "../../firebaseConfig/firebase";
import {addReview, getReview} from '../firebaseAPI/firebaseReviews';

//MaterialUI
import { withStyles } from '@material-ui/core/styles';
import { Store } from "../store";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
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
    const [reviewContent, setReviewContent] = React.useState({rating: 5, title: '', content: '', postId: ''})
    const [openMenu, setOpenMenu] = React.useState(false);
    const [menuType, setMenuType] = React.useState('');
    const [list, setList] = React.useState([]);

    const onChangeHandler = ev => {
        setLink(ev.target.value)
    }

    //UPDATES REVIEW CONTENT WHEN INPUT CHANGES
    const reviewChange = ev => {
        setReviewContent({...reviewContent, [ev.target.name]: ev.target.value})
    }

    const addContent = async () => {
        console.log(metaData)
        let result = await loadDB();
        let db = result.firestore();
        let newLink = link.split("//").pop().replace(/[/]/g, "-");
        console.log('newLink:  ', newLink)
        const contentRef = db.collection('content-collection');
        //do a call on a doc where new link is
        contentRef.doc(newLink).get().then((docSnapshot)=> {
        //see if it exists
            if(docSnapshot.exists){
                //if it exists, just update the array with the userId
                contentRef.doc(newLink).update({userList: firebase.firestore.FieldValue.arrayUnion(state.userID)}).then(()=>{
                    db.collection('user').doc(state.userID).update({ myList: firebase.firestore.FieldValue.arrayUnion(newLink)})
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
                db.collection('user').doc(state.userID).update({ myList: firebase.firestore.FieldValue.arrayUnion(newLink)})
            }).catch((err) => {
                console.log("error adding content to the db", err);
            });
        }
    }).catch((err) => {
        console.log("Error with getting the stuff. try a db call here if it is going to this catch", err)
    })
    
    }

    //MAKES THE CALL TO API TO ADD THE REVIEW, STILL NEEDS POST ID
    const postReview = () => {
        const {rating, content, title, postId} = reviewContent;
        addReview(rating, content, title, state.userID, /*SOME POST ID*/)
        setOpenReview(false)
    }

    const retrieveReview = () => {
        
    }

    const prepareReview = (ev) => {
        setReviewContent({...reviewContent, postId: ev.target.id /*Whatever id it's supposed to be*/})
        setOpenReview(true)
        setOpenMenu(false)
    }
    
    const getContentByUserId = async () => {
        let arr = [];
        let result = await loadDB();
        let db = result.firestore();
        db.collection("content-collection").where("userList", "array-contains", state.userID)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                const result = doc.data()
                arr.push(result);
                console.log(doc.id,"=>",result)
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
        setList(arr)
        
    }

    const handleSubmit = () => {
        // sending link to web scraping backend that returns meta tags
        axios.post('https://getmetatag.herokuapp.com/get-meta', {url:link})
        .then((res) => {
            // saves useful meta tags to local state
            const { title, description, author, image } = res.data;
            setMetaData({title: title, description: description, author: author, img: image});  
            // sends meta links and info to the firebase backend to be saved
        })
        .catch(err => {
            alert("ERROR");
        })
        setOpen(false);
    }

    React.useEffect(
        () => {
          if (metaData.title) {
            addContent()
          }
        },
        [metaData.title]
      );

    console.log(reviewContent);
    return (
        <div>
            <Navigation />
            <div>
                <button onClick={()=>getContentByUserId()}>refresh</button>
                <h1>Current Courses</h1>
                <div className="thisIsWhereCoursesCardsWillGo">
                {/* This is where user courses will show up */}
                </div>
                <h1>My List</h1>
                <div className="my-list">
                    {console.log(list)}
                </div>
                <Fab color="primary" aria-label="Add" onClick={() => setOpen(true)}>
                    <AddIcon />
                </Fab>

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
                    <Button onClick={()=>handleSubmit(state.userID, link)} color="primary"> {/****************************************************************************8 */}
                    Add
                    </Button>
                </DialogActions>

            </Dialog>


            {/* THIS IS THE REVIEW POSTING POPUP COMPONENT*/}
            <Dialog  open={openReview}  onClose={() => setOpenReview(false)} aria-labelledby="simple-dialog-title">
                <DialogTitle className={classes.reviewDialog}id="simple-dialog-title">Post Review</DialogTitle>
                <DialogContent>
                   
                    <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name="title"
                    placeholder='Title'
                    className={classes.textField}
                    fullWidth
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
                        onChange={reviewChange}
                    />
                    <div className={classes.reviewButtons}>
                        <button style={{backgroundColor: reviewContent.rating >= 1 ? 'yellow' : ''}} onClick={() => setReviewContent({...reviewContent, rating: 1})}></button>
                        <button style={{backgroundColor: reviewContent.rating >= 2 ? 'yellow' : ''}} onClick={() => setReviewContent({...reviewContent, rating: 2})}></button>
                        <button style={{backgroundColor: reviewContent.rating >= 3 ? 'yellow' : ''}}onClick={() => setReviewContent({...reviewContent, rating: 3})}></button>
                        <button style={{backgroundColor: reviewContent.rating >= 4 ? 'yellow' : ''}} onClick={() => setReviewContent({...reviewContent, rating: 4})}></button>
                        <button style={{backgroundColor: reviewContent.rating >= 5 ? 'yellow' : ''}} onClick={() => setReviewContent({...reviewContent, rating: 5})}></button>
                        <Button onClick={() => postReview()} color="primary">
                            POST
                        </Button>
                        <Button onClick={() => setOpenReview(false)} color="primary">
                            CANCEL
                        </Button>
                    </div>
                    

                </DialogContent>
            </Dialog>


            {/* COMPONENT THAT WILL BE PLACED WITH EVERY ITEM IN 'MY LIST' TO ALLOW USER TO REVIEW*/}
            <div>
                <Button
                    buttonRef={node => {
                    Button.anchorEl = node;
                    }}
                    aria-owns={openMenu ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={() => setOpenMenu(!openMenu)}
                    className={classes.menu}
                >
                    . . .
                </Button>
                <Popper open={openMenu} anchorEl={Popper.anchorEl} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        id="menu-list-grow"
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                        <ClickAwayListener onClickAway={() => setOpenMenu(false)}>
                            <MenuList>
                                    <MenuItem id={450} onClick={prepareReview}>Add Review</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                        </Paper>
                    </Grow>
                    )}
                </Popper>
            </div>
                
            </div>
        </div>
    );
}

LearningLab.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LearningLab);