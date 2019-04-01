import * as firebase from "firebase";
import { loadDB } from "../../firebaseConfig/firebase";



// ====== User1 follows User2 
 export const getPostsOfFollowing = async () => {
    let result = await loadDB();
    let db = result.firestore();
    let userRef = db.collection('user');
    let followRef = db.collection('relationships');//might not need this
    let postsRef = db.collection('posts');


    //get array of who user follows
    const followingArray = await userRef.doc("450").get(firebase.firestore.FieldPath("following")).then(docSnapshot => {
        console.log(docSnapshot.data().following)
        return(docSnapshot.data().following)
    }).catch(err => {
        console.log(err)
    })
    
    
    let data =  await followingArray.forEach(user => postsRef.where("userId", "==", user).limit(1).get().then(querySnapshot => {
        querySnapshot.forEach(post => console.log("POST:   ", post.data()))
    }).catch(err => {
        console.log(err)
    })
    
    );

    console.log("RESULT: ", data)

}

// ---------- FOLLOW OTHERS -------- //
//need to update followCount and followersCount
export const followOthers = async () => { // async (myUserId, theirId)
    let result = await loadDB();
    let db = result.firestore();
    let userRef = db.collection('user');
     userRef.doc('450').get().then(docSnapshot => {
        if(docSnapshot.data().following.includes("454")){
            userRef.doc('450').update({ following: firebase.firestore.FieldValue.arrayRemove("454")})
            .then(()=> {
                userRef.doc('454').update({followers: firebase.firestore.FieldValue.arrayRemove('450')})
                .then(()=> {
                    console.log("success unfollowing")
                }).catch(err => console.log('Error updating other users followers'))
            })
            .catch(err => console.log('Error removing from following'))
        } else { 
            userRef.doc('450').update({following: firebase.firestore.FieldValue.arrayUnion('454')})// .doc("myUserId")  .arrayUnion("theirId")
        .then (() => {
        // then update their followers list with my id
            userRef.doc('454').update({followers: firebase.firestore.FieldValue.arrayUnion('450')}) // .doc("theirId")  .arrayUnion("myUserId")
            .then(() => {console.log("Success update follows")})
            .catch(err => console.log('ERROR updating other users followers')) 

        }).catch(err => console.log('ERROR FOLLOWING USER')) 
        }
     })
    //check if user already follows 
    

    // // update my following list with their id
    // userRef.doc('450').update({following: firebase.firestore.FieldValue.arrayUnion('454')})// .doc("myUserId")  .arrayUnion("theirId")
    // .then (() => {
    // // then update their followers list with my id
    //     userRef.doc('454').update({followers: firebase.firestore.FieldValue.arrayUnion('450')}) // .doc("theirId")  .arrayUnion("myUserId")
    //     .then(() => {console.log("Success update follows")})
    //     .catch(err => console.log('ERROR updating other users followers')) 

    // }).catch(err => console.log('ERROR FOLLOWING USER')) 


}