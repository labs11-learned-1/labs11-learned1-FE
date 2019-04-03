import axios from "axios";
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  }
});

const UdemyCarousel = props => {
  let payload =  [
      "Music",
      "marketing",
      "Music&subcategory=Vocal"
    ]
  
  const { classes } = props;
  //   const {tags] = props;
  //   console.log("TAGS",tags)
  const [taggedData, setTaggedData] = React.useState([]);
  React.useEffect(() => {
    
    (() => {
    console.log("running axios request")    
    axios({
      method: 'POST',
      url:"https://metadatatesting.herokuapp.com/udemy-cat",
      data: payload })
    
    .then(res => {
        console.log("RESPONSE",res)
      setTaggedData(res.data);
    }).catch(err=>{
      console.log("error making axios request",err)
    })
  
  })();
  }, []);
  //   let catArray = ["Music", "marketing", "Music&subcategory=piano"]; // this is an array on state
  
  
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {console.log("TAGGEDDATA:   ", taggedData)}
        {taggedData.map(tile => (
          <GridListTile key={tile.image_480x270}>
            <img src={tile.image_480x270} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title
              }}
              actionIcon={
                <IconButton>
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

UdemyCarousel.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(UdemyCarousel);
