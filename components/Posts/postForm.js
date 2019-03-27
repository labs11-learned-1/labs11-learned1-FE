import React from 'react';
import TextField from '@material-ui/core/TextField';
import {addPost, deletePost, editPost, getPost, getAllPosts} from '../firebaseAPI/firebasePosts'

const PostForm = () => {

    const handleAdd = (e) => {
        addPost();
    }

    const handleGet = (e) => {
        getPost();
    }

    const handleGetAll = (e) => {
        getAllPosts();
    }

    const handleEdit = (e) => {
        editPost()
    }

    const handleDelete = (e) => {
        deletePost()
    }

    return (
        <React.Fragment>
            <form>
                <TextField 
                label="Title"
                //value={state.title}
                />
                <TextField 
                label="Content"
                //value={state.content}
                />
                <TextField 
                label="url"
                //value={state.url}
                />
            </form>
            <button onClick = {handleAdd}>Add post</button>
            <button onClick = {handleEdit}>Edit post</button>
            <button onClick = {handleGet}>Get post</button>
            <button onClick = {handleDelete}>Delete post</button>
            <button onClick = {handleGetAll}>Get All posts</button>
        </React.Fragment>
    )
}

export default PostForm