import "./bootstrap"; 
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    card: {
        maxWidth: 400,
        margin: '20px',
    },
    media: {
        paddingTop: '56.25%', // 16:9
    },
});

const UserListCard = (props) => {
    const { classes } = props;
 
    return(
        <div>
            <Card className={classes.card}>
                <a href={props.content.link} target="_blank" style={{display: 'block', textDecoration: 'none'}}>
                <CardHeader
                    title={props.content.title}
                />

                <CardMedia
                className={classes.media}
                image={props.content.photoUrl}
                />

                <CardContent>
                    <Typography component="p">
                        {props.content.description}
                    </Typography>
                </CardContent>
                </a>
            </Card>
        </div>     
    )
}

UserListCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserListCard);