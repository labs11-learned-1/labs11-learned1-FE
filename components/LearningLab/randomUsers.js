import React from "react";
import Link from "next/link";
//FIREBASE
import * as firebase from "firebase";
import { loadDB } from "../../firebaseConfig/firebase";

//MATERIAL UI
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    avatar: {
        height: "40px",
        borderRadius: "50%",
        cursor:"pointer",
        margin: "5px"
    },
    userWrap: {
        display:"flex",
        width:"100%",
        flexFlow:"row wrap",
        borderBottom: "1px solid #000051"
    },
    
    userContainer: {
        height: "100%",
        display: "flex",
        flexFlow: "column",
        width: "100%"
    }
    ,
    sectionTitle:{
        backgroundColor: "#534bae",
        borderRadius: "10px 10px 0 0",
        display: "flex",
        justifyContent: "center"
    }

}));

const RandomUsers = props => {
  const classes = useStyles();
  const [userList, setUserList] = React.useState([]);

  const getRandomUsers = async () => {
    let arr = [];
    let result = await loadDB();
    let db = result.firestore();

    let randomInt = await Math.floor(Math.random() * Math.floor(2)); //returns 0 or 1
    

    await db.collection("user")
      .where("randomAccessor", "==",randomInt).limit(4) //you will only ever get 4 users back
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let result = doc.data();
          arr.push(result);
        });
      })
      .catch(err => {
        console.log(err);
      });
    setUserList(userList => arr);
    console.log(arr);
    console.log(userList);
  };

  React.useEffect(() => {
    getRandomUsers();
  }, []);

  return (
    <div className={classes.userContainer}>
    <div className={classes.sectionTitle}>
    <h5 style={{color: "white"}}>Users recommended for you:</h5>
    </div>
      {/* begin ternary map */}
      {userList.length
        ? userList.map(item => {
            return (
                <Link href={{pathname: '/users-lab', query: { user: item.userID, displayName : item.displayName}}}>
              <div className={classes.userWrap}>
                <img src={item.image} className={classes.avatar}/>
                <h5>{item.displayName}</h5>
              </div>
              </Link>
            );
          })
        : null}
      {/* end ternary */}
    </div>
  );
};

export default RandomUsers;