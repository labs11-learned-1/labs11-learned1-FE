import React from 'react';
import TextField from '@material-ui/core/TextField';
import {getReview, addReview, editReview, deleteReview} from '../firebaseAPI/firebaseReviews.js';

const ReviewForm = () => {

    const handleGetReview = () => {
        getReview();
    }

    const handleAddReview = () => {
        addReview();
    }

    const handleEditReview = () => {
        editReview();
    }

    const handleDeleteReview = () => {
        deleteReview();
    }

    return (
        <React.Fragment>
            <form>
                <TextField 
                label="Title"
                //value={state.title}
                />
                <TextField 
                label="Comment"
                multiline
                rowsMax="5"
                //value={state.comment}
                />
                <TextField 
                label="Rating"
                type="number"
                //value={state.rating}
                />
            </form>
            <button onClick = {handleGetReview}>Get review</button>
            <button onClick = {handleAddReview}>Add review</button>
            <button onClick = {handleEditReview}>Edit review</button>
            <button onClick = {handleDeleteReview}>Delete review</button>
        </React.Fragment>
    )
}

export default ReviewForm