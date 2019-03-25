import React from 'react';
import axios from 'axios';

const SearchCourses = () => {
    console.log(process.env.UDEMY_CLIENT_ID, process.env.UDEMY_CLIENT_SECRET)
    axios({
        method: 'get',
        url: 'https://www.udemy.com/api-2.0/courses',
        auth: {
            username: process.env.UDEMY_CLIENT_ID,
            password: process.env.UDEMY_CLIENT_SECRET
        }
    })
    .then(res => console.log('Authorized', res))
    .catch(err => console.log(err))

    return (
        <div>
            {}
        </div>
    )
}

export default SearchCourses