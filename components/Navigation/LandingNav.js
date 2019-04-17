import Link from "next/link";
import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

//  https://balsamiq.cloud/snv27r3/pqwdr68/r0330

const styles = theme => ({
    nav : {
        width:"100%",
        borderBottom: '1px solid rgba(0,0,0,.1)',
        boxShadow: '0 5px 6px -6px black',
        background: 'ghostwhite'
    },
    toolbar : {
        padding:0,
        width:"60%",
        margin: '0 auto',
        display: 'flex',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    loginButton: {
        color: theme.mixins.modernPink,
        fontSize: '1rem',
        textTransform: 'none'
    },
    signUpButton: {
        background: '#e76d89',
        borderRadius: '24px',
        color: 'white',
        marginLeft: '10px',
        fontSize: '1.1rem',
        paddingLeft: '25px',
        paddingRight: '25px',
        textTransform: 'none',
        '&:hover' : {
            background: theme.mixins.pinkBoot
        }
    },
    landingButtons: {
        display: 'flex',
        height: '45px',
        alignItems: 'center',
        '& p': {
            margin: '0 8px 0 10px'
        }
    },
    logo : {
        height: '100px',
        width: '200px',
        backgroundImage: `url(https://i.ibb.co/jMv4F19/medium-res.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    mobileAuthButton: {
        display: 'none',
        background: '#e76d89',
        borderRadius: '24px',
        color: 'white',
        fontSize: '.9rem',
        textTransform: 'none',
    },
    '@media(max-width: 1150px)': {
        toolbar : {
            margin:'0 6% 0 6%',
            width:"88%",
        },
        
        Button: {
            fontSize: '11px',
            width: '125px',
            border: '1px red'
        }
    },
    '@media(max-width: 500px)': {
        toolbar: {
            width: '94%',
            margin:'0 3% 0 3%',
        },
        landingButtons: {
            display: 'none'
        },
        mobileAuthButton: {
            display: 'block',
        },
        logo : {
            width: '150px',
        }
    }
})

const LandingNav = (props) => {

    const { classes } = props;
    
    return(
        <div className={classes.nav}>
            <Toolbar variant="regular" className={classes.toolbar}>
                <div className={classes.logo}/>
                <div className={classes.landingButtons}>
                    <Link href="/Homepage">
                        <Button className={classes.loginButton}>Login</Button>
                    </Link>
                    <p>or</p>
                    <Link href="/Homepage">
                        <Button className={classes.signUpButton}>Sign Up</Button>
                    </Link>   
                </div>
                <Link href="/Homepage">
                        <Button className={classes.mobileAuthButton}>Login / Signup</Button>
                </Link>
            </Toolbar>
        </div>
    );
}

LandingNav.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingNav);
