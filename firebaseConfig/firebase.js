import firebase from '@firebase/app'
import '@firebase/firestore'

export function loadDB() {
try{
  const config = {
<<<<<<< HEAD
    apiKey: "AIzaSyC9SaOiNqXgH1cwwvCu6-14d7y8SFd2eB0",
    authDomain: "learned-11.firebaseapp.com",
    databaseURL: "https://learned-11.firebaseio.com",
    projectId: "learned-11",
    storageBucket: "learned-11.appspot.com",
    messagingSenderId: "114319083997"
=======
    apiKey: process.env.FIREBASE_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID
>>>>>>> f8eacf8ff51882eb1f3bb2250110a08a86ed8d2d
  };
 
  firebase.initializeApp(config);
} catch(err){
  if(!/already exists/.test(err.message)){
    console.error("firebase init error", err.stack)
  }
}

return firebase
}




  


