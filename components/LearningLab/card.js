import React from 'react';
import PropTypes from 'prop-types';
import {deleteReview} from '../firebaseAPI/firebaseReviews';


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
    let checkReview;

    if(props.content.review) {
        checkReview = <div>
            <MenuItem id={props.content.link} onClick={(ev) => {
            ev.preventDefault();
            props.setSubmitType('edit');
            props.setReviewContent({rating: props.content.review.rating, title: props.content.review.title, content: props.content.review.comment, postId: props.content.link, reviewID: props.content.review.reviewId});
            props.setOpenReview(true);
        }}>Edit Review</MenuItem>
        <MenuItem onClick={(ev) => {
            ev.preventDefault();
            deleteReview(props.content.review.reviewId);
        }}>Delete Review</MenuItem>
        </div>
    } else {
        checkReview = <MenuItem onClick={(ev) => {
            ev.preventDefault();
            props.setSubmitType('post');
            props.setReviewContent({...props.reviewContent, postId: props.content.link});
            props.setOpenReview(true);           
        }}>Add Review</MenuItem>
    }
 
    return(
        <div>
            
                <Card className={classes.card}>
                 <a href={props.content.link} style={{display: 'block', textDecoration: 'none'}}>
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
                                            {checkReview}
                                    </MenuList>
                                </ClickAwayListener>
                                </Paper>
                            </Grow>
                            )}
                            </Popper>
                        </div>
                        
                    }
                    title={props.content.title}
                    />
                    <CardMedia
                    className={classes.media}
                    image={props.content.photoUrl}
                    />
                    <CardContent>
                    <Typography component="p">
                        {props.content.description}
                    </Typography>
                    </CardContent>
                    </a>
                </Card>
           
        </div>     
    )
}

MyListCard.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(MyListCard);