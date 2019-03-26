import React from 'react';
import Link from "next/link";
// Bringing in SearchCourses for future reference
import SearchCourses from '../components/searchCourses';

function LandingPage(){
    return(
        <div>
            {/* These links will be placed into a navbar component at some point */}
            <Link href="/Homepage">
                <a>Home</a>
            </Link>
            <Link href="/learning-lab">
                <a>Learning Lab</a>
            </Link>
            <Link href="/browse">
                <a>Browse</a>
            </Link>
            <Link href="/community">
                <a>Community</a>
            </Link>

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