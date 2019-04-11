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
    keepTrackImg : {
        height:"250px"
    }
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
                <img className={classes.keepTrackImg} src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/portfolio_essv.svg" alt="keep track"/>
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