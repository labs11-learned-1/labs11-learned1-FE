import firebase from '@firebase/app'
import '@firebase/firestore'

export function loadDB() {
try{
  const config = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
  
} catch(err){
  if(!/already exists/.test(err.message)){
    console.error("firebase init error", err.stack)
  }
}

return firebase
}




  


