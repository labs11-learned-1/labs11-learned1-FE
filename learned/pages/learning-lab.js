import Link from 'next/link';

//  https://balsamiq.cloud/snv27r3/pqwdr68/rBD71
export default function learningLab() {
    return (
        <div>
            <h1>Learning Lab section of the app</h1>
            <Link href="/Homepage">
                <a>Home</a>
            </Link>
            
            <Link href="/browse" >
                <a>Browse</a>
            </Link>

            <Link href="/community" > 
                <a>Community</a> 
            </Link>
        </div>
    )
}