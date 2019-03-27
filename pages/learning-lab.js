import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Nav from '../components/Navigation/Nav'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {addPost, deletePost, editPost, getPost, getAllPosts} from '../components/firebaseAPI/firebasePosts.js';
import {getReview, addReview, editReview, deleteReview} from '../components/firebaseAPI/firebaseReviews.js';
import axios from 'axios';
export default class LearningLab extends React.Component {
    constructor(){
        super();
        this.state = {
            open: false,
            link: '',
        };
    }

//this button can be placed elsewhere. It is in learning labs just as a test
    

    handleGetReview = () => {
        getReview();
    }

    handleAddReview = () => {
        addReview();
    }

    handleEditReview = () => {
        editReview();
    }

    handleDeleteReview = () => {
        deleteReview();
    }

    handleAdd = () => {
        addPost();
    }

    handleGet = () => {
        getPost();
    }

    handleGetAll = () => {
        getAllPosts();
    }

    handleEdit = () => {
        editPost()
    }

    handleDelete = () => {
        deletePost()
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = e => {
        this.setState({link : e.target.value })
        console.log(this.state.link);
    }

    fetchUrlData = () => {
        axios.get('https://medium.freecodecamp.org/the-ultimate-guide-to-web-scraping-with-node-js-daa2027dcd3')
        .then((response) => {
            if(response.status === 200) {
                const html = response.data;
                console.log(html);
            }
        }, (error) => console.log(error) );
    }

    render() {
        return (
        <div>
            <Nav />

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
                    onChange={this.handleChange}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                    Cancel
                    </Button>
                    {/* Change this to handle submit */}
                    <Button onClick={()=>this.fetchUrlData()} color="primary">
                    Add
                    </Button>
                </DialogActions>

            </Dialog>


            <button onClick = {this.handleAdd}>Add post</button>
            <button onClick = {this.handleEdit}>Edit post</button>
            <button onClick = {this.handleGet}>Get post</button>
            <button onClick = {this.handleDelete}>Delete post</button>
            <button onClick = {this.handleGetAll}>Get All posts</button>

            <button onClick = {this.handleGetReview}>Get review</button>
            <button onClick = {this.handleAddReview}>Add review</button>
            <button onClick = {this.handleEditReview}>Edit review</button>
            <button onClick = {this.handleDeleteReview}>Delete review</button>



        </div>
        );
    }
}