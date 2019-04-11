import React, { useEffect } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Radio from '@material-ui/core/Radio';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import CourseCard from './coursecard';


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
    const [parameters, setParameters] = React.useState({category : "", searchTerm : "", isPaid : ""})
    const [Paginated, setPaginated] = React.useState([]);

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
        await axios.post('https://metadatatesting.herokuapp.com/get-courses', {"parameters" : parameters})
        .then(res => {
            console.log("Searched Courses", res.data)
            setCourses(res.data)
        })
        .catch(err => {
            alert("Error recieveing the courses")
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
        <div>
            <div style={{display: 'flex', justifyContent:"space-between", flexDirection:"row", width:"70%", alignItems:"center"}}>
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

                <div style={{display:"flex", justifyContent:"center"}}>
                    <p>Paid</p>
                    <Radio
                        checked={parameters.isPaid === 'price-paid'}
                        onChange={handleRadio}
                        value="price-paid"
                        name="price-paid"
                        aria-label="A"
                    />
                    <p>Free</p>
                    <Radio
                        checked={parameters.isPaid === 'price-free'}
                        onChange={handleRadio}
                        value="price-free"
                        name="price-free"
                        aria-label="B"
                    />
                </div>

                <TextField
                    onChange={handleChange}
                    id="standard-search"
                    label="Search Term"
                    type="search"
                    margin="normal"
                />
                <button onClick={getCourses}>Get Courses</button>
            </div>
            <div>
                <button onClick={()=>MyPaginationAttempt(12, 1)}>Page 1 test</button>
                <button onClick={()=>MyPaginationAttempt(12, 2)}>Page 2 test</button>
                <button onClick={()=>MyPaginationAttempt(12, 3)}>Page 3 test</button>
                <button onClick={()=>MyPaginationAttempt(12, 4)}>Page 4 test</button>
                <div style={{display:"flex", width:"100%", flexDirection:"row", flexWrap :"wrap", justifyContent:"space-between"}}>
                    {courses.length && Paginated.length == 0 ? MyPaginationAttempt(10, 1) : Paginated.map(course => <CourseCard key={course.title} info={course} />)}
                </div>
            </div>
        </div>
    )
}