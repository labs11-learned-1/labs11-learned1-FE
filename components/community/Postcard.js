
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
        backgroundColor: "ghostwhite",
        borderRadius: 0,
        borderTop: 'solid rgb(230,236,240)'
    },
    cardHeader: {
        display: "flex",
        justifyContent: "flex-start"
    },
    displayName: {
        margin: "25px 0 0 10px",
        fontSize: "25px",
        display:"flex",
        flexDirection:"column",
    },
    media: {
        width:"40%",
        height:"200px",
        margin: "10px 0 0 25px"
    },
    avatar: {
        height: "65px",
        borderRadius: "50%",
        cursor:"pointer",
        margin: "10px 0 0 25px"
    },
    cardContent: {
        display: "flex",
        flexWrap: "wrap",
        margin: "0 0 20px 0"
    },
    cardBody: {
        display: "flex",
        flexDirection: "column",
        margin: "0 auto 0 auto"
    },
    textField:{
        width:"50%"
    },
    actions:{
        display:"flex",
        justifyContent:"center"
    },
    date:{
        fontSize:".75rem"
    }
});

class Postcard extends React.Component {
    render() {
        const { classes } = this.props;
        const imgSrc =  this.props.content.displayImage ? this.props.content.displayImage : this.props.content.userImage
        const path = this.props.content.userId === this.props.state.userID ? "/learning-lab" : { pathname: '/users-lab', query: { user: this.props.content.userId, displayName : this.props.content.displayName}}
        let finalDate = new Date(this.props.content.createdAt)
        console.log(finalDate)
        return (
        <Card className={classes.card}>
            <Link href={path}>
                <div className={classes.cardHeader}>
                    <img className={classes.avatar} src={imgSrc} />
                    <div className={classes.displayName}>
                        {this.props.content.displayName}
                        <p className={classes.date}>{finalDate.toString().substring(0, 21)}</p>
                    </div>
                </div>
            </Link>
            
            <div className={classes.cardContent}>
                {this.props.content.photoUrl ? 
                <CardMedia className={classes.media} image={this.props.content.photoUrl} title="Website Image" /> : 
                null
                }
                <div className={classes.cardBody}>
                    <h4 className={classes.title}>{this.props.content.title}</h4>
                    <p>{this.props.content.content}</p>
                </div>
            </div>
        </Card>
        );
    }
}

Postcard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Postcard);