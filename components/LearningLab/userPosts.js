import React from "react";

//FIREBASE
import * as firebase from "firebase";
import { loadDB } from "../../firebaseConfig/firebase";

//FUNCTIONS
import { addPost } from "../firebaseAPI/firebasePosts";

//MATERIAL UI
import { withStyles } from "@material-ui/core/styles";
import Postcard from "../community/Postcard";
import PropTypes from "prop-types";

//styling
const styles = {
  list: {
    display: "flex"
  }
};

const UserPosts = (props, state, postList, setPostList) => {
  console.log("1", props);
  const { classes } = props;

  //const [postList, setPostList] = React.useState([]);

  const getPostsByUserId = async () => {
    console.log("state", props.state.userID, "\n postlist: ", props.state.postList);
    const urlParams = new URLSearchParams(window.location.search);
    const userID = urlParams.get("user") ? urlParams.get("user") : props.state.userID;
    console.log("userID: ", userID);
    // setUser(userID);
    let result = await loadDB();
    let db = result.firestore();
    let arr = [];
    db.collection("posts")
      .where("userId", "==", userID)
      .get()
      .then(async function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          const result = doc.data();
          console.log("ESULT", result);
          arr.push(result);
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    props.setPostList(arr);
  }; //end getPostsByUserId

  React.useEffect(() => {
    getPostsByUserId();
  }, []);

  return (
    <div className={classes.list}>
      {props.postList.length ? (
        props.postList.map((post, index) => {
          <Postcard content={post} key={index} />;
        })
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}; //end component
UserPosts.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(UserPosts);
