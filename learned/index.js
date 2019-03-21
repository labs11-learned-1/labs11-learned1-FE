import LandingNav from "./components/landingNav";
import database from './src/firebase/firebase';
import Homepage from './pages/Homepage';
import {StoreProvider} from './components/store'; //importing the store provider from store.js
import React from 'react';
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

        //makes a request to get all 500 users and returns an array of objects

        /* database.collection('user').get().then(function(querySnapshot) {
          const users = []
          querySnapshot.forEach((doc) => {
            users.push({
              id: doc.id,
              ...doc.data()
            })
          })
          console.log(users)
      }); */

function Home() {
    return (
      <StoreProvider>
        <LandingNav />
      </StoreProvider>
    )
  }
  
  export default Home