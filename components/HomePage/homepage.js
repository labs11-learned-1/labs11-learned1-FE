import Link from "next/link";
import React, {useState, useContext} from "react";
import { Store } from "../store";
import * as firebase from "firebase";
import { loadDB } from "../../firebaseConfig/firebase";
import BlogCard from './blogcard';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from "axios";

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
    const [userTags, setUserTags] = useState([]);

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

    const fetchRecommended = async () => {
        // We will have user most recent searches stored in state
        // which was retrieved from user component. using these recent
        // we will randomly select two searched and request from the server
        // a popular course related to that search.
            //On success:
            //setRecCourses(arrayofcourses)
            //On failure:
            //present user with an error div with a button
            //allowing them to reload on click
        let result = await loadDB();
        let db = result.firestore();
        let categories = ["Business", "Design", "Development"];
        let docRef = db.collection("user").doc(state.userID)
        docRef.get().then(doc => {
            if(doc.exists){
                console.log("user data", doc.data().tags);
                let data = doc.data();
                for(let i = 0; i < 3; i++){
                    setUserTags(userTags.push(data.tags[i]));
                }
                console.log("this is user tags in state", userTags)
                axios.post('https://metadatatesting.herokuapp.com/udemy-cat', {category : userTags})
                .then(res => {
                    console.log("response.data", res.data);
                    setRecCourses(res.data)
                    console.log("rec courses", recCourses)
                })
                .catch(err => {
                    console.log(err);
                })
            }else{
                alert("Error: doc does not exist")
            }
        })
        .catch(err => {
            console.log("line 56", err)
        })
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
                    <h1>{course.title}</h1>
                )
            })}
        </div>
        <button onClick={()=>{fetchRecommended()}}>console log recs</button>
      </div>
    );
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home);
