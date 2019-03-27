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

export default class LearningLab extends React.Component {
    state = {
        open: false,
        link: "",
        metaData : {
            title : "",
            description: "",
            author: "",
            img: "",
        }
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onChangeHandler = e => {
        this.setState({...this.state.link, link : e.target.value})
        console.log(this.state.link);
    }

    addContent = async (title, author, photo, description) => {
        let result = await loadDB();
        let db = result.firestore();
        db.collection('content-collection').add({
            title: title,
            author: author,
            photoUrl: photo,
            description: description
        }).then((ref) => {
            console.log("Added content to the db", ref.id)
            db.collection('user').doc("450").update({ myList: firebase.firestore.FieldValue.arrayUnion(ref.id)})
        }).catch((err) => {
            console.log("error adding content to the db", err);
        });
    }
    

    handleSubmit = () => {
        // sending link to web scraping backend that returns meta tags
        axios.post('https://getmetatag.herokuapp.com/get-meta', {url:this.state.link})
        .then(res => {
            // saves useful meta tags to local state
            const { title, description, author, image } = res.data;
            this.setState({metaData : {title : title, description : description, author : author, img : image}})
            // console.log(this.state.metaData);
            const metaData = this.state.metaData;
            // sends meta links and info to the firebase backend to be saved
            this.addContent(metaData.title, metaData.author, metaData.img, metaData.description)
        })
        .catch(err => {
            alert("ERROR");
        })
        this.handleClose();
    }

    render() {
        return (
        <div>
            <Navigation />

            <h1>Current Courses</h1>
            <div className="thisIsWhereCoursesCardsWillGo">
            {/* This is where user courses will show up */}
            </div>
            <h1>My List</h1>
            <div className="IDKWTFThisIs">
            {/* I still have no Idea what this is */}
            </div>
            <Fab color="primary" aria-label="Add" onClick={this.handleClickOpen}>
                <AddIcon />
            </Fab>

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
                    <Button onClick={this.handleSubmit} color="primary">
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