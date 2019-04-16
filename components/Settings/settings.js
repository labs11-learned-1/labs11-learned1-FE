import React, { useState, useContext } from "react";
import axios from "axios";
//import Router from 'next/router'
import { Store } from "../store";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearProgress from "@material-ui/core/LinearProgress";
import Input from "@material-ui/core/Input";
import HowToLink from "./HowToLink";
//firebase import
import * as firebase from "firebase";
import { loadDB } from "../../firebaseConfig/firebase";

//style imports
import { withStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

//  https://balsamiq.cloud/snv27r3/pqwdr68/r0330

const styles = theme => ({
  settingsWrapper: {
    display: "flex",
    justifyContent: "center",
    margin: "0 auto",
    width: "100%",
    height: "100%",
    marginTop: "80px",
    "& h3": {
      "&:hover": {
        cursor: "pointer"
      }
    }
  },
  title: {
    borderBottom: "1.5px solid #e76d89",
    "& h1": {
      margin: "10px 0 0 20px",
      paddingBottom: "10px"
    }
  },
  profilePic: {
    borderRadius: "50%",
    margin: "15px 0 0 20px"
  },
  profilePicTitle: {
    margin: "15px 0 0 20px"
  },
  row: {
    borderBottom: "1px solid #e76d89",
    paddingBottom: "20px",
    paddingTop: "20px",
    alignItems: "center"
  },
  profilePicWrap: {
    display: "block",
    borderBottom: "1px solid #e76d89",
    paddingBottom: "20px"
  },
  usernameA: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "nowrap",
    alignItems: "center",
    paddingBottom: "60px"
  },
  "& input": {
    backgroundColor: "white"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "265px",
    backgroundColor: "ghostwhite",
    borderRight: "2px solid midnightblue"
  },
  content: {
    width: "100%",
    maxWidth: "760px",
    backgroundColor: "ghostwhite",
    paddingRight: "20px"
  },
  signOutButton: {
    margin: "0",
    width: "120px",
    fontWeight: "bold"
  },
  button: {
    margin: "0",
    fontWeight: "bold"
  },
  textField: {
    margin: "0"
  },
  udemyButton: {
    backgroundColor: "#bf302d",
    color: "white",
    fontWeight: "bold"
  },
  saveButton: {
    backgroundColor: "#7bbc36",
    color: "white",
    fontWeight: "bold",
    margin: "0 10px 0 10px"
  },
  button: {
    margin: "0 10px 0 10px"
  },
  saveCancel: {
    display: "flex"
  },
  udemyInput: {
    width: "50%"
  },
  "@media(max-width: 600px)": {
    sidebar: {
      display: "none"
    },
    content: {
      padding: "0 10px 0 10px",
      display: "flex",
      flexDirection: "column",
      paddingBottom: "20px"
    },
    connectionsTab: {
      paddingTop: "20px",
      display: "block !important"
    },
    accountTab: {
      borderBottom: "40px solid rgba(0,0,0,.1)",
      display: "block !important"
    }
  }
});

const Settings = props => {
  const { state, dispatch } = React.useContext(Store);

  const [imagePopup, setImagePopup] = useState(false);
  const [editDisplay, setEditDisplay] = useState(false);
  const [bioDisplay, setBioDisplay] = useState(false);
  const [activeTab, setActiveTab] = useState("account");
  const [newDisplay, setNewDisplay] = useState(state.displayName);
  const [udemyModal, setUdemyModal] = useState(false);
  const [udemyLink, setUdemyLink] = useState("");
  const [loading, setLoadingStatus] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(
    "This could take up to 15 seconds"
  );
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [userInfo, setUserInfo] = useState({});

  const { classes } = props;
  //FOR NOW HAS VERY UGLY LOOKING SETUP IN ORDER TO PRESENT THE IDEA OF FUNCTIONALITY
  const handleSaveChanges = async () => {
    await handleBioUpdate();
    await updateDisplayName();
  };
  const handleSignOut = async () => {
    let myVal = await loadDB();
    myVal
      .auth()
      .signOut()
      .then(result => {
        console.log("logout success", result);
        //Router.push('/Homepage')
        return dispatch({ type: "LOGGED_OUT" });
      })
      .catch(e => {
        alert("Error signing out");
      });
  };

  const getUserInfo = async () => {
    let result = await loadDB();
    let db = result.firestore();

    db.collection("user")
      .doc(state.userID)
      .get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          setUserInfo(docSnapshot.data());
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleInputChanges = ev => {
    setNewDisplay(ev.target.value);
  };

  const updateDisplayName = async () => {
    console.log(state.displayName);
    let result = await loadDB();
    let db = result.firestore();

    db.collection("user")
      .doc(state.userID)
      .update({
        displayName: displayName
      })
      .then(() => {
        return dispatch({
          type: "UPDATE_DISPLAY_NAME",
          payload: displayName
        });
      })
      .catch(err => alert("Error updating display name"));
  };

  const handleBioUpdate = async () => {
    //db call
    let result = await loadDB();
    let db = result.firestore();

    db.collection("user")
      .doc(state.userID)
      .update({
        bio: bio
      })
      .then(() => {
        return dispatch({
          type: "UPDATE_BIO",
          payload: bio
        });
      })
      .catch(err => alert("Error updating bio"));
  };

  const handleUpdateDisplayName = e => {
    console.log(e.target.value);

    setDisplayName(e.target.value);
  };

  const handleUpdateBio = e => {
    console.log(e.target.value);

    setBio(e.target.value);
  };

  const handleLinkSumbit = e => {
    setLoadingStatus(true);
    console.log("clicked", udemyLink, state.userID);
    axios
      .post("https://metadatatesting.herokuapp.com/user-udemy", {
        url: udemyLink,
        userId: state.userID
      })
      .then(res => {
        setLoadingMessage("Account Linked!");
        setTimeout(() => {
          setLoadingStatus(false);
          setUdemyModal(false);
        }, 1000);
      })
      .catch(err => {
        console.log("Error adding users udemy stuffage", err);
        setUdemyModal(false);
        alert("error linking account");
      });
  };

  let selectImage;
  let imageStyle = {
    backgroundImage:
      state.userImage != null
        ? `url(${state.userImage})`
        : `url(https://vignette.wikia.nocookie.net/blogclan-2/images/b/b9/Random-image-15.jpg/revision/latest?cb=20160706220047)`,
    backgroundSize: "cover",
    height: "100px",
    width: "100px"
  };

  if (imagePopup) {
    selectImage = <div>HELLO</div>;
  } else {
    selectImage = null;
  }

  React.useEffect(() => {
    getUserInfo();
  }, []);

  //This might be a popup, otherwise it would be beteer to hide the change button in displayname div.
  return (
    <div className={classes.settingsWrapper}>
      <div className={classes.sidebar}>
        <h3 id="account" onClick={() => setActiveTab("account")}>
          Account
        </h3>
        <h3 id="connections" onClick={() => setActiveTab("connections")}>
          Connections
        </h3>
        <Button
          variant="contained"
          color="red"
          onClick={() => handleSignOut()}
          className={classes.signOutButton}
        >
          Sign Out
        </Button>
      </div>
      <div className={`${classes.content}`}>
        <div>
          <div
            className={classes.accountTab}
            style={{ display: activeTab === "account" ? "block" : "none" }}
          >
            <div className={classes.title}>
              <h1>Account</h1>
            </div>
            <div className={classes.profilePicWrap}>
              <h3 className={classes.profilePicTitle}>Profile Picture</h3>
              <div
                className={classes.profilePic}
                style={imageStyle}
                onClick={() => setImagePopup(true)}
              />{" "}
              {/*Make this a circle and the background image will be*/}
            </div>
            {selectImage}
            <div className={classes.row}>
              <div className={classes.usernameA}>
                <h3>Display Name</h3>
              </div>

              {/* UPDATE DISPLAY NAME */}
              <TextField
                id="filled-name"
                className={classes.textField}
                value={displayName}
                onChange={handleUpdateDisplayName}
                placeholder={userInfo.displayName}
                inputProps={{
                  maxLength: 20
                }}
              />
            </div>
            <div className={classes.row}>
              <div className={classes.usernameA}>
                <h3>Bio</h3>
                <div>
                  <div className={classes.saveCancel} />
                </div>
              </div>

              {/* UPDATE BIO */}
              <TextField
                id="bio"
                className={classes.bio}
                value={bio}
                placeholder={userInfo.bio}
                onChange={handleUpdateBio}
                inputProps={{
                  maxLength: 144
                }}
              />
            </div>
            <Button
              className={classes.saveChanges}
              onClick={() => handleSaveChanges()}
            >
              Save Changes
            </Button>
          </div>

          <div
            className={classes.connectionsTab}
            style={{ display: activeTab === "connections" ? "block" : "none" }}
          >
            <div className={classes.title}>
              <h1>Connections</h1>
            </div>
            <div>
              <h2>Connect to Udemy</h2>
              <p>
                Get access to all your Udemy courses with the click of a button
              </p>
            </div>
            <Button
              variant="contained"
              color="red"
              className={classes.udemyButton}
              onClick={() => setUdemyModal(true)}
            >
              Connect to Udemy
            </Button>
          </div>
          <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={udemyModal}
            onClose={() => setUdemyModal(false)}
          >
            <DialogTitle>Public Profile Link</DialogTitle>
            <DialogContent>
              {loading ? (
                <div>
                  <p>{loadingMessage}</p>
                  <LinearProgress variant="indeterminate" />
                </div>
              ) : (
                <React.Fragment>
                  <HowToLink />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Link"
                    fullWidth
                    multiline
                    onChange={e => {
                      setUdemyLink(e.target.value);
                    }}
                  />

                  <DialogActions>
                    <Button
                      color="primary"
                      onClick={() => setUdemyModal(false)}
                    >
                      Cancel
                    </Button>
                    {/* Change this to handle submit */}
                    <Button color="primary" onClick={() => handleLinkSumbit()}>
                      Link
                    </Button>
                  </DialogActions>
                </React.Fragment>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

Settings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Settings);

/* <TextField
label="Public Profile Link"
className={classes.udemyInput}
variant="outlined"
/> */
