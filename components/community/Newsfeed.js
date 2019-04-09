import React from "react";
import Postcard from '../community/Postcard';
import { loadDB } from "../../firebaseConfig/firebase";
import * as firebase from "firebase";
import { Store } from '../store';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = {
  communityContent: {
    width:"100%",
    display:"flex",
    justifyContent:"center",
    flexDirection:"column",
    alignItems:"center"
  },
  cards:{
    width:"60%",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
  },
  '@media(max-width: 600px)':{
    cards:{
      width:"90%",
      display:"flex",
      justifyContent:"center",
      flexDirection:"column",
      alignItems:"center"
    }
  }
}

const Newsfeed = props => {

    const [newsfeed, setNewsFeed] = React.useState([]);
    const {state, dispatch} = React.useContext(Store);
    const { classes } = props;

    const getPostsOfFollowing = async () => {
      let result = await loadDB();
      let db = result.firestore();
      let userRef = db.collection("user");
      let postsRef = db.collection("posts");
    
      const followingArray = 
       await userRef
        .doc(state.userID)
        .get(firebase.firestore.FieldPath("following"))
        .then(docSnapshot => {
          console.log(docSnapshot.data().following);
          return docSnapshot.data().following;
        })
        .catch(err => {
          console.log(err);
        });
    
      const postsArray = []

      console.log("Following array: ", followingArray)
      followingArray.forEach(user =>
        postsRef
          .where("userId", "==", user)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(post => {
              postsArray.push(post.data())
              //console.log("Post data: ", post.data())
              setNewsFeed(newsfeed => [...newsfeed, post.data()])
            })
            //console.log("Posts array: ", postsArray)
          })
          .catch(err => {
            console.log(err);
          })
      );
    };

    React.useEffect(() => {
      getPostsOfFollowing()
    }, []);

    return (
      <div className={classes.communityContent}>
                    <h1>News Feed</h1>
                    <TextField
                          id="filled-full-width"
                          label="Post Title"
                          style={{ margin: 8 }}
                          placeholder="Post title here"
                          multiline
                          margin="normal"
                          variant="filled"
                          InputLabelProps={{
                            shrink: true,
                          }}
                    />
                    <div className={classes.cards}>
                        {console.log("Newsfeed: ", newsfeed)}
                        {   
                            newsfeed.map((post, index) =>                             
                                    <Postcard content={post} key={index}/> 
                        )}
                    </div>
                </div>
    )

}
Newsfeed.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Newsfeed);