import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box"
import Avatar from '@material-ui/core/Avatar'
import logo from '../assets/koufu.jpg'
import tick from '../assets/tick.svg'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 0,
    },
});

const TenantItem = () => {
    const classes = useStyles();
    return (
        <Card classname={classes.root}>
            <CardContent style={{padding:"10px"}}>
                <div style={{ width: '100%', display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <Avatar alt="Koufu" src={logo} display="inline" style={{ float: 'left', paddingRight: '5px' }} />
                    <div display="inline" style={{float: 'left',flexGrow:4}}>
                        <Typography style={{marginBottom:"0"}} classname={classes.title} color="textPrimary" display="inline" gutterBottom>
                            <Box fontWeight="fontWeightBold" m={1}>
                                Name of store
                            </Box>
                        </Typography>
                        <Typography classname={classes.subTitle} color="textSecondary" gutterBottom>
                            <Box fontWeight="fontWeightRegular" fontSize={12} color="textSecondary" m={1}>
                                Date Completed: 01 Dec 2020
                            </Box>
                        </Typography>
                    </div>
                    <div display="inline">
                        <img src={tick} style={{display:"block", marginLeft:"auto", marginRight:"auto"}}/>
                        <Typography classname={classes.subTitle} color="textSecondary" gutterBottom>
                            <Box fontWeight="fontWeightRegular" fontSize={12} color="textSecondary" m={1} style={{textAlign:"center"}}>
                                95%
                            </Box>
                        </Typography>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default TenantItem;
