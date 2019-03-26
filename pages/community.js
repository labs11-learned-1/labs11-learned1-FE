import React from "react";
import { Store } from "../components/store";
import Nav from '../components/Navigation/Nav';
import Postcard from '../components/community/Postcard';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

//  https://balsamiq.cloud/snv27r3/pqwdr68/r0330
export default function Community() {
    const { state, dispatch } = React.useContext(Store);
    const formToggle = (b) => {
        return dispatch({type:"FORM_TOGGLE", payload:b})
    }
    return(
            <div className="community">
                <Nav />
                <div className="community-content">
                    <h1>News Feed</h1>
                    <div className="cards">
                        <Postcard />
                    </div>
                </div>
                <Fab color="primary" aria-label="Add" >
                    <AddIcon onClick={()=>formToggle(true)}/>
                </Fab>

            <Dialog
            open={state.openForm}
            aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Enter Link to Blog/Course</DialogTitle>

                <DialogContent>
                    <TextField
                    autoFocus
                    multiline
                    margin="dense"
                    label="Title"
                    fullWidth
                    name="title"
                    />
                    <TextField
                    autoFocus
                    multiline
                    margin="dense"
                    label="content"
                    fullWidth
                    name="content"
                    />
                    <TextField
                    autoFocus
                    multiline
                    margin="dense"
                    label="URL"
                    fullWidth
                    name="url"
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={()=>formToggle(false)} color="primary">
                    Cancel
                    </Button>
                    {/* Change this to handle submit */}
                    <Button color="primary">
                    Add
                    </Button>
                </DialogActions>

            </Dialog>

            </div>
    )
}
