
import Link from "next/link";
import React, {useState, useContext} from "react";
import { Store } from "../store";
import * as firebase from "firebase";
import { loadDB } from "../../firebaseConfig/firebase";
//  https://balsamiq.cloud/snv27r3/pqwdr68/r0330

const BlogCard = (props) => {

    return (
      <div className='blogCard-wrapper' onClick={() => {window.location.href = props.url}}>
        <div className='blogCard-image'>
            <img src={props.image}></img>
        </div>
        <div className='blogCard-content'>
            <h4>{props.title}</h4>
            <p>Author: {props.author}</p>
            <div>
                <p>{props.datePosted}</p>
                <span>RATING IN STARS</span>
                <span>({props.rating})</span> {/*Rating in number format*/}
            </div>
        </div>
      </div>
    );
}

export default BlogCard;
