import Link from 'next/link'
import React, {useContext} from 'react';

const Authentication = (props) => {

   

    let extraInfo;
        extraInfo = <div>
            <p>Already have an account?</p>
            <Link href="/login">
                <a>Sign in</a>
            </Link>
        </div>

    return (
      <div className="verifyPage">
        <div className="brandingSection">
            <div className="logo"></div>
            <h2>Learned</h2>
            <p>Remember everything important.</p>
        </div>
        <button onClick={props.handleGoogle}>Continue with Google</button>
        <button onClick={props.handleSignOut}>Sign Out</button>
        <button onClick={props.fetchUsers}>Fetch User</button>
        <div>
            <span></span>
            <p>or</p>
            <span></span>
        </div>
        {extraInfo}
      </div>
    )
  }
  
export default Authentication;