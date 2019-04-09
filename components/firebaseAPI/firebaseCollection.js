import { loadDB } from "../../firebaseConfig/firebase";
//import { Store } from "../store";
//import {useContext} from 'react';
//import axios from 'axios';
// make sure to import * from firebase so that array updates work correctly
import * as firebase from "firebase";



// ==== ADD CONTENT to content-collection ====== 

export const addContent = async () => {
    let result = await loadDB();
    let db = result.firestore();

 //if (/*state.url = db.collection("content-collection").doc("existingDoc.id")*/ ) {
    //db.collection('content-collection').doc('vTUfZsm5bzKIynDHOqkJ').update({userList: firebase.firestore.FieldValue.arrayUnion(state.userId)})
// db.collection('user').doc(/*state.userId*/).update({ myList: firebase.firestore.FieldValue.arrayUnion(/*existingDoc.id*/)}) 

 //} else {
    db.collection('content-collection').doc().set({
        title: "test Title1",
        author: "test author 1",
        photoUrl: "test photo 1",
        userList: [state.userId],

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
// OLD GET CONTENTBYID
/*
export const getContentById = async () => {
    let result = await loadDB();
    let db = result.firestore();

    db.collection('content-collection').doc("ps4oztUhbI8jEU1AKxLk").get().then((res) => {
        console.log("Success getting content", res)
    }).catch(err => {
        console.log("Error getting content", err)
    });

}
*/

//NEW GET CONTENTBYID
export const getContentById = async (postID) => {
    let result = await loadDB();
    let db = result.firestore();
    return db.collection('content-collection').doc(postID).get().then((res) => {
        return res.data();
    }).catch(err => {
        console.log("Error getting content", err)
        return null;
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

export const deleteContent = async (link, userID, list, setList, getContentByUserId) => {
    let result = await loadDB();
    let db = result.firestore();
    console.log("this is link", link)
    console.log("here is first list:  ", list)
    let newLink = link
      .split("//")
      .pop()
      .replace(/[/]/g, "-");
      console.log("this is newLink", newLink)
    
    console.log("this is the user that I am: ", userID)
    //const arrayContent = db.collection('user').doc(userIDID).firebase.firestore.FieldValue(myList.length === 1)

    //go to user doc
    db.collection("user")
      .doc(userID)
      //update myList of content Id's by removing the content id
      .update({ myList: firebase.firestore.FieldValue.arrayRemove(newLink) })
      .then(() => {
          //then try to go to content collection doc of newLink to update the userList by removing my Id from array
          db.collection("content-collection")
            .doc(newLink)
            .update({
              userList: firebase.firestore.FieldValue.arrayRemove(userID)
            })
            .then(() => {
              console.log("removed userId from content's user list");
              console.log("Success deleting");
              console.log("list before splice", list)
              list.splice(list.indexOf(newLink))
                  setList(list)
                  console.log("here is list: ",list)
                getContentByUserId()
            }).catch(err => {
                console.log("could not delete user from array, removing content from db")
                db.collection("content-collection")
            .doc(newLink)
            .delete()
            .then(() => {
              console.log("Content document removed from db");
              list.splice(list.indexOf(newLink))
              setList(list)
            })
            .catch(err => {
              console.log("error removing document from db", err);
            });
            });
       
        // but if it is the last one and the above doesn't work, then I want to delete the whole document from the db
        // might need to go in here and remove content from users list of content Id's
      })
      .catch(err => console.log("Cant remove content"));
  };

  //This function is called when a user modifies their review rating. It will update the
  //numRatings/avgRatings with the new data depending on that action. The contentID passed
  //in refers to the content link, rating is the one set in myReview from posts, type is set
  // on call in posts, and the oldRating is taken from the baseReview in posts.
  export const addRating = async(contentID, rating, type, oldRating) => {
    let result = await loadDB();
    let db = result.firestore();
    let newLink = contentID.split("//").pop().replace(/[/]/g, "-");
    const contentRef = db.collection("content-collection").doc(newLink);
    var ratingRef = contentRef.collection('ratings').doc();
    // In a transaction, add the new rating and update the aggregate totals
    return db.runTransaction(transaction => {
        return transaction.get(contentRef).then(res => {
            if (!res.exists) {
                throw "Document does not exist!";
            }
            let oldRatingTotal = res.data().avgRating * res.data().numRatings;
            let newNumRatings = res.data().numRatings;
            let newAvgRating;
            console.log(res.data())
            if(type === 'post') { //FOR WHEN A USER CREATES THEIR REVIEW
                newNumRatings += 1;
                newAvgRating = (oldRatingTotal + rating) / newNumRatings;
            } else if (type === 'edit') { //FOR WHEN A USER EDITS THEIR REVIEW
                newAvgRating = (oldRatingTotal - oldRating + rating) / newNumRatings;
            } else { //FOR WHEN A USER DELETES THEIR REVIEW
                newNumRatings -= 1;
                newAvgRating = (oldRatingTotal - oldRating) / newNumRatings;
            }

            // Commit to Firestore
            transaction.update(contentRef, {
                numRatings: newNumRatings,
                avgRating: newAvgRating
            });
        })
    });
    
}
