import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from 'next/link';

const styles = {
    root:{
        height:"500px",
        background:"url('https://www.photohdx.com/images/2016/10/abstract-grey-blue-blurred-shapes-background.jpg')",
        backgroundSize:"cover",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    textArea:{
        color:"white",
        width:"30%"
    },
    headerTitle : {
        fontSize:"2.7rem"
    },
    headerText:{
        fontSize:"1.6rem"
    },
    headerSignUp : {
        fontSize:"1.2rem",
        backgroundColor:"white",
        color:"#094A8D",
        '&:hover' : {
            color:"white",
            backgroundColor:"#094A8D",
        }
    },
    img : {
        height : "85%"
    },
    '@media(max-width: 600px)': {
        root:{
            flexDirection:"column",
            justifyContent:"space-evenly",
        },
        img:{
            display:"none"
        },
        textArea:{
            color:"white",
            width:"70%",
        },
        headerTitle: {
            fontSize: '2rem'
        },
        headerText: {
            fontSize: '1.5rem'
        }
    },
    '@media(max-width: 800px)': {
        root: {
            justifyContent:"space-evenly",
        },
        headerTitle: {
            fontSize: '2rem'
        },
        headerText: {
            fontSize: '1.5rem',
            width: '200px'
        },
        headerSignUp: {
            fontSize: '1rem'
        }
    }
}

function Header(props){
    const {classes} = props;
    return(
        <div className={classes.root}>
            <div className={classes.textArea}>
                <h1 className={classes.headerTitle}>Never be <br />Unproductive Again!</h1>
                <p className={classes.headerText}>
                    Learned helps you find the perfect courses and blog posts without any hassle, all while keeping
                    you updated with your friends and follows.
                </p>
                <Link href="/Homepage">
                    <Button className={classes.headerSignUp}>Sign Up for free</Button>
                </Link>
            </div>
            <img className={classes.img} src="https://camo.githubusercontent.com/ff5622df209d49b0beba25976acd665fac3e0522/68747470733a2f2f696d616765732e636f6e74656e7466756c2e636f6d2f666d6a6b31386b30647979692f364a62447530327848696d4f7561307773794f7977672f36323631363466396336653363353933383366333430643237386530656330362f53637265656e5f53686f745f323031382d30312d32395f61745f31352e32342e35332e706e67" />
        </div>
    )
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);