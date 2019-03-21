import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Link from 'next/link';


const styles = {
    nav : {
        width:"100%",
    },
    toolbar : {
        padding:0,
        margin:"0 auto",
        width:"48%",
        display: 'flex',
        justifyContent: "space-between",
    },
    logo : {
        height: '150px',
    },
    signup : {
        border:"1px solid #094A8D",
    }
};

function Nav(props) {
    const { classes } = props;
    return (
        <div className={classes.nav}>
            <Toolbar variant="regular" className={classes.toolbar}>
            <img src="https://i.ibb.co/vHLKCnG/low-res.png" alt="low-res" className={classes.logo} />
            <div>
                <Link href="/login"><Button className={classes.Button} color="#69178A">Login</Button></Link>
                <Button className={classes.signup} color="#69178A">Sign Up</Button>
            </div>
            </Toolbar>
        </div>
    );
}

Nav.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav);
