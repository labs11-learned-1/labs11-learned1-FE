import React from "react";

//FIREBASE
import * as firebase from "firebase";
import { loadDB } from "../../firebaseConfig/firebase";

//FUNCTIONS
import { addPost } from "../firebaseAPI/firebasePosts";

//MATERIAL UI
import { withStyles } from '@material-ui/core/styles';
import Postcard from '../community/Postcard';

//styling
const styles = theme => ({

});

const UserPosts = ({ state, postList, setPostList }) => {
    console.log("1", postList)
//   const classes = useStyles();

  //const [postList, setPostList] = React.useState([]);

  const getPostsByUserId = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userID = urlParams.get("user") ? urlParams.get("user") : state.userID;
    console.log("userID: ", userID);
    // setUser(userID);
    let result = await loadDB();
    let db = result.firestore();
    let arr =[];
    db.collection("posts")
      .where("userId", "==", userID)
      .get()
      .then(async function(querySnapshot) {
          console.log("querySnapL: ",querySnapshot)
        querySnapshot.forEach(function(doc) {
          const result = doc.data();
          console.log("RESULT", result);
          arr.push(result)
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
      setPostList(arr);
  }; //end getPostsByUserId

  React.useEffect(() => {
    getPostsByUserId()
  }, []);
  
  return (
    <div className="post-list">
      <div className="cards">
      {console.log("postList inside userposts: ", postList)}
        {postList.map((post, index) => {
          //<Postcard content={post} key={index} />;
          <hi>{post.title}</hi>
        })}
      </div>
    </div>
  );
}; //end component

export default withStyles(styles)(UserPosts);
