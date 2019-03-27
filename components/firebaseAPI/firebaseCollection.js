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

 //if (/*state.url = db.collection("content-collection").doc("existingDoc.id")*/ ) {
    db.collection('content-collection').doc(/*existingDocId */).update({userList: firebase.firestore.FieldValue.arrayUnion(state.userId)})
// db.collection('user').doc(/*state.userId*/).update({ myList: firebase.firestore.FieldValue.arrayUnion(/*existingDoc.id*/)}) 

 //} else {
    db.collection('content-collection').doc().set({
        title: "test Title1",
        author: "test author 1",
        photoUrl: "test photo 1",
        userList: [state.userId]
    })
    .then((ref) => {
        console.log("Added content to the db", ref.id)
        db.collection('user').doc("450").update({ myList: firebase.firestore.FieldValue.arrayUnion(ref.id)})
    })
    .catch((err) => {
        console.log("error adding content to the db", err);
    });
 //}
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
    db.collection("content-collection").where("userId", "array-contains", "450")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            const result = doc.data()
            console.log(doc.id, " => ", result);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

// ===== DELETE CONTENT by contentId in content-collection =====

/* export const deleteContent = async () => {
    let result = await loadDB();
    let db = result.firestore();

    db.collection('user').doc("450").update({myList: FieldValue.de})
    .then(() => {
        db.collection('content-collection').doc('vTUfZsjTezKIynDHOqkJ').where("userId", "array-contains", "450").remove()
    })
    .catch(err => console.log('Cant remove'))
}

