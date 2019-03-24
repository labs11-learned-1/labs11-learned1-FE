import React, {useContext} from 'react';
import Link from 'next/link'
import { StoreConsumer, StoreContext } from '../components/StoreProvider'

const landingNav = () => { 
    
    const {loginStatus, updateLogin} = useContext(StoreContext)

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
                    <button onClick={updateLogin}>click to change message</button>
                    <p>Message : {loginStatus.toString()}</p>
                </div>
            </div>
        </div>
    );
}

export default landingNav;