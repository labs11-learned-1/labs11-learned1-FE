import Link from "next/link";
import React, {useState, useContext} from "react";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
//  https://balsamiq.cloud/snv27r3/pqwdr68/r0330

const styles = {
  courseCardWrapper:{
    width:"48%",
    marginBottom:"20px",
    borderRadius:"7px",
    boxShadow: "-14px 24px 31px -9px rgba(0,0,0,0.6)",
    '&:hover':{
      transform:"scale(1.02)",
      transition:".4s ease",
    },
  },
  cardImg : {
    width:"100%",
    '&:hover':{
      opacity:".8",
      transform:"scale(1.01)",
      transition:".2s ease",
    },
  },
  '@media(max-width: 600px)': {
    courseCardWrapper:{
      width:"100%",
    }
  }
}

const CourseCard = props => {
  const {classes} = props
    return (
      <div  className={classes.courseCardWrapper}/*onClick={() => {window.location.href = props.url}}*/>
        <div className='courseCard-image'>
            <a href={props.info.url} target="_blank"><img className={classes.cardImg} src={props.info.image_480x270} /></a>
        </div>
        <div className='courseCard-content'>
            <h4>{props.info.title}</h4>
            {/* <p>{props.description}</p> */}
        </div>
      </div>
    );
}

CourseCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CourseCard);
