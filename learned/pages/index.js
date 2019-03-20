import database from '../src/firebase/firebase'

//accessing collection 'user' from firestore then calling .doc to access the document or 'id' field of each user
//then calling .get to retrieve the data of that user

function Home() {
    return <div>Welcome to next.js!</div>
  }
  
  export default Home