import React from 'react';
import Link from 'next/link'

const landingNav = props => { 
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
                </div>
            </div>
        </div>
    );
}

export default landingNav;