import React, { useState, useEffect } from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";

const temp = {
  name: "Tenant Name Here",
  type: "F&B",
  location: "#10-25",
  dateStarted: new Date(Date.now()).toDateString(),
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "62px",
    marginBottom: "20px",
    position: "fixed",
    width: "90%",
    justifyContent: "space-between",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  text: {
    fontSize: "12px",
    fontWeight: "fontWeightRegular",
  },
  goodScore: {
    fontSize: "16px",
    color: "#6FCF97",
    fontWeight: "500",
  },
  badScore: {
    fontSize: "16px",
    color: "#EB5757",
    fontWeight: "500",
  },
}));

export default function ChecklistHeader(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.details}>
        <Typography className={classes.text}>
          Tenant: {props.details.name}
        </Typography>
        <Typography className={classes.text}>
          Type: {props.details.type}
        </Typography>
        <Typography className={classes.text}>
          Location: {props.details.location}
        </Typography>
        <Typography className={classes.text}></Typography>
        <Typography className={classes.text}>
          Current Score:{" "}
          <span
            className={
              props.currentScore >= 95 ? classes.goodScore : classes.badScore
            }
          >
            {Math.round(props.currentScore * 10) / 10}
          </span>
        </Typography>
      </div>

      <Button
        variant="outlined"
        color="primary"
        onClick={props.newIssueHandler}
        className={classes.button}
      >
        New Issue
      </Button>
    </div>
  );
}
