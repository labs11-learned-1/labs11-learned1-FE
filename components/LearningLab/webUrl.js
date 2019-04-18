import React from "react";
import { Store } from "../store";

//FIREBASE
import { loadDB } from "../../firebaseConfig/firebase";
import * as firebase from "firebase";

//MATERIAL UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import LinkIcon from "@material-ui/icons/link";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

const WebUrl = props => {
  const [open, setOpen] = React.useState(false);
  const [webUrl, setUrl] = React.useState("");
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const { state, dispatch } = React.useContext(Store);



  
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  const handleSnackBarClose = () => {
    setOpenSnackBar(false);
  };

  const handleSnackBarOpen = () => {
    setOpenSnackBar(true);
  };

  // grabs the value entered into text field and puts it on state
  const updateWebState = e => {
    setUrl(e.target.value);
  };

  //grabs state entered by textfield, and turns the button into a submit functionality
  const handleUpdateWebUrl = async () => {
    let result = await loadDB();
    let db = result.firestore();

    console.log(props);
    await db
      .collection("user")
      .doc(props.state.userID)
      .update({
        webUrl: webUrl
      })
      .then(() => {
        dispatch({
          type: "UPDATE_WEB_URL",
          payload: webUrl
        })
          .then(() => {
            handleSnackBarOpen();
            console.log("updated web url")
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });

    setOpen(false);
  };
 
  React.useEffect(() => {
    
  }, []);

  return (
    <div>
      <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
        <LinkIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Link a Website</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To link a website, please enter a url here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Url"
            type="Url"
            fullWidth
            value={webUrl}
            onChange={updateWebState}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateWebUrl} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={openSnackBar}
        autoHideDuration={5000}
        onClose={handleSnackBarClose}
      >
        <SnackbarContent
          onClose={handleSnackBarClose}
          variant="success"
          message="Success Adding Course"
          style={{ backgroundColor: "green" , zIndex: "20"}}
        />
      </Snackbar>
    </div>
  );
};
export default WebUrl;
