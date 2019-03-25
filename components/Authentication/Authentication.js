import Link from 'next/link'
import React, {useContext} from 'react';
import { StoreContext } from '../StoreProvider'

const Authentication = (props) => {

    const { updateLogin } = useContext(StoreContext);

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
<<<<<<< HEAD
        <div>
            <input placeholder="Email" className="emailHandler" onChange={function(ev) {
                props.setEmail(ev.target.value)
            }}>
            </input>
            <input type="password" placeholder="Password"  className="passwordHandler" onChange={function(ev) {
                props.setPassword(ev.target.value)
            }}>
            </input>
        </div>
        <button onClick={updateLogin}>Continue</button>
=======
>>>>>>> bd56c4975a9cead47f5ebc12f14372483507263d
        {extraInfo}
      </div>
    )
  }
  
export default Authentication;