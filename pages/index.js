import React, {useContext} from "react";

import LandingPage from "./LandingPage";
//importing the store provider from store.js
import { StoreConsumer, StoreContext } from '../components/StoreProvider'
import LandingNav from "../components/landingNav";
// import firebase from '../firebaseConfig/firebase.js'



export default class Home extends React.Component {
  //first instance of the database loaded into the app

  // let firebase = await loadDB();
  
  render() {
    return (
      <LandingNav/>
      
<<<<<<< HEAD
=======
      <StoreProvider>
        <LandingPage />
      </StoreProvider>
>>>>>>> bd56c4975a9cead47f5ebc12f14372483507263d
    );
  }
}

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
