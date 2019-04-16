
import Link from "next/link";
import React, {useState} from "react";
import { Store } from "../store";
import * as firebase from "firebase";
import { loadDB } from "../../firebaseConfig/firebase";
import BlogCard from './blogcard';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from "axios";
import CourseCard from './coursecard';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import CategoryModal from '../CategoryModal/CategoryModal'
//  https://balsamiq.cloud/snv27r3/pqwdr68/r0330
import LoadingCard from './LoadingCard'
import SearchCourses from "./SearchCourses";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';

const styles = {
    recommendedCoursesWrapper:{
        width:"100%",
    },
    homepageWrapper:{
        width:"100%",
        display:"flex",
        alignItems:"center",
        flexDirection:"column",
        boxSizing:"border-box",
        padding:"0 10%",
        marginTop:"70px"
    },
    recoCourses:{
        width:"80%",
        boxSizing:"border-box",
        margin:"0 auto",
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"space-between",
    },
    '@media(max-width: 600px)': {
        recoCourses:{
            width:"100%",
        }
    }
}

//CHECK
const Home = (props) => {
    const {classes} = props
    const [topBlogs, setTopBlogs] = useState([]);
    const [recCourses, setRecCourses] = useState([]);
    const [userTags, setUserTags] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(false);
    const { state, dispatch } = React.useContext(Store);
    const [openSnackBar, setOpenSnackBar]= useState(false);

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
        setLoadingCourses(true)
        let result = await loadDB();
        let db = result.firestore();
        let docRef = db.collection("user").doc(state.userID)
        docRef.get().then(doc => {
            setUserTags(userTags.slice(0,userTags.length));
            console.log("emptied user tags", userTags)
            if(doc.exists){
                console.log("users tags", doc.data().tags);
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
                    setLoadingCourses(false)
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

    const fetchSpecifiedCourses = () => {
        
    }

    const handleSnackBarClose=()=>{
        setOpenSnackBar(false);
    }

    const handleSnackBarOpen=()=>{
        setOpenSnackBar(true)
    }

    React.useEffect(()=>{
        fetchRecommended()
    }, [])
    return (
        <div className={classes.homepageWrapper}>
            <SearchCourses openSnackbar={handleSnackBarOpen}/>
            {loadingCourses ? <LinearProgress style={{width:"80%", marginTop:"10px"}}/> : null}
            {/* <div className={classes.popularBlogsWrapper}> */}
                {/* <h2>Popular Blog Posts</h2> */}
                {/* <LoadingCard /> */}
                {/* {topBlogs.map(blog => {
                    return (
                        <BlogCard  content={blog}/>
                    )
                })} */}
            {/* </div> */}
            <div className={classes.recommendedCoursesWrapper}>
                <h2>Recommended Courses For You</h2>
                <button onClick={() => props.setOpen(true)}>Change Your Interests</button>
            {props.open ? <CategoryModal open={props.open} addTagsToUser={props.addTagsToUser} handleAdd={props.handleAdd} categories={props.categories} /> : null }
                {loadingCourses 
                    ? 
                    <div className={classes.recoCourses}>
                        <React.Fragment>
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                        </React.Fragment>
                    </div>
                    : 
                    <div className={classes.recoCourses}>
                    {recCourses.map(course => {
                        return <CourseCard openSnackbar={handleSnackBarOpen} userId={state.userID} key={course.url} info={course}/>
                    })}
                </div>
                }
            </div>
            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
                }}
                open={openSnackBar}
                autoHideDuration={5000}
                onClose={handleSnackBarClose}
            >   
            <SnackbarContent
                onClose={handleSnackBarClose}
                variant="success"
                message="Success Adding Course"
                style={{backgroundColor:"green"}}
            />
            </Snackbar>
        </div>
    );
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home);
