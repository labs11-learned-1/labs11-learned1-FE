import React from "react";
import Link from "next/link";

import { Store } from "../../components/store";
//FIREBASE
import * as firebase from "firebase";
import { loadDB } from "../../firebaseConfig/firebase";
import { followOthers } from '../firebaseAPI/firebaseFollow';
//MATERIAL UI
import { makeStyles } from "@material-ui/styles";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles(theme => ({
  randomUsers: {
    width: "200px",
    height: "460px",
    display: "flex",
    position: "relative",
    background: "ghostwhite",
    alignItems: "flex-end",
    left: "60.25%",
    '@media(max-width: 1040px)': {
      left: "0"
  },
  },
  avatar: {
    height: "40px",
    borderRadius: "50%",
    cursor: "pointer",
    margin: "10px 5px 5px 10px"
  },
  userWrap: {
    display: "flex",
    width: "100%",
    borderBottom: "1px solid #0db4b9",
    background: 'rgb(13, 180, 185, 0.1)'
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  userContainer: {
    height: "100%",
    display: "flex",
    flexFlow: "column",
    width: "100%",
  },
  name: {
    marginLeft: '8px'
  },
  followButton: {
    width: '50px',
    borderRadius: '5px',
    height: '20px',
    fontSize: '12px',
    margin: '-15px 0 15px 20px',
    background: '#e76d89',
    border: 'none',
    color: 'white'
  },
  sectionTitle: {
    backgroundColor: "#191970",
    borderRadius: "10px 10px 0 0",
    display: "flex",
    justifyContent: "center"
  }
}));

const RandomUsers = props => {
  const classes = useStyles();
  const [userList, setUserList] = React.useState([]);
  const { state, dispatch } = React.useContext(Store);
  const getRandomUsers = async () => {
    let arr = [];
    let result = await loadDB();
    let db = result.firestore();

    let randomInt = await Math.floor(Math.random() * Math.floor(2)); //returns 0 or 1

    await db
      .collection("user")
      .where("randomAccessor", "==", randomInt)
      .limit(4) //you will only ever get 4 users back
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
     let filteredArr = arr.filter(obj => {
          return obj.id !== state.userID
      }) //filter out the element that is the signed in user
      
  console.log("RANDOM faUserSecret", filteredArr)
      setUserList(userList => filteredArr);
   

  };

  React.useEffect(() => {
    getRandomUsers();
  }, [window.location.search]);

  return (
    <div className={classes.randomUsers}>
      <div className={classes.userContainer}>
        <div className={classes.sectionTitle}>
          <h5 style={{ color: "white" }}>Users recommended for you:</h5>
        </div>
        {/* begin ternary map */}
        
        {userList.length
          ? userList.map(item => {
              return  (
                <Link
                  href={{
                    pathname: "/users-lab",
                    query: { user: item.id, displayName: item.displayName }
                  }}
                >
                    <div className={classes.userWrap}>
                      <img src={item.image} className={classes.avatar} />
                      <div className={classes.userInfo}>
                        <h5 className={classes.name}>{item.displayName}</h5>
                        <button className={classes.followButton} onClick={() => followOthers(item.id, state.userID)}>Follow</button>
                      </div>
                    </div>
                </Link> 
              ) 
            })
          : null}
        {/* end ternary */}
      </div>

    </div>
  );
};

export default RandomUsers;
