import React from "react";
import PropTypes from "prop-types";
import { Store } from "../store";
import Link from "next/link";

//MATERIAL UI
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = theme => ({
  card: {
    borderBottom: "2px solid #e5f2f7",
    borderRadius: "0",
    boxShadow: "0",
    backgroundColor: "ghostwhite",
    position: "relative",
    height: "100%",
    "@media(max-width: 600px)": {
      display:"flex",
      flexFlow: "column wrap"
    },
  },
  headerRoot: {
    maxHeight: "64px"
  },
  headerContent: {
    width: "100%",
    maxHeight: "64px"
  },
  headerTitle: {
    maxHeight: "64px",
    overflow: "hidden",
    boxSizing: "border-box"
  },
  reviewsButton: {
    position: "absolute",
    bottom: "0",
    left: "59%",
    "@media(max-width: 600px)": {
      left: "42%"
    },
  },
  shareButton: {
    position: "absolute",
    bottom: "0",
    margin: "10px 0 0 7px"
  },
  deleteButton: {
    position: "absolute",
    bottom: "0",
    right: "7px"
  },
  cardHeader: {
    float: "right",
    width: "60%",
    padding: "8px",
    maxHeight: "64px",
    "@media(max-width: 600px)": {
      width: "94%",
      order: "1"
    },
  },
  content: {
    float: "right",
    width: "60%",
    padding: "0 16px 0 0",
    maxHeight: "60px",
    "@media(max-width: 600px)": {
      width: "94%",
      order: "2"
    },
  },
  media: {
    height: "78px",
    paddingTop: "56.25%", // 16:9
    "@media(max-width: 600px)": {
      width: "100%"
    },
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  body: {
    padding: "0 0 0 8px"
  },
  cardSize:{
    "@media(max-width: 600px)": {
      height:"527px"
    },
    "@media(max-width: 435px)": {
      height:"475px"
    },
    

  },
  linkStyle:{
    
      display: "block",
      textDecoration: "none",
      width: "34%",
      float: "left",
      position: "relative",
      cursor: "pointer",
      "@media(max-width: 600px)": {
        width: "100%"
      },
    
  },

});

const MyListCard = props => {
  const [openMenu, setOpenMenu] = React.useState(false);
  const { state, dispatch } = React.useContext(Store);
  const { classes } = props;
  console.log(props);

  return (
    <div className={classes.cardSize}>
      <Card className={classes.card}>
        <CardHeader
          classes={{
            root: classes.headerRoot,
            title: classes.headerTitle,
            content: classes.headerContent
          }}
          className={classes.cardHeader}
          action={
            <div>
              <IconButton
                style={{ zIndex: "3" }}
                buttonRef={node => {
                  IconButton.anchorEl = node;
                }}
                aria-owns={openMenu ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={ev => {
                  ev.preventDefault();
                  setOpenMenu(!openMenu);
                }}
                className={classes.menu}
              >
                <MoreVertIcon />
              </IconButton>
              <Popper
                open={openMenu}
                anchorEl={Popper.anchorEl}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    id="menu-list-grow"
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom"
                    }}
                  >
                    <Paper>
                      <ClickAwayListener
                        onClickAway={() => setOpenMenu(false)}
                      />
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          }
          title={
            props.content.title
              ? props.content.title.length > 55
                ? props.content.title.substring(0, 50) + "..."
                : props.content.title
              : "No title provided..."
          }
        />
        <div className={classes.linkStyle}
         
        >
          <Link href={`${props.content.url}`}>
            <CardMedia
              className={classes.media}
              image={
                props.content.photoUrl
                  ? props.content.photoUrl
                  : "https://www.honeystinger.com/c.3410322/sca-dev-elbrus/img/no_image_available.jpeg"
              }
            />
          </Link>
        </div>
        <CardContent
          //  className={classes.content}
          classes={{
            root: classes.content,
            content: classes.content,
            body: classes.body
          }}
        >
          <Typography classes={{ root: classes.body }} component="p">
            {props.content.description
              ? props.content.description.length > 150
                ? props.content.description.substring(0, 140) + "..."
                : props.content.description
              : "No description provided..."}
          </Typography>
        </CardContent>
        <Button
          className={classes.shareButton}
          onClick={ev => {
            ev.preventDefault();
            props.prepareSharePost(
              props.content.link,
              props.content.photoUrl,
              state.displayName,
              state.userImage,
              props.content.title,
              props.content.description
            ); //add props.metadata //link, photourl, displayname, userimgae, articletitle,articledescrtiption
            console.log("===============", props.content);
          }}
        >
          Share Post
        </Button>
        <Link href={`/postPage?content=${props.content.link}`}>
          <Button className={classes.reviewsButton}>REVIEWS</Button>
        </Link>

        <Button
          className={classes.deleteButton}
          onClick={ev => {
            ev.preventDefault();
            props.deleteContent();
          }}
        >
          DELETE
          <DeleteIcon className={classes.rightIcon} />
        </Button>
      </Card>
    </div>
  );
};

MyListCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyListCard);
