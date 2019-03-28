import React from "react";
import TextField from '@material-ui/core/TextField';
import {addContent, getContentById, getContentByUserId, deleteContent} from '../firebaseAPI/firebaseCollection';

const ContentCollection = () => {

    const handleAddContent = () => {
        addContent();
       }

    const handleGetContentByUserId = () => {
         getContentByUserId();
       }

    const handlegetContentById = () => {
         getContentById();
       }

    const handleDeleteContent = () => {
         deleteContent();
        }

    return (
        <React.Fragment>
            <form>
                <TextField 
                label="Add Content"
                />
            </form>
            <button onClick={handleAddContent}>Add Content</button>
            <button onClick={handleGetContentByUserId}>Get Content by user id</button>
            <button onClick={handlegetContentById}>Get Content by id</button>
            <button onClick={handleDeleteContent}>Delete Content</button>
        </React.Fragment>
    )
}

export default ContentCollection