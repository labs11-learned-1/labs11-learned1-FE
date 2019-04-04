import Link from "next/link";
import React, {useState, useContext} from "react";
import { Store } from "../store";
import * as firebase from "firebase";
import { loadDB } from "../../firebaseConfig/firebase";
import BlogCard from './blogcard';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
//  https://balsamiq.cloud/snv27r3/pqwdr68/r0330
const styles = {
    homepageWrapper:{
        width:"80%",
        marginLeft:"19%"
    },
}
const Home = (props) => {
    const {classes} = props
    const [topBlogs, setTopBlogs] = useState([]);
    const [recCourses, setRecCourses] = useState([]);

    const fetchTopBlogs = () => {
        // We will make a request to our server for the 
        // top blogs this week or however long(Most likes or something).
        // Will likely need another call to get a certain amount of sponsored
        // posts and add them to the topblogs array.
            //On success:
            //setTopBlogs(arrayofBlogs)
            //On failure:
            //present user with an error div with a button
            //allowing them to reload on click
    }

    const fetchRecommended = () => {
        // We will have user most recent searches stored in state
        // which was retrieved from user component. using these recent
        // we will randomly select two searched and request from the server
        // a popular course related to that search.
            //On success:
            //setRecCourses(arrayofcourses)
            //On failure:
            //present user with an error div with a button
            //allowing them to reload on click
    }

  const { state, dispatch } = React.useContext(Store);
    return (
      <div className={classes.homepageWrapper}>
        <div className={classes.popularBlogsWrapper}>
            <h2>Popular Blog Posts</h2>
            {topBlogs.map(blog => {
                return (
                    <BlogCard  content={blog}/>
                )
            })}
        </div>
        <div className='recommendedBlogWrapper'>
            <h2>Recommended Courses For You</h2>
            {recCourses.map(course => {
                return (
                    <CourseCard content={course}/>
                )
            })}
        </div>
      </div>
    );
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home);
