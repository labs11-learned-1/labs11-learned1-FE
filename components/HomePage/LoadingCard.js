
import React, {useState, useContext} from "react";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
//  https://balsamiq.cloud/snv27r3/pqwdr68/r0330

const styles = {
    '@keyframes fading': {
        '0%' : {
            opacity: '.5'
        },
        '50%' : {
            opacity: '1'
        },
        '100%' : {
            opacity: '.5'
        },
    },
    courseCardWrapper:{
        width:"32%",
        marginBottom:"20px",
        borderRadius:"7px",
        boxShadow: "-14px 24px 31px -9px rgba(0,0,0,0.6)",
        animation: 'fading 1.5s infinite',
        // animationDuration: '1s',
        // animationFillMode: 'forwards',
        // animationIterationCount: 'infinite',
        // animationName: 'placeholderSkeleton',
        // animationTimingFunction: 'linear',
        background: '#f6f7f8',
        // backgroundImage: 'gradient(linear, left center, right center, from(#f6f7f8), color-stop(.2, #edeef1), color-stop(.4, #f6f7f8), to(#f6f7f8))',
        backgroundImage: 'linear-gradient(left, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)',
        // backgroundRepeat: 'no-repeat',
        height:"350px",
    },
    courseCard_content:{
        background:"white",
        animation: 'fading .5s infinite',
    },
    cardImg : {
        width:"100%",
        background:"grey",
        borderBottom:"1px solid grey",
        backgroundImage: 'gradient(linear, left center, right center, from(#f6f7f8), color-stop(.2, #edeef1), color-stop(.4, #f6f7f8), to(#f6f7f8))',
        backgroundRepeat: 'no-repeat',
        height:"300px",
    },
    '@media(max-width: 600px)': {
        courseCardWrapper:{
        width:"100%",
        }
    },
    '@-webkit-keyframes placeholderSkeleton': {
        '0%':{
            backgroundPosition: '-468px 0'
        },
        '100%': {
            backgroundPosition: '468px 0'
        }
    }
}

const LoadingCard = props => {
    const {classes} = props
    return (
        <div className={classes.courseCardWrapper} >
            <div className='courseCard-image'>
                <div className={classes.cardImg}></div>
            </div>
            <div className={classes.courseCard_content}>
                {/* <p>{props.description}</p> */}
            </div>
        </div>
    );
}

LoadingCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LoadingCard);
