import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import GridListTile from "@material-ui/core/GridListTile";
import GridList from "@material-ui/core/GridList";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
const cardSize = 0.3;
const cardHeight = "240px";
const cardWidth = "240px";
const useStyles = makeStyles(theme => ({
  hint: {
    color: "white"
  },
  instructions: {
    color: "white",
    fontSize: '5rem'
  },
  modalContainer: {
      background: '#072242'
  }
}));
function CategoryModal(props) {
  
  const classes = useStyles();
  const [r, setR] = React.useState(0);
  // const handleAdd = name => {
  //     console.log(name);
  //     if (categories.length) {
  //         if (categories.includes(name)) {
  //             // delete it
  //             categories.splice(categories.indexOf(name), 1)
  //             setCategories(categories)
  //             console.log("after deleting", categories)
  //         } else if (categories.length < 3) {
  //             //add it to the array
  //             categories.push(name);
  //             setCategories(categories);
  //             console.log("after adding", categories);
  //         } else if (categories.length === 3) {
  //             console.log("categories and length", categories, categories.length)
  //             alert("only 3 categories may be picked")
  //         }
  //     } else if (categories.length === 3) {
  //         console.log("categories and length", categories, categories.length)
  //         alert("only 3 categories may be picked")
  //     }else {
  //         categories.push(name);
  //         setCategories(categories);
  //         console.log("after adding", categories);
  //     }

  // }
  const cardStyle = {
    display: "block",
    margin: "0",
    height: cardHeight,
    width: cardWidth,
    cursor: "pointer"
  };
  const selectedStyle = {
    display: "block",
    margin: "0",
    height: cardHeight,
    width: cardWidth,
    cursor: "pointer",
    border: "1px solid black",
    boxShadow: "0px 4px 50px -4px #ff00ff",
    transform: "scale(1.01)",
    border: "3px solid white"
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
      >
        {/* Business Design Development Health & Fitness IT & Software Lifestyle Marketing Music Office Productivity Personal Development Photography Teaching & Academics */}
        <GridList
          cellHeight={200}
          className={classes.modalContainer}
          style={{
            display: "flex",
            flexFlow: "row wrap",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 160px 0 160px"
          }}
        >
          {/* <GridList cellHeight={200} style={{boxSizing:"border-box", display: 'block', verticalAlign: 'baseline',  padding: '120px 160px 0 160px'}}> */}

          <GridListTile
            cols={cardSize}
            style={{
              display: "block",
              height: cardHeight,
              width: "840px",
              margin: "0",
              background: "#004ba8"
            }}
          >
            <h1 className={classes.instructions}>
              Please Choose Your 3 Favorite Categories
            </h1>
            <p className={classes.hint}>3 are required!</p>
          </GridListTile>

          {/* <GridListTile cols={cardSize} style={{ display: 'block', margin: '0', height: cardHeight, width: cardWidth, cursor: 'pointer' }} onClick={() => { props.handleAdd("Technology") }} >
                        <img src="https://images.pexels.com/photos/193350/pexels-photo-193350.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                        <GridListTileBar title="Technology" />
                    </GridListTile> */}

          <GridListTile
            cols={cardSize}
            style={
              props.categories.includes("Music") ? selectedStyle : cardStyle
            }
            onClick={() => {
              props.handleAdd("Music");
              setR(r + 1);
            }}
          >
            <img src="https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
            <GridListTileBar title="Music" />
          </GridListTile>

          <GridListTile
            cols={cardSize}
            style={
              props.categories.includes("Business") ? selectedStyle : cardStyle
            }
            onClick={() => {
              props.handleAdd("Business");
              setR(r + 1);
            }}
          >
            <img src="https://images.pexels.com/photos/1437866/pexels-photo-1437866.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
            <GridListTileBar title="Business" />
          </GridListTile>

          <GridListTile
            cols={cardSize}
            style={
              props.categories.includes("Design") ? selectedStyle : cardStyle
            }
            onClick={() => {
              props.handleAdd("Design");
              setR(r + 1);
            }}
          >
            <img src="https://images.pexels.com/photos/1328891/pexels-photo-1328891.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
            <GridListTileBar title="Design" />
          </GridListTile>

          <GridListTile
            cols={cardSize}
            style={
              props.categories.includes("Development")
                ? selectedStyle
                : cardStyle
            }
            onClick={() => {
              props.handleAdd("Development");
              setR(r + 1);
            }}
          >
            <img src="https://images.pexels.com/photos/908284/pexels-photo-908284.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
            <GridListTileBar title="Development" />
          </GridListTile>

          <GridListTile
            cols={cardSize}
            style={
              props.categories.includes("Health & Fitness")
                ? selectedStyle
                : cardStyle
            }
            onClick={() => {
              props.handleAdd("Health & Fitness");
              setR(r + 1);
            }}
          >
            <img src="https://images.pexels.com/photos/40751/running-runner-long-distance-fitness-40751.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
            <GridListTileBar title="Health & Fitness" />
          </GridListTile>

          <GridListTile
            cols={cardSize}
            style={
              props.categories.includes("IT & Software")
                ? selectedStyle
                : cardStyle
            }
            onClick={() => {
              props.handleAdd("IT & Software");
              setR(r + 1);
            }}
          >
            <img src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
            <GridListTileBar title="IT & Software" />
          </GridListTile>

          <GridListTile
            cols={cardSize}
            style={
              props.categories.includes("Lifestyle") ? selectedStyle : cardStyle
            }
            onClick={() => {
              props.handleAdd("Lifestyle");
              setR(r + 1);
            }}
          >
            <img src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
            <GridListTileBar title="Lifestyle" />
          </GridListTile>

          <GridListTile
            cols={cardSize}
            style={
              props.categories.includes("Marketing") ? selectedStyle : cardStyle
            }
            onClick={() => {
              props.handleAdd("Marketing");
              setR(r + 1);
            }}
          >
            <img src="https://images.pexels.com/photos/1496192/pexels-photo-1496192.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
            <GridListTileBar title="Marketing" />
          </GridListTile>

          <GridListTile
            cols={cardSize}
            style={
              props.categories.includes("Office") ? selectedStyle : cardStyle
            }
            onClick={() => {
              props.handleAdd("Office");
              setR(r + 1);
            }}
          >
            <img src="https://images.pexels.com/photos/1432942/pexels-photo-1432942.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
            <GridListTileBar title="Office" />
          </GridListTile>

          <GridListTile
            cols={cardSize}
            style={
              props.categories.includes("Personal Development")
                ? selectedStyle
                : cardStyle
            }
            onClick={() => {
              props.handleAdd("Personal Development");
              setR(r + 1);
            }}
          >
            <img src="https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
            <GridListTileBar title="Personal Development" />
          </GridListTile>

          <GridListTile
            cols={cardSize}
            style={
              props.categories.includes("Photography")
                ? selectedStyle
                : cardStyle
            }
            onClick={() => {
              props.handleAdd("Photography");
              setR(r + 1);
            }}
          >
            <img src="https://images.pexels.com/photos/368893/pexels-photo-368893.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
            <GridListTileBar title="Photography" />
          </GridListTile>

          <GridListTile
            cols={cardSize}
            style={
              props.categories.includes("Teaching & Academics")
                ? selectedStyle
                : cardStyle
            }
            onClick={() => {
              props.handleAdd("Teaching & Academics");
              setR(r + 1);
            }}
          >
            <img src="https://images.pexels.com/photos/7075/people-office-group-team.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
            <GridListTileBar title="Teaching & Academics" />
          </GridListTile>
          <Button variant="contained" size="large" color="primary" style={{width:"53%", borderRadius: "12px", height: "71px", margin: "80px", backgroundColor: "#ff00ff"}} onClick={props.addTagsToUser}>
            Save
          </Button>
        </GridList>
      </Dialog>
    </div>
  );
}

export default CategoryModal;
