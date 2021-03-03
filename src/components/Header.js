import {
  Divider,
  makeStyles,
} from "@material-ui/core";

import React from "react";
import Searchbar from "./Searchbar";

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
    marginLeft: "26.1px"
  },
  
});

const Header = (props) => {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <h2 className={classes.header}>{props.title}</h2>
      {props.searchbar ? <Searchbar/> : null}
      <Divider />
    </div>
  );
};

export default Header;
