import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';
import GridListTileBar from '@material-ui/core/GridListTileBar';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

function CategoryModal(props) {
    function handleClose() {
        setOpen(false);
    }

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
    const cardSize = .3;
    const cardHeight = "420px";
    const cardWidth = "420px";


    return (
        <div>
            <Dialog fullScreen open={props.open} onClose={handleClose} TransitionComponent={Transition}>

                {/* Business Design Development Health & Fitness IT & Software Lifestyle Marketing Music Office Productivity Personal Development Photography Teaching & Academics */}
                <GridList cellHeight={200} style={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center', justifyContent: 'center', padding: '20px 160px 0 160px' }}>
                    {/* <GridList cellHeight={200} style={{boxSizing:"border-box", display: 'block', verticalAlign: 'baseline',  padding: '120px 160px 0 160px'}}> */}

                    <GridListTile cols={cardSize} style={{ display: 'block', height: cardHeight, width: "840px", margin: '0' }}  >
                        <img src="https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                        <GridListTileBar title="Instructions" />
                    </GridListTile>

                    <GridListTile cols={cardSize} style={{ display: 'block', margin: '0', height: cardHeight, width: cardWidth, cursor: 'pointer' }} onClick={() => { props.handleAdd("Technology") }} >
                        <img src="https://images.pexels.com/photos/193350/pexels-photo-193350.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                        <GridListTileBar title="Technology" />
                    </GridListTile>

                    <GridListTile cols={cardSize} style={{ display: 'block', margin: '0', height: cardHeight, width: cardWidth, cursor: 'pointer' }} onClick={() => { props.handleAdd("Music") }} >
                        <img src="https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                        <GridListTileBar title="Music" />
                    </GridListTile>

                    <GridListTile cols={cardSize} style={{ display: 'block', margin: '0', height: cardHeight, width: cardWidth, cursor: 'pointer' }} onClick={() => { props.handleAdd("Business") }} >
                        <img src="https://images.pexels.com/photos/1437866/pexels-photo-1437866.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                        <GridListTileBar title="Business" />
                    </GridListTile>

                    <GridListTile cols={cardSize} style={{ height: cardHeight, width: cardWidth, cursor: 'pointer' }} onClick={() => { props.handleAdd("Design") }}>
                        <img src="https://images.pexels.com/photos/1328891/pexels-photo-1328891.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                        <GridListTileBar title="Design" />
                    </GridListTile>

                    <GridListTile cols={cardSize} style={{ height: cardHeight, width: cardWidth, cursor: 'pointer' }} onClick={() => { props.handleAdd("Development") }}>
                        <img src="https://images.pexels.com/photos/908284/pexels-photo-908284.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                        <GridListTileBar title="Development" />
                    </GridListTile>

                    <GridListTile cols={cardSize} style={{ height: cardHeight, width: cardWidth, cursor: 'pointer' }} onClick={() => { props.handleAdd("Health & Fitness") }}>
                        <img src="https://images.pexels.com/photos/40751/running-runner-long-distance-fitness-40751.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                        <GridListTileBar title="Health & Fitness" />
                    </GridListTile>

                    <GridListTile cols={cardSize} style={{ height: cardHeight, width: cardWidth, cursor: 'pointer' }} onClick={() => { props.handleAdd("IT & Software") }}>
                        <img src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                        <GridListTileBar title="IT & Software" />
                    </GridListTile>

                    <GridListTile cols={cardSize} style={{ height: cardHeight, width: cardWidth, cursor: 'pointer' }} onClick={() => { props.handleAdd("Lifestyle") }}>
                        <img src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                        <GridListTileBar title="Lifestyle" />
                    </GridListTile>

                    <GridListTile cols={cardSize} style={{ height: cardHeight, width: cardWidth, cursor: 'pointer' }} onClick={() => { props.handleAdd("Marketing") }}>
                        <img src="https://images.pexels.com/photos/1496192/pexels-photo-1496192.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                        <GridListTileBar title="Marketing" />
                    </GridListTile>

                    <GridListTile cols={cardSize} style={{ height: cardHeight, width: cardWidth, cursor: 'pointer' }} onClick={() => {props.handleAdd("Office") }}>
                        <img src="https://images.pexels.com/photos/1432942/pexels-photo-1432942.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                        <GridListTileBar title="Office" />
                    </GridListTile>

                    <GridListTile cols={cardSize} style={{ height: cardHeight, width: cardWidth, cursor: 'pointer' }} onClick={() => { props.handleAdd("Personal Development") }}>
                        <img src="https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                        <GridListTileBar title="Personal Development" />
                    </GridListTile>

                    <GridListTile cols={cardSize} style={{ height: cardHeight, width: cardWidth, cursor: 'pointer' }} onClick={() => { props.handleAdd("Photography") }}>
                        <img src="https://images.pexels.com/photos/368893/pexels-photo-368893.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                        <GridListTileBar title="Photography" />
                    </GridListTile>

                    <GridListTile cols={cardSize} style={{ height: cardHeight, width: cardWidth, cursor: 'pointer' }} onClick={() => { props.handleAdd("Teaching & Academics") }}>
                        <img src="https://images.pexels.com/photos/7075/people-office-group-team.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                        <GridListTileBar title="Teaching & Academics" />
                    </GridListTile>

                </GridList>
                <Button color="inherit" onClick={props.addTagsToUser}>
                    Save
                </Button>
            </Dialog>
        </div>
    );
}

export default CategoryModal;