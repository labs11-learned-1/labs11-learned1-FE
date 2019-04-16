
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from 'next/link';

const styles = {
    root:{
        height:"600px",
        background:"url('https://i.ibb.co/HHf65vV/trianglify-1.png')",
        backgroundSize:"cover",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
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
        width:"15%",
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
                    Erudition utilizes a social community to help you find the most effective resources in a modern
                    era of infinite information, all while allowing you to update your platform of friends and peers on your 
                    latest finds!
                </p>
                <Link href="/Homepage">
                    <Button className={classes.headerSignUp}>Sign Up for free</Button>
                </Link>
            </div>
            <img className={classes.img} src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/process_e90d.svg" />
        </div>
    )
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);