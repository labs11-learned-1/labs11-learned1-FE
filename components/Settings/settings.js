import React, {useState, useContext} from "react";
//import Router from 'next/router'
import { Store } from "../store";
import PropTypes from "prop-types";
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//firebase import
import * as firebase from "firebase";
import { loadDB } from "../../firebaseConfig/firebase";

//style imports
import { withStyles } from "@material-ui/core/styles";

//  https://balsamiq.cloud/snv27r3/pqwdr68/r0330



const styles = theme => ({
    settingsWrapper: {
        display: 'flex',
        justifyContent: 'center',
        margin: '0 auto',
        width: '100%',
        height: '100%',
        marginTop: '30px',
        '& h3': {
            '&:hover': {
                cursor: 'pointer'
            }
        },

    },
    sidebar: {

    },
    title: {
        borderBottom: '1.5px solid rgba(0,0,0,.1)',
    '& h1':{
        margin: '0px',
        paddingBottom: '10px'
        },
    },
    profilePic: {
        borderRadius: '50%',
        
    },
    row: {
        
        borderBottom: '1px solid rgba(0,0,0,.1)',
        paddingBottom: '20px',
        paddingTop: '20px',
        alignItems: 'center',
    },
    profilePicWrap: {
        display: 'block',
        borderBottom: '1px solid rgba(0,0,0,.1)',
        paddingBottom: '20px'
    },
    usernameA: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        alignItems: 'center',
        paddingBottom: '60px'
        
    },
    '& input': {
        backgroundColor: 'white'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        width: '265px',
        backgroundColor: 'white',
        paddingLeft: '20px'

    },
    content: {
        width: '100%',
        maxWidth: '760px',
        backgroundColor: 'white',
        paddingRight: '20px'
    },
    signOutButton: {
        margin: '0',
        width: '120px',
        fontWeight: 'bold'
    },
    button: {
        margin: '0',
        fontWeight: 'bold'
    },
    textField: {
        margin: '0'
    },
    udemyButton: {
        backgroundColor: '#bf302d',
        color: 'white',
        fontWeight: 'bold'
    },
    saveButton: {
        backgroundColor: '#7bbc36',
        color: 'white',
        fontWeight: 'bold',
        margin: '0 10px 0 10px'
    },
    button: {
        margin: '0 10px 0 10px'
    },
    saveCancel: {
        display: 'flex'
    }
    

})

const Settings = (props) => {

    const { state, dispatch } = React.useContext(Store);

    const [imagePopup, setImagePopup] = useState(false);
    const [editDisplay, setEditDisplay] = useState(false);
    const [activeTab, setActiveTab] = useState('account')
    const [newDisplay, setNewDisplay] = useState(state.displayName);

    
    const { classes } = props;
    //FOR NOW HAS VERY UGLY LOOKING SETUP IN ORDER TO PRESENT THE IDEA OF FUNCTIONALITY

    const handleSignOut = async () => {
        let myVal = await loadDB();
        myVal
          .auth()
          .signOut()
          .then((result) => {
            console.log("logout success", result)
            //Router.push('/Homepage')
            return dispatch({ type: "LOGGED_OUT" });
          })
          .catch(e => {
            alert("Error signing out");
          });
    };
    
    const handleInputChanges = (ev) => {
        setNewDisplay(ev.target.value);
    }

    const uploadDisplayName = () => {
        //Send a put to the server to update the display name of the user and update global state.
    }

    let selectImage;
    let imageStyle = {
        backgroundImage: state.userImage != null ? `url(${state.userImage})` : `url(https://vignette.wikia.nocookie.net/blogclan-2/images/b/b9/Random-image-15.jpg/revision/latest?cb=20160706220047)`,
        backgroundSize: 'cover', 
        height: '100px',
        width: '100px',
    }

    if(imagePopup) {
        selectImage = <div>HELLO</div>
    } else {
        selectImage = null;
    }

    //This might be a popup, otherwise it would be beteer to hide the change button in displayname div.
    return (
      <div className={classes.settingsWrapper}>
        <div className={classes.sidebar}>
            <h3 id='account' onClick={() => setActiveTab('account')}>Account</h3>
            <h3 id='connections' onClick={() => setActiveTab('connections')}>Connections</h3>
            <Button variant="contained" color="red" onClick={() => handleSignOut()}className={classes.signOutButton}>
                    Sign Out
            </Button>
        </div>
        <div className={`${classes.content}`} style={{display: activeTab === 'account' ? 'block' : 'none'}}>
            <div className={classes.title}>
                <h1>Account</h1>
            </div>
            <div className={classes.profilePicWrap}>
                <h3>Profile Picture</h3>
                <div className={classes.profilePic} style={imageStyle} onClick={() => setImagePopup(true)}></div> {/*Make this a circle and the background image will be*/}
            </div>
            {selectImage}
            <div className={classes.row}>
                <div className={classes.usernameA}>
                    <h3>Your Username</h3>
                    <div>
                        <Button variant="contained" color="red" onClick={() => setEditDisplay(true)}className={classes.button} style={{display: editDisplay ? 'none' : 'block'}}>
                            EDIT
                        </Button>
                        <div className={classes.saveCancel}>
                            <Button variant="contained" color="red" onClick={() => {
                                setEditDisplay(false)
                                uploadDisplayName()
                                }}className={classes.saveButton} style={{display: editDisplay ? 'block' : 'none'}}>
                                SAVE
                            </Button>
                
                            <Button variant="contained" color="red" onClick={() => {
                                setEditDisplay(false)
                                setNewDisplay(state.displayName)
                            }} className={classes.button} style={{display: editDisplay ? 'block' : 'none'}}>
                                CANCEL
                            </Button>
                        </div>
                    </div>
                </div>
                <TextField
                id="filled-name"
                className={classes.textField}
                value={newDisplay}
                onChange={handleInputChanges}
                disabled= {(editDisplay) ? '': 'disabled'}
                />
            </div>
            
           
        </div>
        <div className={`${classes.content}`} style={{display: activeTab === 'connections' ? 'block' : 'none'}}>
            <div className={classes.title}>
                <h1>Connections</h1> 
            </div>
            <div>
                <h2>Connect to Udemy</h2>
                <p>Get access to all your Udemy courses with the click of a button</p>
            </div>
                <Button variant="contained" color="red" className={classes.udemyButton}>
                    Connect to Udemy
                </Button>
        
            </div>
      </div>
      
    );
}

Settings.propTypes = {
    classes: PropTypes.object.isRequired
  };

export default withStyles(styles)(Settings);