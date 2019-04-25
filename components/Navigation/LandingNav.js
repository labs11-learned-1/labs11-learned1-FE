import Link from "next/link";
import React from "react";
import '../../styles/landingNav.css';

//  https://balsamiq.cloud/snv27r3/pqwdr68/r0330

const LandingNav = (props) => {

    const { classes } = props;
    
    return(
        <div className="nav">
            <div variant="regular" className="toolbar">
                <div className="logo"/>
                <div className="landingButtons">
                    <Link href="/Browse">
                        <button className="loginButton">Login</button>
                    </Link>
                    <p>or</p>
                    <Link href="/Browse">
                        <button className="signUpButton">Sign Up</button>
                    </Link>   
                </div>
                <Link href="/Browse">
                        <button className="mobileAuthButton">Login / Signup</button>
                </Link>
            </div>
        </div>
    );
}

export default LandingNav;
