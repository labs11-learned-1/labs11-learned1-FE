import Link from 'next/link';
import React, { useState, useContext } from 'react';
import { StoreContext } from '../components/StoreProvider';
//  https://balsamiq.cloud/snv27r3/pqwdr68/r0330
export default function Homepage() {

    const { state,dispatch } = useContext(StoreContext);

    return (
        <div>
            <h1>Homepage of the app</h1>
            <Link href="/learning-lab"><a>Learning Lab</a></Link>
            <Link href="/browse" ><a>Browse</a></Link>
            <Link href="/community" > Community </Link>
            <p>{state.loginStatus.toString()}</p>
        </div>
    )
}
