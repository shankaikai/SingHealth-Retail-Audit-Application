import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

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

const ScoreItem = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.text}>
        <Typography color="textPrimary">
          <Box fontWeight="fontWeightBold" fontSize={16}>
            {props.data.section}
          </Box>
        </Typography>
        <Typography color="textSecondary">
          <Box fontSize={14}>Weightage: {props.data.weightage}%</Box>
        </Typography>
      </div>
      <div className={classes.left}>
        {parseInt(props.data.score) >= (95 / 100) * props.data.weightage ? (
          <Typography>
            <Box fontSize={20} fontWeight="fontWeightBold" color="#6FCF97">
              {props.data.score}%
            </Box>
          </Typography>
        ) : (
          <Typography>
            <Box fontSize={20} fontWeight="fontWeightBold" color="#EB5757">
              {props.data.score}%
            </Box>
          </Typography>
        )}
      </div>
    </div>
  );
};

export default ScoreItem;
