import * as firebase from 'firebase';
import React, {useContext, useState} from 'react';
import { StoreConsumer, StoreContext } from '../StoreProvider'
import Link from 'next/link'

const PasswordAssist = () => {
    const {loginStatus} = useContext(StoreContext);
    const [contact, setContact] = useState("");
    const [emailStatus, setEmailStatus] = useState(2);

    var provider = new firebase.auth.GoogleAuthProvider();

    const submitInfo = () => {
        setEmailStatus(2);
    firebase.auth().generateEmailVerificationLink(contact, actionCodeSettings)
    .then((link) => {
        console.log("HEY")
        // Construct email verification template, embed the link and send
        // using custom SMTP server.
        return sendCustomVerificationEmail(email, displayName, link);
    })
    .catch((error) => {
        console.log("BYE")
        // Some error occurred.
    });
        //Check if it's a valid email in the database
            //If it does exist send a an email in the given format and set emailStatus to 1

            //If it fails set emailStatus to 0
    }

    let statusInfo;
    if(emailStatus === 0) {
        statusInfo = <p>You will recieve an email shortly.</p>
    } else if (emailStatus === 1) {
        statusInfo = <p>An email has been sent to your account</p>
    }

    return (
      <div className="forgotPasswordPage">
        <div className="brandingSection">
            <div className="logo"></div>
            <h2>Learned</h2>
        </div>
        <div>
            <p>Please provide the email or username associated with your Learned account.</p>
            <p>We will send you an email with the instructions for resetting your password..</p>
        </div>
        <div>
            <p>Email address or username</p>
            <input className="contactHandler" onChange={function(ev) {
                setContact(ev.target.value)
            }}>
            </input>
            {statusInfo}
            <button onClick={submitInfo}>Send Verification Email</button>
        </div>
        <p>{loginStatus.toString()}</p>
        <Link href="/login">
            <a>Return to login</a>
        </Link>
      </div>
    )
  }
  
export default PasswordAssist;