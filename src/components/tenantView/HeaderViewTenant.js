import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

const useStyles = makeStyles({
    root: {
        margin: "10px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent:"space-around",
        width:"120px",
        alignItems:"flex-start",
        padding:"0px",
        margin:"0px",
    },
    container: {
        // display: "flex",
        // justifyContent: "space-between"
    },
    button: {
        color: "#F15A22",
    },
    icon: {
        color: "#F15A22",
        padding: "9px",
    }

});

const ViewTenant = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <IconButton ariaLabel="delete" className={classes.icon}>
                    <DeleteIcon />
                </IconButton>
                <IconButton ariaLabel="edit" className={classes.icon}>
                    <EditIcon />
                </IconButton>
            </div>
            <Button variant="outlined" className={classes.button}>
                New Audit
            </Button>
        </div>
    );
}

export default ViewTenant;