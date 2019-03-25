import firebase from '@firebase/app'
import '@firebase/firestore'

export function loadDB() {
try{
  const config = {
    apiKey: process.env.firebase_key || "@FIREBASE_KEY",
    authDomain: process.env.auth_domain || "@AUTH_DOMAIN",
    databaseURL: process.env.database_url || "@DATABASE_URL",
    projectId: process.env.project_id || "@PROJECT_ID",
    storageBucket: process.env.storage_bucket || "@STORAGE_BUCKET",
    messagingSenderId: process.env.messaging_sender_id || "@MESSAGING_SENDER_ID"
  };
 
  firebase.initializeApp(config);
} catch(err){
  if(!/already exists/.test(err.message)){
    console.error("firebase init error", err.stack)
  }
}

return firebase
}




  


