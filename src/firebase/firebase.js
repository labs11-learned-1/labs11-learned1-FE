import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyC9SaOiNqXgH1cwwvCu6-14d7y8SFd2eB0",
    authDomain: "learned-11.firebaseapp.com",
    databaseURL: "https://learned-11.firebaseio.com",
    projectId: "learned-11",
    storageBucket: "learned-11.appspot.com",
    messagingSenderId: "114319083997"
  };

  firebase.initializeApp(config);

  const database = firebase.firestore()

  export { config, firebase, database as default };
  // export default config;