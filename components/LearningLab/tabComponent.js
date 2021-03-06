
import React from "react";
import MyListCard from "./card";
import UserList from "../LearningLab/userList";
import UserPosts from "../LearningLab/userPosts";
import UserReviews from '../LearningLab/userReviews';

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import {Store} from '../../components/store'

import { makeStyles } from "@material-ui/styles";

import PropTypes from "prop-types";


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 0 }}>
      {props.children}
    </Typography>
  );
}
const useStyles = makeStyles(theme => ({
  tabWrap: {
    maxWidth: "600px",
    height: "100%",
    borderRadius: "10px 10px 0 0"
  },
  reviewDialog: {
    width: "548px",
    margin: "0",
    backgroundColor: "#3f51b5",
    "& h2": {
      color: "ghostwhite",
      fontWeight: "bold"
    }
  },

  toolbar: {
    padding: 0,
    margin: "0 auto",
    width: "48%",
    display: "flex",
    justifyContent: "space-between"
  },
  menu: {
    borderRadius: "50%",
    fontWeight: "bold",
    fontSize: "1.25rem"
  },
  homepageWrapper: {
    width: "80%",
    marginLeft: "26%"
  },
  myList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },

  learningLabWrap: {
    marginTop: "40px"
  },
  currentCourses: {
    minHeight: "100px"
  },
  tabRoot:{
    display: "flex",
    width: "100%",
    justifyContent: "space-around"
  },
  flexContainer:{
    display: "flex",
    width: "100%",
    justifyContent: "space-around"
  }
})); //end styles

const TabComponent = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { state , dispatch } = React.useContext(Store)
console.log("props",props)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.tabWrap}>
      <AppBar position="static" style={{backgroundColor: "midnightblue", borderRadius: "10px 10px 0 0", padding: "6px 0 6px 0"}}>
        <Tabs value={value} onChange={handleChange} classes={{root: classes.tabRoot,
        flexContainer: classes.flexContainer}}>
          <Tab label= {props.state.userID !== state.userID ? `${props.state.displayName}'s List` : "My List"} />
          <Tab label={props.state.userID !== state.userID ? `${props.state.displayName}'s Posts` : "My Posts"} />
          <Tab label={props.state.userID !== state.userID ? `${props.state.displayName}'s Reviews` : "My Reviews"} />
        </Tabs>
      </AppBar>
      {value === 0 && (
        <TabContainer>
          <UserList state={props.state} />
        </TabContainer>
      )}
      {value === 1 && (
        <TabContainer>
          <UserPosts state={props.state} />
        </TabContainer>
      )}
      {value === 2 && (
      <TabContainer>
          <UserReviews state={props.state} />
      </TabContainer>
      )}
    </div>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};
export default TabComponent;
