import { Divider, makeStyles, Typography, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import { useHistory } from "react-router-dom";
import Searchbar from "./Searchbar";
import Avatar from "@material-ui/core/Avatar";
import HeaderDetails from "./HeaderDetails";
import ViewTenant from "../tenantView/HeaderViewTenant"

const useStyles = makeStyles({
  root: {
    top: 0,
    width: "100%",
    display: "flex",
    position: "fixed",
    flexDirection: "column",
  },
  header: {
    margin: 0,
    padding: "15px",
    height: "100%",
    // marginLeft: "26.1px",
    fontWeight: 500,
  },
  avatar: {
    margin: 0,
    padding: "15px",
    marginLeft: "26.1px",
    marginTop: "15px",
    marginBottom: "7px",
    width:"20px",
    height:"20px",
  },
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems:"center",
  },
});

const Header = (props) => {
  const classes = useStyles();
  let history = useHistory();

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        {props.back ? (
          <IconButton
            onClick={() => {
              history.goBack();
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        ) : (
            <div></div>
          )}
        {props.avatar ? <Avatar src={props.avatar} className={classes.avatar} /> : null}
        {props.avatar ? 
        <Typography variant="h5" className={classes.header} style={{marginLeft: "7px"}}>{props.title}</Typography> : 
        <Typography variant="h5" className={classes.header} style={{marginLeft: "26.1px"}}>{props.title}</Typography>}
      </div>
      {props.details ? <HeaderDetails details = {props.details} /> : null}
      {props.searchbar ? <Searchbar /> : null}
      <Divider />
    </div>
  );
};

export default Header;
