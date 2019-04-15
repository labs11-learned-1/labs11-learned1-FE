import Link from "next/link";
import Head from 'next/head'
import React, {useContext, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faHome, faBookmark, faStream } from '@fortawesome/free-solid-svg-icons'

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
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

//  https://balsamiq.cloud/snv27r3/pqwdr68/

import algoliasearch from 'algoliasearch';
import { InstantSearch, SearchBox, Hits, connectStateResults, Index, Configure } from 'react-instantsearch-dom';

const styles = theme => ({
    nav : {
        width:"100%",
        borderBottom: '1px solid rgba(0,0,0,.1)',
        boxShadow: '0 5px 6px -6px black',
        height: '70px',
        zIndex: "40",
        backgroundColor: 'ghostwhite',
        position: 'fixed',
        top: "0"
    },
    toolbar : {
        width:"70%",
        display: 'flex',
        margin: '0 auto',
        minHeight: '71px',
        justifyContent: "space-between",
        padding: '0',
        alignItems: 'center' 
    },
    logo : {
        height: '55px',
        width: '150px',
        backgroundImage: `url(https://i.ibb.co/6y24GKH/mediumsmall-res.png)`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&:hover': {
            cursor: 'pointer'
        }
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
    hitList: {
        margin: '0'
    },
    burgerWrapper: {
        padding: '0',
        width: '25px',
        height: '25px', 
        minWidth: '25px',
        display: 'none',
        
        '& svg': {
            padding: '0',
            margin: '0 !important',
        }
    },
    tmIcons: {
        width: '25px !important',
        height: '25px', 
        
        color: '#1a237e',
    },
    searchIcon: {
        display: 'none'
    },
    searchBox: {     
        display: 'flex',
        justifyContent: 'flex-end',
        '& form': {
            width: '220px',
        }
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        '& ul': {
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            width: '500px'
        },
        '& li': {
            width: '100%',
            marginTop: '0',
            marginLeft: '0',
            backgroundColor: 'white',
            paddingBottom: '0',
            paddingTop: '0',
            zIndex: '5',
            height: '50px',
            '& :hover': {
                cursor: 'pointer'
            },
            '& p': {
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
            }
        }
    },
    instantSearch: {
        width: '100%',
    },
    tmButtons: {
        display: 'flex',
        alignItems: 'center',
    },
    mainIcons: {
        marginRight: '240px',
        display: 'flex',
        '& p': {
            margin: '0',
            paddingLeft: '5px'
        },
    },
    largeIcons: {
        display: 'flex',
        alignItems: 'center'
    },
    iconWrapper: {
        display: 'flex',
        alignItems: 'center',
        
    },
    Account: {
        borderRadius: '50%',
        minWidth: '40px',
        width: '40px',
        height: '40px',
        padding: '0',
        marginLeft: '20px'
        
    },
    iconContent: {
        display: 'block',

        paddingLeft: '20px',
        '& :hover': {
            color: '#e0e0eb !important',
            cursor: 'pointer !important',  
            '& svg': {
                color: '#e0e0eb !important',
                cursor: 'pointer !important',  
            }
        }
    },
    extraDivIcon: {
        display: 'flex',
        alignItems: 'center',
    },
    mobileSearch: {
        display: 'none'
    },
    ISearchWrapper: {
        '& h2': {
            padding: '6px 1rem 6px 1rem',
            backgroundColor: '#000051',
            color: 'white',
            border: '1px solid #c4c8d8',
            margin: 0,
            zIndex: '10',
            position: 'relative',
            zIndex: '10'
        },
    },
    smallIcons: {
        display: 'none'
    },
    '@media(min-width: 880px)': {  
        ISearchWrapper: {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            position: 'absolute',
            right: '60px',
            top: '20px', 
        }, 
        mobileSearch: {
            display: 'none !important'
        },
    },
    '@media(max-width: 1150px)': {
        iconContent: {
            '& p': {
                display: 'none'
            }
        },
    },
    '@media(max-width: 880px)': {
        navBarLinksLarge: {
            display: 'none',
        },
        menuList: {
            width: '100%',
            zIndex: '5',
            display: 'block'
        },
        searchBox: {
            width: '100%',
            zIndex: '10',
            
            '& form': {
                width: '100% !important'
            },
            padding: '0'
        },
        tmButtons: {
            display: 'flex'
        },
        
        desktopSearch: {
            display: 'none !important'
        },
        mainIcons: {
            marginRight: 0
        },    
        smallIcons: {
            display: 'none',
            '& svg': {
                marginRight: '20px'
            }
        },
        burgerWrapper: {
            display: 'none'
        }, 
        mobileDropdown: {
            display: 'none'
        },
        searchIcon: {
            display: 'flex',
            width: '25px !important',
            height: '25px', 
            marginLeft: '20px',
            color: '#1a237e',
        },
    },
    '@media(max-width: 600px)': {
        toolbar : {
            margin:'0 6% 0 6%',
            width:"88%",
        },
        desktopSearch: {
            display: 'none',
            height: '29.59px'
        },
        smallIcons: {
            display: 'flex'
        },
        burgerWrapper: {
            display: 'block'
        },
        largeIcons: {
            display: 'none !important'
        },
        mobileDropdown: {
            display: 'block'
        }  
    },
    
});

const GeneralNav = (props) => {

    const [accountOpen, setAccountOpen] = useState(false);
    const [burgerOpen, setBurgerOpen] = useState(false);
    const {state, dispatch} = useContext(Store);
    const [searchStatus, setSearchStatus] = useState(false);
    const [tabs, setTabs] = useState(false);

    const searchClient = algoliasearch(
        `${process.env.ALGOLIA_APP_ID}`,
        `${process.env.ALGOLIA_SEARCH_KEY}`
    );
    
    const Hit = ({hit}) => {
        let hitItem;
        if(hit.title) {
            hitItem = <Link href={`/postPage?content=${hit.objectID}`}>
                            <p>{hit.title}</p>
                        </Link>
        } else {
            hitItem = <Link href={`/users-lab?user=${hit.objectID}`}>
                            <p>{hit.username}</p>
                        </Link>
        }
        return (
            <div className="hit">
                <div className="hitImage">
                    {hitItem}  
                </div>
            </div>
        )
    }

    const Content = connectStateResults(({ searchState }) =>
      searchState && searchState.query
        ? <div style={{margin: '0 !important'}} className={classes.list}>
            <Hits hitComponent = {Hit} />
          </div>
        : <div></div>
  );

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

    const { classes } = props;

    let ISearch = <InstantSearch
        indexName="posts"                   
        searchClient={searchClient}                    
    >
                <ClickAwayListener onClickAway={() => setTimeout(() => {setTabs(false)})} >       
            <div className={classes.ISearchWrapper}> 
                    <SearchBox 
                    className={classes.searchBox} 
                    translations={{placeholder: 'Search Erudition...'}}
                    reset={false}
                    poweredBy={true}
                    onChange={(ev) => {ev.target.value === '' ? setTabs(false) : setTabs(true)}}
                    onClick={(ev) => {ev.target.value != '' ? setTabs(true) : ev.target.value}}
                    />
                    {tabs ?
                    <div>
                        <Index indexName="posts">
                            <h2 className={classes.searchTitle}>Articles</h2>
                            <Configure hitsPerPage={5} />
                            <Content/>
                        </Index> 
                        <Index indexName="users">
                            <h2 className={classes.searchTitle}>Users</h2>
                            <Configure hitsPerPage={5} />
                            <Content/>
                        </Index>
                    </div> : undefined}  
                </div> 
            </ClickAwayListener>      
    </InstantSearch>

    return(
        <div className={classes.nav}>
            <Head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.1.1/themes/algolia-min.css" integrity="sha256-nkldBwBn2NQqRL1mod7BqHsJ6cEOn6u/ln6F/lI4CFo=" crossorigin="anonymous"/>
            </Head>

            <Toolbar variant="regular" className={classes.toolbar}>
                <div className={classes.logo}/>
                <div className={classes.iconWrapper}>
                    <div className={classes.desktopSearch}> 
                        {ISearch}
                    </div>  
                    <div className={classes.tmButtons}>
                        
                        <div className={classes.smallIcons}>
                            <Tooltip title="Search" placement="bottom" className={classes.tooltip}>
                                <FontAwesomeIcon className={classes.searchIcon} icon={faSearch} size={100} onClick={() => {setSearchStatus(!searchStatus)}}/>
                            </Tooltip>
                            <Button
                                buttonRef={node => {
                                Button.anchorEl = node;
                                }}
                                aria-owns={burgerOpen ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={() => {setBurgerOpen(!burgerOpen)}}
                                className={classes.burgerWrapper}
                            >
                                <FontAwesomeIcon  className={classes.tmIcons} icon={faBars} size={200}/>   
                            </Button>
                            
                        </div>
                        <div className={classes.largeIcons}>
                            <div className={classes.mainIcons}>
                                <Link href="/Homepage">
                                    <div className={classes.iconContent}>
                                        <div className={classes.extraDivIcon}>
                                            <Tooltip title="Home" placement="bottom" className={classes.tooltip}>
                                                <FontAwesomeIcon className={classes.tmIcons} icon={faHome} size={200}/>
                                            </Tooltip>
                                            <p>Home</p>
                                        </div>
                                    </div>
                                </Link>
                                <Link href="/learning-lab" >
                                    <div className={classes.iconContent}>
                                        <div className={classes.extraDivIcon}>
                                            <Tooltip title="My List" placement="bottom" className={classes.tooltip}>
                                                <FontAwesomeIcon className={classes.tmIcons} icon={faBookmark} size={200}/>
                                            </Tooltip>
                                            <p>My List</p>
                                        </div>
                                    </div>
                                </Link>
                                <Link href="/community" >
                                    <div className={classes.iconContent}>
                                        <div className={classes.extraDivIcon}>
                                            <Tooltip title="News Feed" placement="bottom" className={classes.tooltip}>
                                                <FontAwesomeIcon className={classes.tmIcons} icon={faStream} size={200}/>
                                            </Tooltip>
                                            <p>News Feed</p>
                                        </div>
                                    </div>
                                </Link>
                                
                            </div>
                            <Tooltip title="Search" placement="bottom" className={classes.tooltip}>
                                <FontAwesomeIcon className={classes.searchIcon} icon={faSearch} size={100} onClick={() => {setSearchStatus(!searchStatus)}}/>
                            </Tooltip>
                            <div>
                                <Button
                                    buttonRef={node => {
                                    Avatar.anchorEl = node;
                                    }}
                                    aria-owns={accountOpen ? 'menu-list-grow' : undefined}
                                    aria-haspopup="true"
                                    onClick={() => {setAccountOpen(!accountOpen)}}
                                    className={classes.Account}
                                >
                                    <Avatar src={state.userImage}/>
                                </Button>
                                <Popper open={accountOpen} anchorEl={Popper.anchorEl} style={{zIndex: '3', position: 'absolute'}}transition disablePortal>
                                    {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        id="menu-list-grow"
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper>                                    
                                            <MenuList>
                                                <Link href='/settings'>
                                                    <MenuItem>Settings</MenuItem>
                                                </Link>
                                            
                                                <Link href='/Homepage'>
                                                    <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                                                </Link>
                                            
                                            </MenuList>
                                        </Paper>
                                    </Grow>
                                    )}
                                </Popper>
                            </div>
                            
                        </div>
                    </div> 
                    
                </div>        
            </Toolbar>
            <div className={classes.mobileSearch} style={{display: (searchStatus ? 'block': 'none')}}> 
                {ISearch}
            </div>  
            
            <div className={classes.mobileDropdown}>
                <Popper  className={classes.menuList} open={burgerOpen} anchorEl={Popper.anchorEl} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        id="menu-list-grow"
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper >
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
                                    <MenuItem>Settings</MenuItem>
                                </Link>
                                <Link href='/Homepage'>
                                    <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                                </Link>
                            </MenuList>
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
