import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import BellIcon from "@material-ui/icons/NotificationsActive";

const useStyles = makeStyles({
  root: {
    display: "flex",
    minWidth: 275,
    padding: "15px",
    paddingLeft: "26px",
    paddingRight: "26px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    display: "flex",
    flexDirection: "column",
  },
  left: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    // width: "30px",
    color: "#EB5757",
    padding: "0",
    paddingLeft: "20px",
  },
});

const TenantItem = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const dueDate = props.dueDate;
  const issueName = props.issueName;
  const issueID = props.issueID;

  const handleOnClick = () => {
    console.log(issueID);
    history.push({
      pathname: `/issue/${issueID}`,
    });
  };
  return (
    <div className={classes.root} onClick={handleOnClick}>
      <div className={classes.text}>
        <Typography color="textPrimary">
          <Box fontWeight="fontWeightBold" fontSize={20}>
            {issueName}
          </Box>
        </Typography>
        <Typography color="textSecondary">
          <Box fontSize={14}>
            Due Date:{" "}
            {dueDate ? new Date(dueDate.slice(0, 10)).toDateString() : null}
          </Box>
        </Typography>
      </div>
      <div className={classes.left}>
        <IconButton className={classes.icon}>
          <BellIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default TenantItem;
