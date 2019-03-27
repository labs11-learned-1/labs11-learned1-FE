import Link from "next/link";
import React, {useState, useContext} from "react";
import { Store } from "../store";
import * as firebase from "firebase";
import { loadDB } from "../../firebaseConfig/firebase";

//  https://balsamiq.cloud/snv27r3/pqwdr68/r0330

const Settings = () => {
    const [imagePopup, setImagePopup] = useState(false);
    const [editDisplay, setEditDisplay] = useState(false);
    const [newDisplay, setNewDisplay] = useState("");

    const { state, dispatch } = React.useContext(Store);
    
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
        backgroundImage: state.profilePic.length > 0 ? `url(${state.profilePic})` : `url(https://vignette.wikia.nocookie.net/blogclan-2/images/b/b9/Random-image-15.jpg/revision/latest?cb=20160706220047)`,
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
    console.log(newDisplay)

    return (
      <div className='settings-wrapper'>
        <h1>Account settings</h1>
        <div style={imageStyle} onClick={() => setImagePopup(true)}></div> {/*Make this a circle and the background image will be*/}
        {selectImage}
        <div className='displayname'>
            <span>Display Name: Billy Bob</span>
            <button onClick={() => setEditDisplay(true)}>CHANGE</button>
            {editDisplayName}
        </div>
        <div>
            <button>Connect to Udemy</button>
        </div>
        <button onClick={handleSignOut}>SIGN OUT</button>
      </div>
      
    );
}

export default Settings;