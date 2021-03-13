import React from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import {useHistory} from 'react-router-dom';

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
}));

export default function ChecklistHeader(props) {
  const classes = useStyles();
  let history = useHistory();

  const handleNewIssue = ()=> {
    history.push({
      pathname: "/addissue"
    });
  }

  return (
    <div className={classes.root}>
      <div className={classes.details}>
        <Typography className={classes.text}>Tenant: {temp.name}</Typography>
        <Typography className={classes.text}>Type: {temp.type}</Typography>
        <Typography className={classes.text}>
          Location: {temp.location}
        </Typography>
        <Typography className={classes.text}>
          Audit Date: {temp.dateStarted}
        </Typography>
      </div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleNewIssue}
      >
        New Issue
      </Button>
    </div>
  );
}
