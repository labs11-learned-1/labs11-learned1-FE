import React from 'react';
import Link from "next/link";
// Bringing in SearchCourses for future reference
import SearchCourses from '../components/searchCourses';
import Nav from '../components/Navigation/Nav'

function LandingPage(){
    return(
        <div>
            {/* These links will be placed into a navbar component at some point */}
            
            <Nav />
            <h1>Current Courses</h1>
            <div className="thisIsWhereCoursesCardsWillGo">

            </div>
            <h1>My List</h1>
            <div className="IDKWTFThisIs">
            
            </div>
        </div>
    );
}

export default LandingPage;