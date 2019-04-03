import React from "react";
import Nav from '../components/Navigation/Nav';
import Newsfeed from "../components/community/Newsfeed";

export default function Community() {

    return(
      
            <div className="community">
                <Nav />
                <Newsfeed />
            </div>
    )
}