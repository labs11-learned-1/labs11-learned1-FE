import React from 'react';
import axios from 'axios';

const SearchCourses = () => {
    axios({
        method: 'get',
        url: 'https://www.udemy.com/api-2.0/courses',
        auth: {
            username: 'XXXXXXX',
            password: 'XXXXXXX'
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