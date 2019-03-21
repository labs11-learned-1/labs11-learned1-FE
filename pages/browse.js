import Link from 'next/link';
import React from 'react';
//  https://balsamiq.cloud/snv27r3/pqwdr68/rE36E
export default function Browse() {
    return (
        <div>
            <h1>Browse section of the app</h1>
            <Link href="/Homepage">
                <a>Home</a>
            </Link>

            <Link href="/learning-lab" >
                <a>Learning Lab</a>
            </Link>

            <Link href="/community" > 
                <a>Community</a> 
            </Link>
        </div>
    )
}