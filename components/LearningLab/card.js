import React from 'react';
import PropTypes from 'prop-types';
import * as firebase from "firebase";
import { loadDB } from "../../firebaseConfig/firebase";

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
      maxWidth: 400,
      margin: '20px',
    },
    media: {
      
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

    const { classes } = props;
        
    return(
        <div>
            
                <Card className={classes.card}>
                    <CardHeader
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
                                        props.prepareSharePost(props.content.link);
                                    }}>Share Post</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                                </Paper>
                            </Grow>
                            )}
                            </Popper>
                        </div>
                        
                    }
                    title={props.content.title ? props.content.title : 'No title provided...'}
                    />
                    <a target='_blank' href={props.content.link} style={{display: 'block', textDecoration: 'none'}}>
                    <CardMedia
                    className={classes.media}
                    image={props.content.photoUrl ? props.content.photoUrl : 'https://www.honeystinger.com/c.3410322/sca-dev-elbrus/img/no_image_available.jpeg'}
                    />
                    </a>
                    <CardContent>
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