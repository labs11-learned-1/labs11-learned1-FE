import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Navigation from '../Navigation/Nav';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PostForm from '../Posts/postForm';
import ReviewForm from '../Reviews/reviewForm';
import axios from 'axios';
import * as firebase from "firebase";
import { loadDB } from "../../firebaseConfig/firebase";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from './card'

const styles = {
    homepageWrapper:{
        width:"80%",
        marginLeft:"26%"
    },
}

class LearningLab extends React.Component {
    state = {
        open: false,
        link: "",
        metaData : {
            title : "",
            description: "",
            author: "",
            img: "",
        },
        list: []
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onChangeHandler = e => {
        this.setState({...this.state.link, link : e.target.value})
    }

    addContent = async (userId,title, author, photo, description, link) => {
        let result = await loadDB();
        let db = result.firestore();
        let back = "/"
        let newLink = link.split("//").pop().replace(/[/]/g, "-");
        console.log('newLink:  ', newLink)
        db.collection('content-collection').doc(newLink).update({
            title: title,
            author: author,
            photoUrl: photo,
            description: description,
            link: link,
            // Pseudo code make a real array
            userList: firebase.firestore.FieldValue.arrayUnion(userId)
        }).then(() => {
            console.log("Added content to the db", )
            db.collection('user').doc(userId).update({ myList: firebase.firestore.FieldValue.arrayUnion(newLink)})
        }).catch((err) => {
            console.log("error adding content to the db", err);
        });
    }
    
    getContentByUserId = async (userId) => {
        let arr = [];
        let result = await loadDB();
        let db = result.firestore();
        db.collection("content-collection").where("userList", "array-contains", userId)
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
        this.setState({list : arr})
        console.log("state.list ::" , this.state.list);
    }

    handleSubmit = (userId, link) => {
        console.log("This is the user id", userId);
        // sending link to web scraping backend that returns meta tags
        axios.post('https://getmetatag.herokuapp.com/get-meta', {url:this.state.link})
        .then(res => {
            // saves useful meta tags to local state
            const { title, description, author, image } = res.data;
            this.setState({metaData : {title : title, description : description, author : author, img : image}})
            // console.log(this.state.metaData);
            const metaData = this.state.metaData;
            // sends meta links and info to the firebase backend to be saved
            this.addContent(userId, metaData.title, metaData.author, metaData.img, metaData.description, link)
        })
        .catch(err => {
            alert("ERROR");
        })
        // this.getContentByUserId(userId, link);
        this.handleClose();
    }

    render() {
        return (
        <div>
            <Navigation />
            <div>
                <button onClick={()=>this.getContentByUserId(this.props.userId)}>refresh</button>
                <h1>Current Courses</h1>
                <div className="thisIsWhereCoursesCardsWillGo">
                {/* This is where user courses will show up */}
                </div>
                <h1>My List</h1>
                <div className="IDKWTFThisIs">
                    {console.log(this.state.list)}
                </div>
                <Fab color="primary" aria-label="Add" onClick={this.handleClickOpen}>
                    <AddIcon />
                </Fab>
            </div>

            {/* Modul starts here */}
            <Dialog
            open={this.state.open}
            onClose={this.handleClose}
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
                    onChange={this.onChangeHandler}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                    Cancel
                    </Button>
                    {/* Change this to handle submit */}
                    <Button onClick={()=>this.handleSubmit(this.props.userId, this.state.link)} color="primary">
                    Add
                    </Button>
                </DialogActions>

            </Dialog>
            <PostForm />
            <ReviewForm />
        </div>
        );
    }
}

LearningLab.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LearningLab);