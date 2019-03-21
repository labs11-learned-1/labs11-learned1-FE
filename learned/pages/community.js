import Link from 'next/link';

//  https://balsamiq.cloud/snv27r3/pqwdr68/r71B6
export default function Community() {
    return (
        <div>
            <h1>Community portion of the app</h1>

            <Link href="/Homepage">
                <a>Home</a>
            </Link>

            <Link href="/browse" >
                <a>Browse</a>
            </Link>

            <Link href="/learning-lab" > 
                <a>Community</a> 
            </Link>

            <Link href="/account" >NA</Link>
        </div>
    )
}