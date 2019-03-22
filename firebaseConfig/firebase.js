import firebase from '@firebase/app'
import '@firebase/firestore'

export function loadDB() {
try{
  const config = {
    apiKey: "AIzaSyC9SaOiNqXgH1cwwvCu6-14d7y8SFd2eB0",
    authDomain: "learned-11.firebaseapp.com",
    databaseURL: "https://learned-11.firebaseio.com",
    projectId: "learned-11",
    storageBucket: "learned-11.appspot.com",
    messagingSenderId: "114319083997"
  };
 
  firebase.initializeApp(config);
} catch(err){
  if(!/already exists/.test(err.message)){
    console.error("firebase init error", err.stack)
  }
}

return firebase
}




  


