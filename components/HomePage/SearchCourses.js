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
import { from } from 'rxjs';
import { defaultProps } from 'recompose';


export default function SearchCourses(){
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
    const [parameters, setParameters] = React.useState({category : "", searchTerm : "", isPaid : ""})
    const [Paginated, setPaginated] = React.useState([]);
    const [loadingSpecifiedCourses, setLoadingSpecifiedCourses] = React.useState(false)

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

    function MyPaginationAttempt(pageSize, pageNumber){
        let final = courses.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
        setPaginated(final)
    }

    React.useEffect(()=>{
        MyPaginationAttempt(12, 1)
    }, [courses])

    return(
        <div style={{width:"80%"}}>
            <div style={{display: 'flex', justifyContent:"space-around", flexDirection:"row", width:"100%", alignItems:"center", background:"#cfd8dc", borderRadius:"10px", marginTop:"45px"}}>
                <div style={{width:"40%", display:"flex", justifyContent:"space-between", alignItems:"flex-end"}}>
                    <div>
                        <InputLabel htmlFor="select-multiple">Categories</InputLabel>
                        <Select input={<Input id="select-multiple" />} value={parameters.category} onChange={addCategory}>
                            {cats.map(name => (
                                <MenuItem key={name} value={name}>
                                {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>

                    <TextField
                        onChange={handleChange}
                        id="standard-search"
                        label="Search Term"
                        type="search"
                        margin="none"
                    />
                    <button style={{border:"1px solid black", background:"#534bae", borderRadius:"5px", height:"30px", color:"white", cursor:"pointer"}} onClick={getCourses}>Search for Courses</button>
                </div>
            </div>

                <div>
                    {courses.length ? <div style={{width:"20%",display:"flex", justifyContent:"space-between", margin:"20px 0"}}>
                    <div style={{cursor:"pointer", border:"1px solid black", borderRadius:"5px", marginBottom:"25px", boxSizing:"border-box", padding:"5px"}} onClick={()=>MyPaginationAttempt(12, 1)}>1</div>
                    <div style={{cursor:"pointer", border:"1px solid black", borderRadius:"5px", marginBottom:"25px", boxSizing:"border-box", padding:"5px"}} onClick={()=>MyPaginationAttempt(12, 2)}>2</div>
                    <div style={{cursor:"pointer", border:"1px solid black", borderRadius:"5px", marginBottom:"25px", boxSizing:"border-box", padding:"5px"}} onClick={()=>MyPaginationAttempt(12, 3)}>3</div>
                    <div style={{cursor:"pointer", border:"1px solid black", borderRadius:"5px", marginBottom:"25px", boxSizing:"border-box", padding:"5px"}} onClick={()=>MyPaginationAttempt(12, 4)}>4</div>
                    <div style={{cursor:"pointer", border:"1px solid black", borderRadius:"5px", marginBottom:"25px", boxSizing:"border-box", padding:"5px"}} onClick={()=>MyPaginationAttempt(12, 5)}>5</div>
                    </div> : null}

                    <div style={{display:"flex", width:"100%", flexDirection:"row", flexWrap :"wrap", justifyContent:"space-between"}}>
                        {courses.length && Paginated.length == 0 ? MyPaginationAttempt(10, 1) : Paginated.map(course => <CourseCard openSnackbar={defaultProps.openSnackbar} userId={state.userID} key={course.url} info={course} />)}
                    </div>
            </div>
            {loadingSpecifiedCourses ? <LinearProgress style={{width:"100%", marginTop:"10px"}}/> : <></>}
        </div>
    )
}