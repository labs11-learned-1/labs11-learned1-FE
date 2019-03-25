import React, {useContext} from 'react';
import Link from 'next/link'
import { StoreContext } from '../components/StoreProvider'

const landingNav = () => { 
    
    const {state,dispatch} = useContext(StoreContext)

    return (
        <div className="nav-container">
            <div className="nav-wrapper">
                <div className="logo"></div>
                <div className="accountAccess">
                    <Link href="/login">
                        <button>Log in</button>
                    </Link>
                </div>
            </div>
            <p>{state.loginStatus.toString()}</p>
            <button onClick={() => dispatch({ type: "CHANGE" })}>CHECK</button>
        </div>
    );
}

export default landingNav;