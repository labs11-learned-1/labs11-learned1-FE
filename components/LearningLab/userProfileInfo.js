import React from "react";

//FIREBASE
import * as firebase from "firebase";
import { loadDB } from "../../firebaseConfig/firebase";
import {Store} from '../store'

//MATERIAL UI
import { makeStyles } from "@material-ui/styles";
import Postcard from "../community/Postcard";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  profileImage: {
    borderRadius: "50%",
    width: "80%",
    height: "auto"
  },
  sidebar: {
    display:"flex",
    height: "500px",
    position: "fixed",
    background: "white",
    width:" 200px",
    flexFlow: "column wrap",
    alignItems: 'center',
    margin: "10px 30px 0 30px",
    borderRadius: "10px"
  }
}));

const UserProfileInfo = props => {
  const classes = useStyles();
  const { userInfo, setUserInfo } = React.useState({})
  const {state, dispatch} = React.useContext(Store)
  

  const getUserInfo = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userID = urlParams.get("user")
      ? urlParams.get("user")
      : props.state.userID;
    console.log("userID: ", userID);
    let result = await loadDB();
    let db = result.firestore();

    db.collection('user').doc(state.userID).get().then(docSnapshot => {
        if(docSnapshot.exists){
            console.log("user data:   ",docSnapshot.data())
            setUserInfo(docSnapshot.data())
        }
    }).catch(err=>{
        console.log(err)
    })
}
console.log("user info array: ", userInfo)
React.useEffect(()=>{
    getUserInfo();
})
  return (
    <div className={classes.sidebar}>
      <img className={classes.profileImage} src={props.state.userImage} />
      <h1>{props.state.displayName}</h1>
      
    </div>
  );
};

export default UserProfileInfo;

