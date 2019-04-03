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
        maxWidth: 800,
    },
    media: {
        width:"100%",
        height:"200px"
    },
    avatar: {
        backgroundColor: red[500],
    },
    textField:{
        width:"50%"
    },
    actions:{
        display:"flex",
        justifyContent:"center"
    }
});

class Postcard extends React.Component {
    render() {
        const { classes } = this.props;

        return (
        <Card className={classes.card}>
            {/* Replace with users google image */}
            <Link href={{ pathname: '/users-lab', query: { user: this.props.content.userId }}}>
                <CardHeader 
                    avatar={<Avatar aria-label="Recipe" className={classes.avatar}>D</Avatar>}
                    title={this.props.content.title}
                    subheader="March 26, 2019"
                />
            </Link>
            {/* Replace image url if present to one inputted in text */}
            <CardMedia
            className={classes.media}
            image="https://28oa9i1t08037ue3m1l0i861-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/Logo-sometimes-Pixelmator-577.png"
            title="Website Image"
            />
            <CardContent>
                {/* Replace with users own inputted text */}
                <Typography component="p">
                    {this.props.content.content}
                </Typography>
            </CardContent>

            <CardActions className={classes.actions}>
                {/* IDK if we will need or want this but I will leave in just in case */}
                <IconButton aria-label="Like">
                    <FavoriteIcon />
                </IconButton>
                <TextField
                    label="Comment"
                    multiline
                    className={classes.textField}
                    margin="normal"
                    variant="filled"
                />
            </CardActions>
        </Card>
        );
    }
}

Postcard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Postcard);