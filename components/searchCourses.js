import React from 'react';
import axios from 'axios';

const SearchCourses = () => {
    axios({
        method: 'get',
        url: 'https://www.udemy.com/api-2.0/courses',
        auth: {
            username: 'xP1gARnTmU2raiogQFCbjAq5ufaEtnjzD1bP2LA9',
            password: 'R7mGCykeGciRDm74QsmhfC0GsPmhZ5QMHDhyBLj6Rlo4Rvvd7ibgaM2r6fAdtKKearQdRo4JOGrF4BYDmSJtAuZayKwbL7jTlWRw6I1JIEJC4ESCIs7X536UmEPuVP80'
        }
    })
    .then(res =>

         console.log('Authorized')
         )
    .catch(err =>
         console.log(err)
         )

    return (
        <div>
            {}
        </div>
    )
}

export default SearchCourses