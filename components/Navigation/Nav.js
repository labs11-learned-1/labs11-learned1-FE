import Link from 'next/link'
import React, {useContext, useState} from 'react';
import { Store } from "../store";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
//import Router from 'next/router'
// import * as firebase from "firebase";
// import { loadDB } from '../../firebaseConfig/firebase';

const styles = theme => ({
    nav : {
        width:"100%",
        borderBottom: '1px solid rgba(0,0,0,.1)',
        boxShadow: '0 5px 6px -6px black'
    },
    toolbar : {
        padding:0,
        margin:"0 auto",
        width:"48%",
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
    tabs: {
        display: 'flex',
    },
    links: {
        marginLeft: '20px'
    },
    root: {
        display: 'flex',
      },
    paper: {
        marginRight: theme.spacing.unit * 2,
    },
});

const Navigation  = (props) => {

    const [open, setOpen] = useState(false);
    const {state, dispatch} = useContext(Store);

    const handleSignOut = async () => {
        let myVal = await loadDB();
         myVal
    //       .auth()
    //       .signOut()
    //       .then((result) => {
    //         console.log("logout success", result)
    //         return dispatch({ type: "LOGGED_OUT" });
    //       })
    //       .catch(e => {
    //         alert("Error signing out");
    //       });
    };

    const handleToggle = () => {
        setOpen(!open);
      };
    
    const handleClose = event => {
        if (Button.anchorEl.contains(event.target)) {
          return;
        }
    
        setOpen(false);
      };
      //test comment

    const { classes } = props;

    if (!state.loggedIn) {
        return (
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
      } else {
        return (
          <div className={classes.nav}>
            <Toolbar variant="regular" className={classes.toolbar}>
                <div className={classes.logo} /*onClick={() => Router.push('/Homepage')} *//>
                <div className={classes.tabs}>
                    <Link href="/Homepage">
                        <a className={classes.links}>Home</a>
                    </Link>
                    <Link href="/learning-lab">
                        <a className={classes.links}>Learning Lab</a>
                    </Link>
                    <Link href="/community">
                        <a className={classes.links}>Community</a>
                    </Link>
                    <div>
                        <Button
                            buttonRef={node => {
                            Button.anchorEl = node;
                            }}
                            aria-owns={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                        >
                           Account
                        </Button>
                        <Popper open={open} anchorEl={Popper.anchorEl} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                id="menu-list-grow"
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList>
                                        <Link href='/settings'>
                                            <MenuItem onClick={handleClose}>Settings</MenuItem>
                                        </Link>
                                        <Link href='/Homepage'>
                                            <MenuItem onClick={handleSignOut}>SignOut</MenuItem>
                                        </Link>
                                    </MenuList>
                                </ClickAwayListener>
                                </Paper>
                            </Grow>
                            )}
                        </Popper>
                    </div>
                </div>
            </Toolbar>
          </div>
        );
      }
  }

  Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

  
export default withStyles(styles)(Navigation);