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
