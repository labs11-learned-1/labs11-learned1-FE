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
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

function CategoryModal() {
    const [open, setOpen] = React.useState(true);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    const handleDelete = data => () => {
        console.log(data)
        const chipToDelete = chipData.indexOf(data);
        console.log("to delete", chipToDelete);
        chipData.splice(chipToDelete, 1);
        console.log(chipData);
        setChipData(chipData);
    };

    return (
        <div>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar>
            <Toolbar>
                <IconButton color="inherit" onClick={handleClose} aria-label="Close">
                <CloseIcon />
                </IconButton>
                <Typography variant="h6" color="inherit">
                Please Pick your favorite categories
                </Typography>
                <Button color="inherit" onClick={handleClose}>
                save
                </Button>
                    {chipData.map(data => {
                        let icon = null;
                        return (
                            <Chip
                                label="Awesome Chip Component"
                                color={color}
                                deleteIcon={onDelete === 'custom' ? <DoneIcon /> : undefined}
                                onDelete={onDelete !== 'none' ? this.handleDeleteExample : undefined}
                                avatar={avatarToPlayground}
                                icon={iconToPlayground}
                                variant={variant}
                            />
                        );
                    })}
            </Toolbar>
            </AppBar>
            <GridList cellHeight={20}>
                <GridListTile cols={1} style={{height:"500px"}} >
                    <img src="https://images.pexels.com/photos/193350/pexels-photo-193350.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                    <GridListTileBar title="Technology"/>
                </GridListTile>

                <GridListTile cols={1} style={{height:"500px"}}>
                    <img src="https://images.pexels.com/photos/193350/pexels-photo-193350.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                    <GridListTileBar title="Technology"/>
                </GridListTile>
            </GridList>
        </Dialog>
        </div>
    );
}

export default CategoryModal;