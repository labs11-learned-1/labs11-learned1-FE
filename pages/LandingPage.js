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
        overflow:"hidden",
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
        alignItems:"flex-start",
        color:"grey",
        justifyContent:"space-between",
    },
    keepTrackImg : {
        height:"100px"
    },
    keepTrackh1:{
        width:"30%",
        color: '#888b8d',
        fontFamily: 'Soleil_Light,Helvetica,Arial,sans-serif',
        fontSize: '32px',
        lineHeight: 2,
        textAlign:"center",
    },
    section3:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        margin:"45px 0"
    },
    Section3Header:{
        fontFamily: 'Soleil_Light,Helvetica,Arial,sans-serif',
        fontSize: '48px',
        lineHeight: '64px',
        fontWeight:"150"
    },
    Section3SubHeader:{
        fontSize: '24px',
        lineHeight: '40px',
        margin: '0 auto',
        maxWidth: '800px',
        width: 'auto',
        textAlign:"center",
    },
    cardContainer:{
        marginTop:"75px",
        marginBottom: '160px',
        marginRight: 0,
        maxWidth: '70%',
        width: '60%',
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between"
    },
    cardContent:{
        height:"100%",
        width:"50%",
        display:'flex',
        flexDirection:"column",
        justifyContent:"space-around",
    },
    cardHeader:{
        color: '#000051',
        fontSize: '40px',
        letterSpacing: 0,
        lineHeight: '48px',
        marginBottom: '40px',
    },
    cardSubHeader:{
        color: '#24292f',
        fontSize: '24px',
        letterSpacing: 0,
        lineHeight: '40px',
        width:"80%"
    },
    getStartedBtn:{
        "display":"inline-block",
        "fontFamily":"Soleil_Bold,Helvetica,Arial,sans-serif",
        "fontSize":"14px","lineHeight":"normal",
        "textDecoration":"none",
        "textAlign":"center",
        "color":"#fff",
        "background":"#1a237e",
        "border":"0",
        "borderRadius":"3px",
        "padding":"18px 32px 17px",
        "transition":"background .5s ease-in-out",
        "WebkitFontSmoothing":"antialiased",
        "letterSpacing":"1.5px",
        marginBottom:"50px",
        cursor:"pointer",
        '&:hover':{
            background:"#534bae",
        }
    },
    howToCardContainer:{
        display:"flex",
        justifyContent:"space-between",
        marginTop:"50px",
    },
    howToCard:{
        width:"30%",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
    },
    howToCardHeader:{
        "fontFamily": "Soleil_Bold,Helvetica,Arial,sans-serif",
        "fontSize": "20px",
        "letterSpacing": "1px",
        "lineHeight": "32px",
        "textAlign": "center",
        "textTransform": "uppercase",
        "marginBottom": "20px"
    },
    howToCardSubHeader:{
        "fontFamily": "Soleil_Light,Helvetica,Arial,sans-serif",
        "color": "#192026",
        "fontSize": "18px",
        "letterSpacing": "0",
        "lineHeight": "32px",
        "marginTop": "16px",
        "textAlign": "center"
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
                <h1 className={classes.Section3Header}>Keep Track of Your Important Articles/Courses</h1>
                <div className={classes.keepTrackContent}>
                    <div className={classes.keepTrackh1}>Save your articles with a press of a button</div>
                    <div className={classes.keepTrackh1}>Link your Udemy account with ease</div>
                    <div className={classes.keepTrackh1}>Save any course or article for later</div>
                </div>
            </div>
            <div style={{clipPath: 'polygon(100% 16%, 0 16%, 50% 100%)', width:"100%", height:"100px", background:"white", marginTop:"-18px", background:"#F7F7F7",}} />
            <div className={classes.section3}>
                <img style={{width:"100px"}} src="https://png.pngtree.com/svg/20170812/e569370d9c.png" />
                <h2 className={classes.Section3Header}>Share Your Progress With Your Friends</h2>
                <div className={classes.Section3SubHeader}>Anywhere and on any device</div>
            </div>

            <div className={classes.cardContainer}>
                <div className={classes.cardContent}>
                    <div className={classes.cardHeader}>Keep Track of everything important</div>
                    <div className={classes.cardSubHeader}>One application to keep track of your progess, and keep up with friends at the same time.</div>
                </div>
                <img style={{height:"320px"}} src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/online_friends_x73e.svg" alt="Online friends" />
            </div>

            <div className={classes.cardContainer}>
                <img style={{height:"400px"}} src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/booking_33fn.svg" alt="Online friends" />
                <div className={classes.cardContent}>
                    <div className={classes.cardHeader}>See what your friends are learning and save it to your collection.</div>
                    <div className={classes.cardSubHeader}>Want to learn the same thing as your friend? Simply save the courses/articles they have for later!</div>
                </div>
            </div>
            {/* <SearchCourses /> */}
            <div className={classes.getStartedBtn}>Get Started!</div>

            <div>
                <div className={classes.Section3Header} style={{textAlign:"center", marginTop:"100px"}}>How it works</div>

                <div className={classes.howToCardContainer}>

                    <div className={classes.howToCard}>
                        <img style={{height:"100px"}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png" alt="logo" />
                        <div className={classes.howToCardHeader}>Sign up for a free account</div>
                        <div className={classes.howToCardSubHeader}>Just login with Google</div>
                    </div>

                    <div style={{borderRight:"1px solid black", borderLeft:"1px solid black"}} className={classes.howToCard}>
                        <img style={{height:"100px"}} src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/people_search_wctu.svg" alt="logo" />
                        <div className={classes.howToCardHeader}>Find Your Friends</div>
                        <div className={classes.howToCardSubHeader}>Just search for them by username or even posts</div>
                    </div>

                    <div className={classes.howToCard}>
                        <img style={{height:"100px"}} src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/blog_anyj.svg" alt="logo" />
                        <div className={classes.howToCardHeader}>Add any course, blog, or article</div>
                        <div className={classes.howToCardSubHeader}>Just paste them into my list or find them somewhere else.</div>
                    </div>

                </div>

            </div>

            <div className={classes.Section3Header} style={{margin:"150px 0 50px 0"}}>
                Sign Up Today At Zero Cost!
            </div>
            <div className={classes.getStartedBtn}>Sign Up!</div>
        </div>
    );
}

LandingPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingPage);