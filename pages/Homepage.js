//react and data imports
import Link from "next/link";
import React from "react";
import { Store } from "../components/store";
import PropTypes from 'prop-types';

//firebase imports
import * as firebase from "firebase";
import { loadDB } from "../firebaseConfig/firebase";

//component imports
import Nav from '../components/Navigation/Nav'
import { Home } from "../components/HomePage/homepage";
import Authentication from "../components/Authentication/Authentication";

//styles imports
import { withStyles } from '@material-ui/core/styles';



const styles = {
  authContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  }

}

 function Homepage(props) {
  
const {classes} = props;
  const { state, dispatch } = React.useContext(Store);
  if (!state.loggedIn) {
    return (
      <div className={classes.authContainer}>
        <Authentication
          type="login"
      
        />
        
      </div>
    );
  } else {
    return (
      <div>
        <Nav/>
        <Home/>
      </div>
    );
  }
}
Homepage.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(Homepage);