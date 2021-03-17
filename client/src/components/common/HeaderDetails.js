import { List, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import ViewTenant from "../tenantView/HeaderViewTenant";

const useStyles = makeStyles({
  root: {
    display: "flex",
    marginLeft: "26.1px",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  text: {
    top: 0,
    display: "flex",
    position: "relative",
    flexDirection: "column",
    width: "180px",
  },
  list: {},
  text: {
    fontSize: "12px",
    fontWeight: "fontWeightRegular",
  },
});

const parseLines = (lines) => {};

const HeaderDetails = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.text}>
        <List className={classes.list}>
          {props.details.map((line) => (
            <Typography className={classes.text}>
              {line.header} : {line.text}
            </Typography>
          ))}
        </List>
      </div>
      {/* <ViewTenant /> */}
    </div>
  );
};

export default HeaderDetails;
