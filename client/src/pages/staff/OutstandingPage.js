import React from "react";
import Navbar from "../../components/common/Navbar";
import Header from "../../components/common/Header";
import { makeStyles } from "@material-ui/core";
import OutstandingList from "../../components/outstanding/OutstandingList";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
});

const OutstandingPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header title="Outstanding" />
      <OutstandingList />
      <Navbar route="outstanding" />
    </div>
  );
};

export default OutstandingPage;
