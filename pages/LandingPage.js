import React from 'react';
import Header from '../components/LandingPage/Header';
import LandingNav from '../components/Navigation/LandingNav';
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
        justifyContent: 'center',
        '& h1': {
            textAlign: 'center'
        }
    },
    keepTrackContent:{
        display:"flex",
        width:"100%",
        alignItems:"flex-start",
        color:"grey",
        justifyContent:"center",
    },
    keepTrackImg : {
        height:"100px"
    },
    keepTrackh1:{
        width:"256px",
        height: 'auto',
        color: '#888b8d',
        fontFamily: 'Soleil_Light,Helvetica,Arial,sans-serif',
        fontSize: '2.2rem',
        lineHeight: '4rem',
        textAlign:"center",
        marginLeft: '10px',
        marginRight: '10px'
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
        fontSize: '3rem',
        lineHeight: '64px',
        fontWeight:"150",
        textAlign: 'center'
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
        maxWidth: '1200px',
        width: '1200px',
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
        "background":"#e76d89",
        "border":"0",
        "borderRadius":"24px",
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
        justifyContent:"center",
        marginTop:"50px",
    },
    howToCard:{
        width:"30%",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        padding: '0 30px 0 30px'
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
    },
    Section4Header: {
        margin:"150px 0 50px 0",
        paddingTop:"50px", 
        borderTop:"1px solid black",
        fontFamily: 'Soleil_Light,Helvetica,Arial,sans-serif',
        fontSize: '3rem',
        lineHeight: '64px',
        fontWeight:"150",
        textAlign: 'center'
    },
    '@media(max-width: 1300px)': {
        cardContainer: {
            flexDirection: 'column',   
            marginBottom: '50px'       
        },
        cardContent: {
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            paddingBottom: '50px',
            paddingTop: '50px'
        }
    },
    '@media(max-width: 1000px)': {
        keepTrackh1: {
            fontSize: '1.8rem'
        },
        howToCardHeader: {
            marginTop: '10px',
            fontSize: '1.2rem',
            height: '128px'
        },
        howToCardSubHeader: {
            height: '160px',
            marginTop: 0
        }
    },
    '@media(max-width: 800px)': {
        Section3Header:{
            fontSize: '2rem'
        },
        Section4Header:{
            fontSize: '2rem'
        },
        keepTrackh1: {
            fontSize: '1.4rem'
        },
        cardContainer: {
            marginTop: 0,
            marginBottom: '30px',
            '& img': {
                display: 'none'
            }
        },
    },
    '@media(max-width: 600px)': {
        keepTrackContent: {
            display: 'none'
        },
        Section3Header:{
            fontSize: '1.9rem'
        },
        Section4Header:{
            fontSize: '1.9rem',
            marginTop: '50px'
        },
        cardHeader: {
            fontSize: '2.2rem'
        },
        cardSubHeader: {
            fontSize: '1.6rem'
        },
        cardContainer: {
            width: '90%',
            margin: '0 5% 0 5%'
        },
        cardContent: {
            width: '100%'
        },
        howToCardContainer: {
            flexDirection: 'column',
            justifyContent: 'center',
        },
        howToCard: {
            borderLeft: 'none !important',
            borderRight: 'none !important',
            width: '90%',
            marginBottom: '100px'
        },
        howToCardHeader: {
            height: 'auto'
        },
        howToCardSubHeader: {
            height: 'auto',
        }
        
    }
}

const LandingPage = (props) =>{
    const {classes} = props;
    return(
        <div className={classes.root}>
            <LandingNav/>
            <Header />
            <div className={classes.keepTrack}>
                <img className={classes.keepTrackImg} src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/portfolio_essv.svg" alt="keep track"/>
                <h1 className={classes.Section3Header}>Keep Track of Important Articles and Courses</h1>
                <div className={classes.keepTrackContent}>
                    <div className={classes.keepTrackh1}>Save articles and courses with the press of a button</div>
                    <div className={classes.keepTrackh1}>Link your Udemy account with ease</div>
                    <div className={classes.keepTrackh1}>All your favorite articles and courses in one place</div>
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

            <div className={classes.Section4Header}>
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