import React, { Component } from "react";
import { Store } from "../components/store";
import Nav from '../components/Navigation/Nav';
import Postcard from '../components/community/Postcard';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { loadDB } from "../firebaseConfig/firebase";
import * as firebase from "firebase";



//  https://balsamiq.cloud/snv27r3/pqwdr68/r0330
export default function Community() {

    const { state, dispatch } = React.useContext(Store);

    const getAllPosts = async ( ) => {
        
        let result = await loadDB();
        let db = result.firestore();
      
        const posts = []
      
        //access posts collection, provide the postId that you want to get
        db.collection("posts")
          .get()
          .then(postSnapshot => {
            postSnapshot.docs.forEach(doc => {
              posts.push(doc.data())
            })
            return dispatch({
              type: 'SET_POSTS',
              payload: posts
            })
          })
          .catch(err => {
            console.log("Error fetching posts", err);
          });
          
      }
      
      
    React.useEffect(() => getAllPosts(), []);
    console.log("posts: ", state.newsfeed)
    return(
            <div className="community">
                <Nav />
                <div className="community-content">
                    <h1>News Feed</h1>
                    <div className='cards'>
                        {console.log(state.newsfeed)}
                        {   
                            state.newsfeed.map((post, index) =>                             
                                    <Postcard content={post} key={index}/>     
                        )}
                        
                    </div>
                </div>
            </div>
    )
}
