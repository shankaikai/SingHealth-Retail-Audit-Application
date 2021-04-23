import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Divider } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100vw",
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    margin: "5%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: "5px",
    justifyContent: "space-between",
  },
  imageHolder: {
    width: "100%",
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "40%",
  },
});

const MessageItem = (props) => {
  const classes = useStyles();
  const data = props.data;
  const users = props.users;

  const isToday = (dateSent) => {
    let date = new Date(dateSent);
    let today = new Date();
    if (date.getDay() === today.getDay()) {
      return true;
    }
    return false;
  };

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.header}>
          <Typography color="textPrimary">
            <Box fontWeight="fontWeightBold" fontSize={20}>
              {data.staffName
                ? data.staffName
                : data.tenantName
                ? data.tenantName
                : "Deleted User"}
            </Box>
          </Typography>
          <Typography color="textSecondary" style={{ paddingLeft: "20px" }}>
            <Box fontSize={14}>
              {data.dateSent && isToday(data.dateSent)
                ? new Date(data.dateSent).toTimeString().slice(0, 5)
                : data.dateSent && !isToday(data.dateSent)
                ? new Date(data.dateSent).toDateString().slice(4)
                : null}
            </Box>
          </Typography>
        </div>
        {data.photoUrl ? (
          <div className={classes.imageHolder}>
            <img
              alt="issue"
              className={classes.image}
              src={data.photoUrl}
            ></img>
          </div>
        ) : null}
        <Typography color="textPrimary" style={{ marginTop: "15px" }}>
          <Box fontSize={15} style={{ wrap: "pre-wrap" }}>
            {data.body}
          </Box>
        </Typography>
      </div>
      <Divider />
    </div>
  );
};

export default MessageItem;
