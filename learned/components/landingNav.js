import React from 'react';
import Link from 'next/link'
import { Store } from './store'
const landingNav = props => { 
    const changeMessage = async () => {
        return dispatch({
            type:'CHANGE_MESSAGE'
        })
    }
    const { state, dispatch } = React.useContext(Store); // comes from Store import above to get the state and dispatch seperatly 
    return (
        <div className="nav-container">
            <div className="nav-wrapper">
                <div className="logo"></div>
                <div className="accountAccess">
                    <Link href="/signup">
                        <button>Sign up</button>
                    </Link>
                    <p>or</p>
                    <Link href="/login">
                        <button>Log in</button>
                    </Link>
                    <button onClick={()=>changeMessage()}>click to change message</button>
                    <p>Message : {state.message}</p>
                </div>
            </div>
        </div>
    );
}

export default landingNav;