import React, {useContext} from "react";

import Homepage from "./Homepage";
//importing the store provider from store.js
import { StoreConsumer, StoreContext } from '../components/StoreProvider'
import LandingNav from "../components/landingNav";
// import firebase from '../firebaseConfig/firebase.js'



export default class Home extends React.Component {
  //first instance of the database loaded into the app

  // let firebase = await loadDB();
  
  render() {
    return (
      
      <StoreConsumer>
        {({ loginStatus, updateLogin }) => (
          <LandingNav/>

        )}
      </StoreConsumer>
        
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
