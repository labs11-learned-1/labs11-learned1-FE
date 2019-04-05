import React from 'react';
import Header from '../components/LandingPage/Header';
import SearchCourses from '../components/searchCourses';
import LandingNav from '../components/Navigation/LandingNav';
import { Store } from "../components/store";


function LandingPage(){

const { state } = React.useContext(Store)
console.log(state)
    return(
        <div>
            <LandingNav/>
            <Header />
            <SearchCourses />
        </div>
    );
}

export default LandingPage;