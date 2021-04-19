import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import logo from "../../assets/koufu.jpg";
import tick from "../../assets/tick.svg";
import { useHistory } from "react-router-dom";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { IconButton, Paper } from "@material-ui/core";
import ExportIcon from "@material-ui/icons/GetApp";

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

const TenantItem = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const score = props.score;
  const auditID = props.id;
  const data = props.data;
  const tenantID = props.tenantID;

  const handleOnClick = (name) => {
    console.log(name);
    history.push({
      pathname: `/auditend/${tenantID}/${auditID}`,
    });
  };

  // Calling the export function GET call to the backend
  const handleExport = () => {
    props.setExportData({
      dateStarted: new Date(data.dateStarted.slice(0, 10))
        .toDateString()
        .slice(4),
      id: auditID,
    });
    props.setToExport(true);
  };
  return (
    <div className={classes.root}>
      <div className={classes.text} onClick={() => handleOnClick(auditID)}>
        <Typography color="textPrimary">
          <Box fontWeight="fontWeightBold" fontSize={20}>
            Audit:{" "}
            {new Date(data.dateStarted.slice(0, 10)).toDateString().slice(4)}
          </Box>
        </Typography>
        <Typography color="textSecondary">
          <Box fontSize={14}>
            Date Completed:{" "}
            {data.dateCompleted
              ? new Date(data.dateCompleted.slice(0, 10)).toDateString()
              : null}
          </Box>
        </Typography>
      </div>
      <div className={classes.left}>
        {parseInt(score) >= 95 ? (
          <Typography>
            <Box fontSize={20} fontWeight="fontWeightBold" color="#6FCF97">
              {score}%
            </Box>
          </Typography>
        ) : (
          <Typography>
            <Box fontSize={20} fontWeight="fontWeightBold" color="#EB5757">
              {score}%
            </Box>
          </Typography>
        )}
        <IconButton className={classes.icon} onClick={handleExport}>
          <ExportIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default TenantItem;
