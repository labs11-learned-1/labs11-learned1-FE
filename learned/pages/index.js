import database from '../src/firebase/firebase'

//accessing collection 'user' from firestore then calling .doc to access the document or 'id' field of each user
//then calling .get to retrieve the data of that user
database.collection('user').doc('88kXCz9j4hxYGdzz8TeP').get()
  .then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        console.log("No such document!");
    }
  })
  .catch(function(error) {
    console.log("Error getting document:", error);
  });

  database.collection('user').get().then(function(querySnapshot) {
    const users = []
    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data()
      })
    })
    console.log(users)
});

function Home() {
    return <div>Welcome to next.js!</div>
  }
  
  export default Home