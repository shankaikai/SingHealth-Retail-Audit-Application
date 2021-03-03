import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header"
import { makeStyles } from "@material-ui/core"
import OutstandingList from "../components/OutstandingList"

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%"
  }
})

const OutstandingPage = () => {
  const classes = useStyles()

  return (
    <div className = {classes.root}>
      <Header title = "Outstanding" />
      <OutstandingList/>
      <Navbar route = "outstanding"/>
    </div>
  );
};

export default OutstandingPage;
