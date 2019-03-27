import React from 'react';
import TextField from '@material-ui/core/TextField';

const ReviewForm = () => {
    return (
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
    )
}

export default ReviewForm