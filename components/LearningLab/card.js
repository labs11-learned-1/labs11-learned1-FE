import React from 'react';
import PropTypes from 'prop-types';
import {Store} from '../store';
import Link from "next/link";

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const styles = theme => ({
    card: {
      borderBottom: "2px solid #e5f2f7",
      borderRadius: "0",
      boxShadow: "0",
      height: "180px"
    },
    cardHeader:{
        float: "right",
        width: "60%",
    },
    content:{
        float: "right",
        width: "60%",
        padding: "0 16px 0 0"
    },
    media: {
      height: "78px",
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  });

const MyListCard = (props) => {
    const [openMenu, setOpenMenu] = React.useState(false);
    const {state, dispatch} = React.useContext(Store);
    const { classes } = props;
        
    return(
        <div>
            
                <Card className={classes.card}>
                    <CardHeader className={classes.cardHeader}
                    action={
                        <div>
                            <IconButton 
                                style={{zIndex: '3'}}
                                buttonRef={node => {
                                    IconButton.anchorEl = node;
                                }}
                                aria-owns={openMenu ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    setOpenMenu(!openMenu);
                                }}
                                className={classes.menu}
                            >
                            <MoreVertIcon />
                            </IconButton>
                            <Popper open={openMenu} anchorEl={Popper.anchorEl} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                id="menu-list-grow"
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper>
                                <ClickAwayListener onClickAway={() => setOpenMenu(false)}>
                                    <MenuList>
                                    <MenuItem onClick={(ev) => {
                                        ev.preventDefault();
                                        props.prepareReviewList(props.content.userList, props.content.link);
                                    }}>Reviews</MenuItem>
                                    <MenuItem onClick={(ev) => {
                                        ev.preventDefault();
                                        props.prepareSharePost(props.content.link, props.content.photoUrl, state.displayName, state.userImage);
                                    }}>Share Post</MenuItem>
                                    </MenuList>
                                    <MenuItem onClick={(ev) => {
                                        ev.preventDefault();
                                        props.deleteContent();
                                    }}>Delete</MenuItem>
                                </ClickAwayListener>
                                </Paper>
                            </Grow>
                            )}
                            </Popper>
                        </div>
                        
                    }
                    title={props.content.title ? props.content.title : 'No title provided...'}
                    />
                    <div style={{display: 'block', textDecoration: 'none', width: "34%", float: "left", position: "relative"}}>
                        <Link href={`/postPage?content=${props.content.link}`} >
                            <CardMedia
                            className={classes.media}
                            image={props.content.photoUrl ? props.content.photoUrl : 'https://www.honeystinger.com/c.3410322/sca-dev-elbrus/img/no_image_available.jpeg'}
                            />
                        </Link>
                    </div>
                    <CardContent className={classes.content}>
                    <Typography component="p">
                        {props.content.description ? props.content.description : 'No description provided...'}
                    </Typography>
                    </CardContent>
                </Card>
           
        </div>     
    )
}

MyListCard.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(MyListCard);