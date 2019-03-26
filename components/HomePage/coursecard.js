import Link from "next/link";
import React, {useState, useContext} from "react";
//  https://balsamiq.cloud/snv27r3/pqwdr68/r0330

export const CourseCard = (props) => {

    return (
      <div className='courseCard-wrapper' onClick={() => {window.location.href = props.url}}>
        <div className='courseCard-image'>
            <img src={props.image}></img>
        </div>
        <div className='courseCard-content'>
            <h4>{props.title}</h4>
            <p>{props.description}</p>
            <div>
                <span>RATING IN STARS</span>
                <span>({props.rating})</span> {/*Rating in number format*/}
            </div>
        </div>
      </div>
    );
}