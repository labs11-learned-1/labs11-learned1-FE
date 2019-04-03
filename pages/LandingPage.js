import React from 'react';
import Nav from '../components/Navigation/Nav';
import Header from '../components/LandingPage/Header';
import SearchCourses from '../components/searchCourses';
import LandingNav from '../components/Navigation/LandingNav';

function LandingPage(){
    return(
        <div>
            <LandingNav/>
            <Header />
            <SearchCourses />
        </div>
    );
}

export default LandingPage;