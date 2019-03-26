import React from "react";
import { Store } from "../components/store";
import Nav from '../components/Navigation/Nav';
import Postcard from '../components/community/Postcard'
//  https://balsamiq.cloud/snv27r3/pqwdr68/r0330
export default function Community() {
    const { state, dispatch } = React.useContext(Store);
    return(
            <div className="community">
                <Nav />
                <div className="community-content">
                    <h1>News Feed</h1>
                    <div className="cards">
                        <Postcard />
                    </div>
                </div>
            </div>
    )
}
