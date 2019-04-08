import React from 'react';
import Header from '../components/LandingPage/Header';
import SearchCourses from '../components/searchCourses';
import LandingNav from '../components/Navigation/LandingNav';
import { Store } from "../components/store";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = {
    root:{
        width:"100%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column",
    },
    keepTrack:{
        width:"100%",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        background:"#F7F7F7",
        height:"600px",
        boxSizing:"border-box",
        padding:"5%",
        justifyContent:"space-between",
    },
    keepTrackContent:{
        display:"flex",
        width:"60%",
        alignItems:"center",
        color:"grey",
        justifyContent:"space-between"
    },
}

function LandingPage(props){

    const { state } = React.useContext(Store)
    console.log(state)
    const {classes} = props;
    return(
        <div className={classes.root}>
            <LandingNav/>
            <Header />
            <div className={classes.keepTrack}>
            <svg style={{width:'100px',height:'100px', color:'blue'}} viewBox="0 0 24 24">
                <path fill="#000000" d="M15,7H20.5L15,1.5V7M8,0H16L22,6V18A2,2 0 0,1 20,20H8C6.89,20 6,19.1 6,18V2A2,2 0 0,1 8,0M4,4V22H20V24H4A2,2 0 0,1 2,22V4H4Z" />
            </svg>
                <h1>Keep Track of Your Important Articles/Courses</h1>
                <div className={classes.keepTrackContent}>
                    <h1 style={{width:"20%"}}>Save your articles with a press of a button</h1>
                    <h1 style={{width:"20%"}}>Link your Udemy account with ease to see all your most popular courses</h1>
                    <h1 style={{width:"20%"}}>Save any course for later</h1>
                </div>
            </div>
            {/* <SearchCourses /> */}
        </div>
    );
}

LandingPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingPage);