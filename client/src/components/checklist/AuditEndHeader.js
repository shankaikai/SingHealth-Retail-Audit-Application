import React from "react";
import { makeStyles, Typography, Box } from "@material-ui/core";

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
    color: "#6FCF97",
  },
  badScore: {
    color: "#EB5757",
  },
  score: {
    display: "flex",
    flexDirection: "column",
    marginRight: "20px",
  },
}));

export default function AuditEndHeader(props) {
  const classes = useStyles();

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
      <div className={classes.score}>
        <Typography>Score:</Typography>

        <Typography
          variant="h5"
          className={props.score >= 95 ? classes.goodScore : classes.badScore}
        >
          <Box fontSize={30} fontWeight="fontWeightBold">
            {props.score}%
          </Box>
        </Typography>
      </div>
    </div>
  );
}
