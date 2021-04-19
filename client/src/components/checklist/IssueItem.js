import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";

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
    color: "#5F5F5F",
    padding: "0",
    paddingLeft: "20px",
  },
});

const IssueItem = (props) => {
  const classes = useStyles();

  let history = useHistory();

  //Function to handle onClick issue
  const handleIssueClick = () => {
    history.push({
      pathname: `/issue/${props.data.id}`,
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.text} onClick={handleIssueClick}>
        <Typography color="textPrimary">
          <Box fontWeight="fontWeightBold" fontSize={16}>
            {props.data.title}
          </Box>
        </Typography>
        <Typography color="textSecondary">
          <Box fontSize={14}>{props.data.description}</Box>
        </Typography>
      </div>
    </div>
  );
};

export default IssueItem;
