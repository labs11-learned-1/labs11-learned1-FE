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
        justifyContent: "space-between"
    },
    display: {
        fontSize: "15px",
        display:"flex",
        fontWeight: 700
    },
    displayName: {
        margin: '18px 0 0 10px'
    },
    date:{
        fontSize:".75rem",
        margin: '15px 15px 0 0'
    },
    postContent: {
        fontSize: '14px'
    },
    media: {
        width:"40%",
        height:"120px",
        margin: "10px 0"
    },
    avatar: {
        height: "35px",
        borderRadius: "50%",
        cursor:"pointer",
        margin: "10px 0 0 15px"
    },
    cardContent: {
        display: "flex",
        margin: '10px 30px 15px 60px',
        flexDirection: 'column'
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
                    <div className={classes.display}>
                        <img className={classes.avatar} src={imgSrc} />
                        <div className={classes.displayName}>{this.props.content.displayName}</div>
                    </div>
                    <p className={classes.date}>{finalDate.toString().substring(0, 21)}</p>
                </div>
            </Link>
            
            <div className={classes.cardContent}>
                <div className={classes.postContent}>{this.props.content.content}</div>
                {this.props.content.photoUrl ? 
                <CardMedia className={classes.media} image={this.props.content.photoUrl} title="Website Image" /> : 
                null
                }
                {console.log('post', this.props.content)}
                {console.log('state', this.props.state)}
            </div>
        </Card>
        );
    }
}

Postcard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Postcard);