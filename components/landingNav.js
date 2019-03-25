import React, {useContext} from 'react';
import Link from 'next/link'
<<<<<<< HEAD
import { StoreContext } from '../components/StoreProvider'

const landingNav = () => { 
    
    const {state,dispatch} = useContext(StoreContext)

=======
import { Store } from './store'

const landingNav = props => { 
    const changeMessage = async () => {
        return dispatch({
            type:'CHANGE_MESSAGE'
        })
    }
    const { state, dispatch } = React.useContext(Store); // comes from Store import above to get the state and dispatch seperatly 
>>>>>>> bd56c4975a9cead47f5ebc12f14372483507263d
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