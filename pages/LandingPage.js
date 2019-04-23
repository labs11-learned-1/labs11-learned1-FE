import React from 'react';
import Header from '../components/LandingPage/Header';
import SearchCourses from '../components/searchCourses';
import LandingNav from '../components/Navigation/LandingNav';
import { Store } from "../components/store";
import '../styles/landingPage.css';

function LandingPage(props){

    const { state } = React.useContext(Store)

    return(
        <div className="root">
            <LandingNav/>
            <Header />
            <div className="keepTrack">
                <img className="keepTrackImg" src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/portfolio_essv.svg" alt="keep track"/>
                <h1 className="Section3Header">Keep Track of Important Articles and Courses</h1>
                <div className="keepTrackContent">
                    <div className="keepTrackh1">Save articles and courses with the press of a button</div>
                    <div className="keepTrackh1">Link your Udemy account with ease</div>
                    <div className="keepTrackh1">All your favorite articles and courses in one place</div>
                </div>
            </div>
            <div style={{clipPath: 'polygon(100% 16%, 0 16%, 50% 100%)', width:"100%", height:"100px", background:"white", marginTop:"-18px", background:"#F7F7F7",}} />
            <div className="section3">
                <img style={{width:"100px"}} src="https://png.pngtree.com/svg/20170812/e569370d9c.png" />
                <h2 className="Section3Header">Share Your Progress With Your Friends</h2>
                <div className="Section3SubHeader">Anywhere and on any device</div>
            </div>

            <div className="cardContainer">
                <div className="cardContent">
                    <div className="cardHeader">Keep Track of everything important</div>
                    <div className="cardSubHeader">One application to keep track of your progess, and keep up with friends at the same time.</div>
                </div>
                <img style={{height:"320px"}} src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/online_friends_x73e.svg" alt="Online friends" />
            </div>

            <div className="cardContainer">
                <img style={{height:"400px"}} src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/booking_33fn.svg" alt="Online friends" />
                <div className="cardContent">
                    <div className="cardHeader">See what your friends are learning and save it to your collection.</div>
                    <div className="cardSubHeader">Want to learn the same thing as your friend? Simply save the courses/articles they have for later!</div>
                </div>
            </div>
            {/* <SearchCourses /> */}
            <div className="getStartedBtn">Get Started!</div>

            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <div className="Section3Header" style={{textAlign:"center", marginTop:"100px"}}>How it works</div>

                <div className="howToCardContainer">
                    <div className="howToCard">
                        <img style={{height:"100px"}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png" alt="logo" />
                        <div className="howToCardHeader">Sign up for a free account</div>
                        <div className="howToCardSubHeader">Just login with Google</div>
                    </div>

                    <div style={{borderRight:"1px solid black", borderLeft:"1px solid black"}} className="howToCard">
                        <img style={{height:"100px"}} src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/people_search_wctu.svg" alt="logo" />
                        <div className="howToCardHeader">Find Your Friends</div>
                        <div className="howToCardSubHeader">Just search for them by username or even posts</div>
                    </div>

                    <div className="howToCard">
                        <img style={{height:"100px"}} src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/blog_anyj.svg" alt="logo" />
                        <div className="howToCardHeader">Add any course, blog, or article</div>
                        <div className="howToCardSubHeader">Just paste them into my list or find them somewhere else.</div>
                    </div>

                </div>

            </div>

            <div className="Section4Header">
                Sign Up Today At Zero Cost!
            </div>
            <div className="getStartedBtn">Sign Up!</div>
        </div>
    );
}

export default LandingPage;