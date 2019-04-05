import React from "react";
import Newsfeed from "../components/community/Newsfeed";
import GeneralNav from "../components/Navigation/GeneralNav";

export default function Community() {

    return(
      
            <div className="community">
                <GeneralNav/>
                <Newsfeed />
            </div>
    )
}