import { Divider, makeStyles, Typography, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import { useHistory } from "react-router-dom";
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
    marginLeft: "26.1px",
    fontWeight: 500,
  },
  title: {
    display: "flex",
    flexDirection: "row",
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
        <Typography variant="h5" className={classes.header}>
          {props.title}
        </Typography>
      </div>
      {props.searchbar ? <Searchbar /> : null}
      <Divider />
    </div>
  );
};

export default Header;
