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

const LearningLab = () => {
    const [open, setOpen] = React.useState(false);
    const [link, setLink] = React.useState("");
    const [metaData, setMetaData] = React.useState({});

    const onChangeHandler = ev => {
        setLink(ev.target.value)
    }

    const addContent = async () => {
        const {title, description, author, img} = metaData;
        let result = await loadDB();
        let db = result.firestore();
        db.collection('content-collection').doc().set({
            title: title,
            author: author,
            photoUrl: img,
            description: description,
            link: link
        }).then((ref) => {
            console.log("Added content to the db", ref.id)
            db.collection('user').doc("450").update({ myList: firebase.firestore.FieldValue.arrayUnion(ref.id)})
            setMetaData({})
        }).catch((err) => {
            console.log("error adding content to the db", err);
        });
    }
    

    const handleSubmit = () => {
        // sending link to web scraping backend that returns meta tags
        axios.post('https://getmetatag.herokuapp.com/get-meta', {url:link})
        .then((res) => {
            // saves useful meta tags to local state
            const { title, description, author, image } = res.data;
            setMetaData({title : title, description : description, author : author, img : image});  
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
            <Fab color="primary" aria-label="Add" onClick={() => setOpen(true)}>
                <AddIcon />
            </Fab>

            {/* Modul starts here */}
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
                    <Button onClick={handleSubmit} color="primary">
                    Add
                    </Button>
                </DialogActions>

            </Dialog>
            <PostForm />
            <ReviewForm />
        </div>
    );
}

export default LearningLab;