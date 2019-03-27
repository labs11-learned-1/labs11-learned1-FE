import { loadDB } from "../../firebaseConfig/firebase";
import { Store } from "../store";
import {useContext} from 'react';
import axios from 'axios';
// make sure to import * from firebase so that array updates work correctly
import * as firebase from "firebase";




// ==== ADD CONTENT to content-collection ====== 

export const addContent = async () => {
    let result = await loadDB();
    let db = result.firestore();
//  if (/*state.url = db.collection("content-collection").doc("existingDoc.id")*/ ) {
// db.collection('user').doc(/*state.userId*/).update({ myList: firebase.firestore.FieldValue.arrayUnion(/*existingDoc.id*/)}) 

// } else {
    db.collection('content-collection').add({
        title: "test Title1",
        author: "test author 1",
        photoUrl: "test photo 1"
    }).then((ref) => {
        console.log("Added content to the db", ref.id)
        db.collection('user').doc("450").update({ myList: firebase.firestore.FieldValue.arrayUnion(ref.id)})
    }).catch((err) => {
        console.log("error adding content to the db", err);
    });

// }
}



// ==== GET CONTENT by contentId in content-collection =====

export const getContentById = async () => {
    let result = await loadDB();
    let db = result.firestore();

    db.collection('content-collection').doc("ps4oztUhbI8jEU1AKxLk").get().then((res) => {
        console.log("Success getting content", res)
    }).catch(err => {
        console.log("Error getting content", err)
    });
    
}

export const getContentByUserId = async () => {
    let result = await loadDB();
    let db = result.firestore();

    db.collection('user').doc('450').get()
    .then((res) =>{
        console.log("res.data(): ", res.data())
        let data =  res.data()
        let array = data.myList
        console.log("Array: ", array)
        return array
    })
    .catch(err => {
        console.log("error retrieving myList array from user", err)
    })
}

// ===== DELETE CONTENT by contentId in content-collection =====

export const deleteContent = async () => {
    let result = await loadDB();
    let db = result.firestore();

    
}




// ===== 
