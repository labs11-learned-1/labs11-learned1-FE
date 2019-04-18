
import React, { useEffect } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Radio from '@material-ui/core/Radio';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import CourseCard from './coursecard';
import LinearProgress from '@material-ui/core/LinearProgress';
import {Store} from '../store';
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from "@material-ui/styles";
import {Search} from '@material-ui/icons';

const useStyles = makeStyles(theme => {
    return {
    browseInput: {
        background: 'white',
        height: '30px',
        padding: '10px 15px 10px 10px',
        width: '60% !important',
        '& div': {
            height: '100%',
            width: '100%',
        }
    },
    browseButton: {
        background: theme.mixins.modernPink, 
        borderRadius:"0px 10px 10px 0px",  
        color:"white", 
        cursor:"pointer",
        padding: '10px 15px 10px 10px',
        borderLeft: 'none',
        height: '30px'
    },
    browserWrapper: {
        marginBottom: '300px',
        width: '100%'
    },
    browseSelect: {
        height: '100%',
        color: 'white',
        '& svg': {
            color: 'white'
        }
    },
    browseSelectWrapper: {
        height: '50px',
        padding: '0 10px 0px 15px',
        backgroundColor: theme.mixins.modernPink,
        borderRadius:"10px 0 0 10px",  
    },
    searchContainer: {
        borderBottom: `8px solid ${theme.mixins.deepBlue}`,
        padding: '20px 0 20px 0',
        display: 'flex', 
        justifyContent:"space-around", 
        flexDirection:"row", 
        width:"100%", 
        alignItems:"center", 
        background:"#cfd8dc", 
        borderRadius:"10px", 
        margin:"45px 0"
    }
}})


export default function SearchCourses(props){
    const classes = useStyles(props.theme);
    const [courses, setCourses] = React.useState([]);
    const cats = [
        'Business' ,
        'Design' ,
        'Development' ,
        'Health & Fitness' ,
        'IT & Software',
        'Lifestyle' ,
        'Marketing' ,
        'Music' ,
        'Office' ,
        'Productivity' ,
        'Personal Development' ,
        'Photography',
        'Teaching & Academics'
    ];
    
    const { state, dispatch } = React.useContext(Store);
    const [parameters, setParameters] = React.useState({category : "All", searchTerm : "", isPaid : ""})
    const [Paginated, setPaginated] = React.useState([]);
    const [loadingSpecifiedCourses, setLoadingSpecifiedCourses] = React.useState(false);
    const [loadingNumber, setLoadingNumber] = React.useState(12)

    function handleRadio(event) {
        setParameters({...parameters, isPaid : event.target.value});
        console.log(parameters)
    }

    function handleChange(e){
        setParameters({...parameters, searchTerm : e.target.value})
        console.log(parameters)
    }

    function addCategory(e){
        console.log("im being called")
        setParameters({...parameters, category : e.target.value})
        console.log(parameters)
    }

    async function getCourses(){
        setLoadingSpecifiedCourses(true)
        await axios.post('https://metadatatesting.herokuapp.com/get-courses', {"parameters" : parameters})
        .then(res => {
            console.log("Searched Courses", res.data)
            setCourses(res.data)
            setLoadingSpecifiedCourses(false)
        })
        .catch(err => {
            alert("Error recieveing the courses")
            setLoadingSpecifiedCourses(false)
        })
        console.log("courses", courses)
    }

    const fetchMoreData = () => {
        setLoadingNumber(loadingNumber + 12)
    }

    return(
        <div className={classes.browserWrapper}>
            <div  className={classes.searchContainer}>
                <div style={{width: '94%', display:"flex", justifyContent:"center", alignItems:"flex-end"}}>
                    <label className={classes.browseSelectWrapper}>
                        <Select disableUnderline className={classes.browseSelect} input={<Input id="select-multiple" />} value={parameters.category} onChange={addCategory}>
                            <MenuItem value='All'>All</MenuItem>
                            {cats.map(name => (
                                <MenuItem key={name} value={name}>
                                {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </label>

                    <TextField
                        onChange={handleChange}
                        id="standard-search"
                        placeholder="Search Term"
                        type="search"
                        margin="none"
                        InputProps={{disableUnderline: true}}
                        className={classes.browseInput}
                    />
                    {loadingSpecifiedCourses ? <CircularProgress/> : <Search className={classes.browseButton} onClick={getCourses}/>}
                </div>
            </div>
            {loadingSpecifiedCourses ? <LinearProgress style={{width:"100%", marginTop:"10px"}}/> : <></>}

                    {courses.length ? 
                    <InfiniteScroll
                        next={fetchMoreData}
                        dataLength={loadingNumber}
                        loader={<h3>Loading Courses ...</h3>}
                        hasMore={loadingNumber < courses.length ? true : false}
                        style={{display:"flex", width:"100%", flexDirection:"row", flexWrap :"wrap", justifyContent:"space-between", overflow:"hidden"}}
                        >
                            {courses.slice(0, loadingNumber).map(course => <CourseCard openSnackbar={props.openSnackbar} userId={state.userID} key={course.url} info={course} />)}
                        </InfiniteScroll>

                    : null}
                        {/* {courses.length && Paginated.length == 0 ? MyPaginationAttempt(10, 1) : Paginated.map(course => <CourseCard openSnackbar={props.openSnackbar} userId={state.userID} key={course.url} info={course} />)} */}
        </div>
    )
}