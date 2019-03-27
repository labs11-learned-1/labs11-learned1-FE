import React, {useState, useContext} from "react";
import { Store } from "../store";
import PropTypes from "prop-types";

//firebase import
import * as firebase from "firebase";
import { loadDB } from "../../firebaseConfig/firebase";

//style imports
import { withStyles } from "@material-ui/core/styles";

//  https://balsamiq.cloud/snv27r3/pqwdr68/r0330



const styles = {
    settingsWrapper: {
      margin: '0 auto',
      width: '100%',
      height: 'auto'
  },
  sidebar: {

  },
  title: {

  },
}

const Settings = (props) => {
    const [imagePopup, setImagePopup] = useState(false);
    const [editDisplay, setEditDisplay] = useState(false);
    const [newDisplay, setNewDisplay] = useState("");

    const { state, dispatch } = React.useContext(Store);
    const { classes } = props;
    //FOR NOW HAS VERY UGLY LOOKING SETUP IN ORDER TO PRESENT THE IDEA OF FUNCTIONALITY


    const handleSignOut = async () => {
        let myVal = await loadDB();
        myVal
          .auth()
          .signOut()
          .then((result) => {
            console.log("logout success", result)
            return dispatch({ type: "LOGGED_OUT" });
          })
          .catch(e => {
            alert("Error signing out");
          });
    };
    
    const handleInputChanges = (ev) => {
        setNewDisplay(ev.target.value);
    }

    let selectImage;
    let editDisplayName;
    let imageStyle = {
        backgroundImage: state.userImage != null ? `url(${state.userImage})` : `url(https://vignette.wikia.nocookie.net/blogclan-2/images/b/b9/Random-image-15.jpg/revision/latest?cb=20160706220047)`,
        backgroundSize: 'cover',
        height: '100px',
        width: '100px'
    }

    if(imagePopup) {
        selectImage = <div>HELLO</div>
    } else {
        selectImage = null;
    }

    //This might be a popup, otherwise it would be beteer to hide the change button in displayname div.
    if(editDisplay) {
        editDisplayName = <div>
            <input type="text" onChange={handleInputChanges}></input>
            <button onClick={()=>setEditDisplay(false)}>SUBMIT</button>
        </div>
    } else {
        editDisplayName = null;
    }

    return (
        
      <div className={classes.settingsWrapper}>
        <div className={classes.sidebar}>
            <h3>Account</h3>
            <h3>Connections</h3>
            <h3>Sign Out</h3>
        </div>
        <div className={classes.account}>
            <div className={classes.title}>
                <h1>Account</h1>
            </div>
            <div style={imageStyle} onClick={() => setImagePopup(true)}></div> {/*Make this a circle and the background image will be*/}
            {selectImage}
            <div className='displayname'>
                <span>Your Username</span>

                <button onClick={() => setEditDisplay(true)}>CHANGE</button>
                {editDisplayName}
            </div>
        </div>
        <div className={classes.connections}>
            <div className={classes.title}>
                <h1>Connections</h1>
                <button>Connect to Udemy</button>
            </div>
        </div>
        
      </div>
      
    );
}

Settings.propTypes = {
    classes: PropTypes.object.isRequired
  };

export default withStyles(styles)(Settings);