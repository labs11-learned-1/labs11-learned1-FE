import Link from "next/link";
import React from "react";
import '../../styles/footer.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//  https://balsamiq.cloud/snv27r3/pqwdr68/r0330

const styles = theme => ({
    footer: {
        background: theme.mixins.deepBlue,
        padding: '3rem 3rem',
        width: '100%',
        textAlign: 'center',
        color: 'white',
        fontSize: '.7rem'
    }
});

const Footer = (props) => {

    const { classes } = props;
    
    return(
        <div className={classes.footer}>
            @2019 Erudtiion
        </div>
    );
}
Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);