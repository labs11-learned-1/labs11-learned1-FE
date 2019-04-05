import React from 'react';
import Nav from '../components/Navigation/Nav';
import Header from '../components/LandingPage/Header';
import SearchCourses from '../components/searchCourses';
import { Store } from "../components/store";


function LandingPage(){

const { state } = React.useContext(Store)
console.log(state)
    return(
        <div>
            <Nav/>
            <Header />
            <SearchCourses />
        </div>
    );
}

export default LandingPage;