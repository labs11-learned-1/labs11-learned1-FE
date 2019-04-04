import React from 'react';

//REACT
import axios from 'axios';
import PropTypes from 'prop-types';
import Navigation from '../components/Navigation/Nav';
import MyListCard from '../components/LearningLab/card';


//FIREBASE
import * as firebase from "firebase";
import { loadDB } from "../firebaseConfig/firebase";

//MaterialUI
import { withStyles } from '@material-ui/core/styles';
import { Store } from "../components/store";

import UserListCard from '../components/userLabCard'

const styles = theme => ({
    menu: {
        borderRadius: '50%',
        fontWeight: 'bold',
        fontSize: '20px'
    },
    homepageWrapper:{
        width:"80%",
        marginLeft:"26%"
    },
    userList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    myHeader: {
        display: 'flex',
        borderBottom: '1.5px solid rgba(0,0,0,.1)',
        margin: '20px',
        paddingBottom: '20px',
        alignItems: 'center',
        '& h1': {
            margin: '0 20px 0 20px'
        },
        '& button': {
            marginLeft: '20px'
        }
    },
    learningLabWrap: {
        marginTop: '40px'
    },
    currentCourses: {
        minHeight: '100px'
    }
});

const UsersLab = (props) => {

    //Might just use one big state, but don't want it to look too much like normal setState so
    // I don't really want to.
    const { classes } = props;
    const {state, dispatch} = React.useContext(Store)
    const [list, setList] = React.useState([]);
    const [publicUser, setUser] = React.useState("")
    const [UdemyList, setUdemyList] = React.useState([]);

    const getContentByUserId = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const userID = urlParams.get('user');
        setUser(userID);
        let arr = [];
        let result = await loadDB();
        let db = result.firestore();
        db.collection("content-collection").where("userList", "array-contains", userID)
        .get()
        .then(async function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                const result = doc.data()
                console.log("RESULT", result)
                let newLink = (result.link).split("//").pop().replace(/[/]/g, "-");
                db.collection("reviews").where("userId", "==", userID).where("contentCollectionId", "==", newLink)
                .get()
                .then(async(res) => {
                    let response;
                    if(res.docs.length > 0) {
                        response = res.docs[0].data();
                        response["reviewId"] = res.docs[0].id;
                    } else {
                        response = null;
                    }
                    result["review"] = response;
                    setList(list => [
                        ...list, result
                    ])
                })
                .catch(err => {
                    console.log(err)
                })   
            
            }); 
            
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
        console.log("MY ARRAY", arr)
    }

    const getUdemyByUserId = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const userID = urlParams.get('user');
        let arr = [];
        let result = await loadDB();
        let db = result.firestore();
        db.collection("content-collection").where("UserList", "array-contains", userID)
        .get()
        .then(async function(querySnapshot) {
            await querySnapshot.forEach(function(doc) {
                const result = doc.data()
                arr.push(result)
                console.log("udemy result", result) 
            }); 
            console.log("this is the array", arr)
            setUdemyList([...arr])
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }

    const followOthers = async () => {
        // async (myUserId, theirId)
        let result = await loadDB();
        let db = result.firestore();
      
        let userRef = db.collection("user");
        userRef
          .doc(state.userID)
          .get()
          .then(docSnapshot => {
            //check if user is already following
            if (docSnapshot.data().following.includes(publicUser)) {
              //====================unfollow section==================
              userRef
                .doc(state.userID)
                .update({
                  followingCount: firebase.firestore.FieldValue.increment(-1),
                  following: firebase.firestore.FieldValue.arrayRemove(publicUser)
                }) //if user "454" is in 450's following then remove
                .then(() => {
                  userRef
                    .doc(publicUser)
                    .update({
                      followerCount: firebase.firestore.FieldValue.increment(-1),
                      followers: firebase.firestore.FieldValue.arrayRemove(state.userID)
                    }) //then remove "450" from 454's followers
                    .then(() => {
                      console.log("success unfollowing");
                    })
                    .catch(err =>
                      console.log("Error updating other users followers", err)
                    );
                })
                .catch(err => console.log("Error removing from following"));
            } else {
              //=================follow section=====================
              //if user 450 is not following user 454 then adding 454 to following array
              userRef
                .doc(state.userID)
                .update({
                  followingCount: firebase.firestore.FieldValue.increment(1), // add +1 to following count
                  following: firebase.firestore.FieldValue.arrayUnion(publicUser)
                }) // .doc("myUserId")  .arrayUnion("theirId")
                .then(() => {
                  // then update their followers list with my id
                  userRef
                    .doc(publicUser)
                    .update({
                      followerCount: firebase.firestore.FieldValue.increment(1),
                      followers: firebase.firestore.FieldValue.arrayUnion(state.userID)
                    }) // .doc("theirId")  .arrayUnion("myUserId")
                    .then(() => {
                      console.log("Success update follows");
                    })
                    .catch(err =>
                      console.log("ERROR updating other users followers")
                    );
                })
                .catch(err => console.log("ERROR FOLLOWING USER"));
            }
          });
      };

    React.useEffect(
        () => {
            getContentByUserId()
            getUdemyByUserId()
            followOthers()
        },
        []
    );

    // React.useEffect(
    //     () => {
            
    //         if (metaData.title) {
    //             console.log("HEY IM BEING CALLED!")
    //             addContent()
    //         }
    //     },
    //     [metaData.title]
    // );
    return (
        <div>
            <Navigation />
            <div className={classes.learningLabWrap}>
                <div className={classes.myHeader}>
                    <button onClick={followOthers}>Follow</button>
                    <h1>Their Current Courses</h1>
                </div>
                <div className={classes.userList}>
                    {UdemyList.length ? UdemyList.map(item=><UserListCard content={item} key={item.link}/>)
                    :
                    <p>This user has no courses or has not linked their account yet</p>
                    }
                </div>

                <div className={classes.myHeader}>
                    <h1>Their List</h1>
                </div>
                
                <div className={classes.userList}>
                {list.length ? list.map(item=><UserListCard key={item.link} content={item} />)
                    :
                    <p>This user has not added anything to their list</p>
                    }
                </div>
            </div>
        </div>
    );
}

UsersLab.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UsersLab);