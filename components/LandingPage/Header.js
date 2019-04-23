
import React from 'react';
import Link from 'next/link';
import '../../styles/header.css';

function Header(props){
    return(
        <div className="rootHeader">
            <div className="textArea">
                <h1 className="headerTitle">Never be <br />Unproductive Again!</h1>
                <p className="headerText">
                    Erudition utilizes a social community to help you find the most effective resources in a modern
                    era of infinite information, all while allowing you to update your platform of friends and peers on your 
                    latest finds!
                </p>
                <Link href="/Homepage">
                    <button className="headerSignUp">SIGN UP FOR FREE</button>
                </Link>
            </div>
            <img className="img" src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/process_e90d.svg" />
        </div>
    )
}

export default Header;