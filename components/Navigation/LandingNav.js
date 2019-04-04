import Link from "next/link";
import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { auth } from "firebase";
//  https://balsamiq.cloud/snv27r3/pqwdr68/r0330

const styles = theme => ({
    nav : {
        width:"100%",
        borderBottom: '1px solid rgba(0,0,0,.1)',
        boxShadow: '0 5px 6px -6px black'
    },
    toolbar : {
        padding:0,
        width:"60%",
        margin: '0 auto',
        display: 'flex',
        justifyContent: "space-between",
    },
    logo : {
        height: '100px',
        width: '150px',
        backgroundImage: `url(https://i.ibb.co/vHLKCnG/low-res.png)`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    '@media(max-width: 600px)': {
        toolbar : {
            margin:'0 6% 0 6%',
            width:"88%",
        },
        logo : {
            height: '75px',
            width: '100px',
        },
        Button: {
            fontSize: '11px',
            width: '125px'
        }
    },
})

const LandingNav = (props) => {

    const { classes } = props;
    
    return(
        <div className={classes.nav}>
            <Toolbar variant="regular" className={classes.toolbar}>
                <div className={classes.logo}/>
                <div>
                    <Link href="/Homepage">
                        <Button className={classes.Button} color="#69178A">Login / Sign Up</Button>
                    </Link>
                </div>
            </Toolbar>
        </div>
    );
}

LandingNav.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingNav);
