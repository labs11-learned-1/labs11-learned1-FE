import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TextField from '@material-ui/core/TextField';
import Link from "next/link";

const styles = theme => ({
    card: {
        width: "100%",
        maxWidth: 800,
        marginTop:"15px",
        marginBottom:"20px",
        border: "solid 1px #3f51b5",
        boxShadow: "3px 6px #3f51b5",
    },
    media: {
        width:"60%",
        height:"200px",
        margin: "auto"
    },
    avatar: {
        height: "75px",
        borderRadius: "50%",
        cursor:"pointer"
    },
    textField:{
        width:"50%"
    },
    actions:{
        display:"flex",
        justifyContent:"center"
    },
    cardContent: {
        margin: "auto 15px auto 15px",
        textAlign: "center"
    },
    styleOne: {
        width: "95%",
    },
    title: {
        fontSize: "18px",
        textAlign: "center"
    }
});

class Postcard extends React.Component {
    render() {
        const { classes } = this.props;
      const imgSrc =  this.props.content.displayImage ? this.props.content.displayImage : this.props.content.userImage
      console.log(this.props)
      const path = this.props.content.userId === this.props.state.userID ? "/learning-lab" : { pathname: '/users-lab', query: { user: this.props.content.userId, displayName : this.props.content.displayName}}
        return (
        <Card className={classes.card}>
            {/* Replace with users google image */}
            <Link href={path}>
                {/* <img className={classes.avatar} src={this.props.content.userImage} /> */}
                <CardHeader 
                    avatar={<img className={classes.avatar} src={imgSrc} />}
                    //title={this.props.content.title}
                    subheader={this.props.content.displayName}
                />
            </Link>
            {/* Replace image url if present to one inputted in text */}
            {this.props.content.photoUrl 
            ?<CardMedia
            className={classes.media}
            image={this.props.content.photoUrl}
            title="Website Image"
            />
            :
            null
            }
            <p className={classes.title}>{this.props.content.title}</p>
            <hr className={classes.styleOne} />
            <CardContent>
                {/* Replace with users own inputted text */}
                <Typography component="p" className={classes.cardContent}>
                    {this.props.content.content}
                </Typography>
            </CardContent>

            {/* <CardActions className={classes.actions}>
                {/* IDK if we will need or want this but I will leave in just in case */}
                {/* <IconButton aria-label="Like">
                    <FavoriteIcon />
                </IconButton>
                <TextField
                    label="Comment"
                    multiline
                    className={classes.textField}
                    margin="normal"
                    variant="filled"
                />
            </CardActions> */}
        </Card>
        );
    }
}

Postcard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Postcard);