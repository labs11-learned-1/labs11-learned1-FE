import React from "react";

//FIREBASE
import * as firebase from "firebase";
import { loadDB } from "../../firebaseConfig/firebase";


//MATERIAL UI
import { makeStyles } from "@material-ui/styles";
import Postcard from "../community/Postcard";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  profileImage: {
    borderRadius: "10px"
  }
}));

const UserProfileInfo = props => {
  const classes = useStyles();


  return (
    <div>
      <img className={classes.profileImage} src={props.state.userImage}/>
      <h1>{props.state.displayName}</h1>
    </div>
  );
};

export default UserProfileInfo;
