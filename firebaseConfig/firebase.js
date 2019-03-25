import firebase from '@firebase/app'
import '@firebase/firestore'

export function loadDB() {
try{
  const config = {
    apiKey: process.env.firebase_key || "@firebase-key",
    authDomain: process.env.auth_domain || "@auth-domain",
    databaseURL: process.env.database_url || "@database-url",
    projectId: process.env.project_id || "@project-id",
    storageBucket: process.env.storage_bucket || "@storage-bucket",
    messagingSenderId: process.env.messaging_sender_id || "@messaging-sender-id"
  };
 
  firebase.initializeApp(config);
} catch(err){
  if(!/already exists/.test(err.message)){
    console.error("firebase init error", err.stack)
  }
}

return firebase
}




  


