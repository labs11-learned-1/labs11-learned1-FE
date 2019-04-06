//react and data imports
import Link from "next/link";
import React from "react";
import { Store } from "../components/store";
import PropTypes from 'prop-types';

//firebase imports
import * as firebase from "firebase";
import { loadDB } from "../firebaseConfig/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';

//component imports
import Home from "../components/HomePage/homepage";
import Authentication from "../components/Authentication/Authentication";
import CategoryModal from '../components/CategoryModal/CategoryModal'
import UdemyCarousel from "../components/udemyCourses/udemyCarousel.js";
import GeneralNav from "../components/Navigation/GeneralNav";
import LandingNav from '../components/Navigation/LandingNav';

//styles imports
import { withStyles } from '@material-ui/core/styles';

const styles = {
  authContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  }
}

const Homepage = (props) => {
 
  const [categories, setCategories] = React.useState([]);
  const [open, setOpen] = React.useState(true);
  
  function handleClose() {
    setOpen(false);
}

  //add tags array to user
  const addTagsToUser = async () => {
    let result = await loadDB();
    let db = result.firestore();
    console.log(categories)
    if(categories.length != 3){
      alert("Please pick 3 categories");
    }
    else{
      db.collection('user').doc(state.userID).update({
        tags: firebase.firestore.FieldValue.delete(),
        tags: firebase.firestore.FieldValue.arrayUnion(categories[0], categories[1], categories[2])
      }).then(() => {
        console.log("tags added to db:  ", categories)
        handleClose();
      }).catch(err => {
        console.log("Error adding tags to db", err)
        alert("there was an error")
      })
    }
  }

  const handleAdd = name => {
    console.log(name);
    if (categories.length) {
        if (categories.includes(name)) {
            // delete it
            categories.splice(categories.indexOf(name), 1)
            setCategories(categories)
            console.log("after deleting", categories)
        } else if (categories.length < 3) {
            //add it to the array
            categories.push(name);
            setCategories(categories);
            console.log("after adding", categories);
        } else if (categories.length === 3) {
            console.log("categories and length", categories, categories.length)
            alert("only 3 categories may be picked")
        }
    } else if (categories.length === 3) {
        console.log("categories and length", categories, categories.length)
        alert("only 3 categories may be picked")
    }else {
        categories.push(name);
        setCategories(categories);
        console.log("after adding", categories);
    }
  }

 

  const {classes} = props;
    const { state, dispatch } = React.useContext(Store);
    if (!state.loggedIn) {
      return (
        <div className={classes.authContainer}>
          <Authentication
            type="login"
          />
        </div>
      )
    } else {
      return (
        <div>
          {state.loggedIn ? <GeneralNav/> : <LandingNav/>}
          <Home/>
          <UdemyCarousel tags={["Music", "marketing", "Music&subcategory=Vocal"]}/>
          {state.firstTimeUser ? <CategoryModal open={open} addTagsToUser={addTagsToUser} handleAdd={handleAdd} categories={categories}/> : null}
        </div>
      );
    }
  }

Homepage.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(Homepage);