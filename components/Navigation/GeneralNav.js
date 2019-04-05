import Link from "next/link";
import React, {useContext, useState} from "react";

import { loadDB } from "../../firebaseConfig/firebase";
import * as firebase from "firebase";

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
//  https://balsamiq.cloud/snv27r3/pqwdr68/

import algoliasearch from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch-dom';
import { SearchBox } from 'react-instantsearch-dom';



const searchClient = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLI_SEARCH_KEY
  );

const styles = theme => ({
    nav : {
        width:"100%",
        borderBottom: '1px solid rgba(0,0,0,.1)',
        boxShadow: '0 5px 6px -6px black'
    },
    toolbar : {
        width:"60%",
        display: 'flex',
        margin: '0 auto',
        justifyContent: "space-between",
        padding: '0',
        
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
    navBarLinksMedium: {
        display: 'none'
    },
    navBarLinksLarge: {
        display: 'flex',
    },
    root: {
        display: 'flex',
      },
    paper: {
        marginRight: theme.spacing.unit * 2,
    },
    Button: {
        fontSize: '11px'
    },
    menuList: {
        display: 'none'
    },
    '@media(max-width: 880px)': {
        navBarLinksMedium: {
            display: 'flex',
        },
        navBarLinksLarge: {
            display: 'none',
        },
        menuList: {
            width: '100%',
            zIndex: '3',
            display: 'block'
        }

    },
    '@media(max-width: 600px)': {
        logo: {
            height: '75px',
            width: '100px',
        },
        toolbar : {
            margin:'0 6% 0 6%',
            width:"88%",
        }
    }
});

const GeneralNav = (props) => {

    const [open, setOpen] = useState(false);
    const {state, dispatch} = useContext(Store);

    const handleSignOut = async () => {
        let myVal = await loadDB();
         myVal
           .auth()
           .signOut()
           .then((result) => {
             console.log("logout success", result)
             return dispatch({ type: "LOGGED_OUT" });
           })
           .catch(e => {
             alert("Error signing out");
           });
    };

    const handleClose = event => {
        if (Button.anchorEl.contains(event.target)) {
          return;
        }
    
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(!open);
      };

    const { classes } = props;
      
    return(
        <div className={classes.nav}>
            <Toolbar variant="regular" className={classes.toolbar}>
                <div className={classes.logo} /*onClick={() => Router.push('/Homepage')} *//>
                <InstantSearch
                    indexName="instant_search"
                    searchClient={searchClient}
                >
                    <SearchBox />
                </InstantSearch>
                
                <div className={classes.navBarLinksLarge}>
                    <Link href="/Homepage">
                        <Button className={classes.links}>Home</Button>
                    </Link>
                    <Link href="/learning-lab">
                        <Button className={classes.links}>Learning Lab</Button>
                    </Link>
                    <Link href="/community">
                        <Button className={classes.links}>Community</Button>
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
                                            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                                        </Link>
                                       
                                    </MenuList>
                                </ClickAwayListener>
                                </Paper>
                            </Grow>
                            )}
                        </Popper>
                    </div>
                </div>
                <div className={classes.navBarLinksMedium}>
                        <Button
                            buttonRef={node => {
                            Button.anchorEl = node;
                            }}
                            aria-owns={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                        >
                           Burger
                        </Button>
                </div>
                
            </Toolbar>
            <div>
                <Popper  className={classes.menuList}open={open} anchorEl={Popper.anchorEl} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        id="menu-list-grow"
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper >
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList >
                                <Link href="/Homepage">
                                    <MenuItem>Home</MenuItem>
                                </Link>
                                <Link href="/learning-lab">
                                    <MenuItem className={classes.menuItem}>Learning Lab</MenuItem>
                                </Link>
                                <Link href="/community">
                                    <MenuItem>Community</MenuItem>
                                </Link>
                                <Link href='/settings'>
                                    <MenuItem onClick={handleClose}>Settings</MenuItem>
                                </Link>
                                
                                <Link href='/Homepage'>
                                    <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                                </Link>
                            </MenuList>
                        </ClickAwayListener>
                        </Paper>
                    </Grow>
                    )}
                </Popper>
                </div>
          </div>
    );
}

GeneralNav.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GeneralNav);
