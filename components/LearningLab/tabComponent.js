import React from "react";
import MyListCard from "./card";
import UserList from "../LearningLab/userList";
import UserPosts from "../LearningLab/userPosts";
import UserReviews from '../LearningLab/userReviews';

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/styles";

import PropTypes from "prop-types";


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
const useStyles = makeStyles(theme => ({
  tabWrap: {
    maxWidth: "600px",
    height: "100%"
  },
  reviewDialog: {
    width: "548px",
    margin: "0",
    backgroundColor: "#3f51b5",
    "& h2": {
      color: "white",
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
    fontSize: "20px"
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
  }
})); //end styles

const TabComponent = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
console.log("props",props)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.tabWrap}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="My List" />
          <Tab label={`${props.state.displayName}'s Posts`} />
          <Tab label={`${props.state.displayName}'s Reviews`} />
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
