import React from 'react';
import Nav from '../components/Navigation/Nav';
import Header from '../components/LandingPage/Header';
import SearchCourses from '../components/searchCourses';

function LandingPage(){
    return(
        <div>
            <Nav />
            <Header />
            <SearchCourses />
        </div>
    );
}

export default LandingPage;