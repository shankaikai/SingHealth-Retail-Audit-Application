import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import logo from "../../../assets/koufu.jpg";
import tick from "../../../assets/tick.svg";
import { useHistory } from "react-router-dom";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  content: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pos: {
    marginBottom: 0,
  },
  avatar: {
    display: "inline",
    float: "left",
    paddingRight: "5px",
  },
});

const TenantItem = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const storeName = props.data.name;
  const completedDate = props.data.lastAudit;
  const tenantID = props.data.id;
  const imageUrl = props.data.imageUrl;
  const cluster = props.data.cluster;

  const handleOnClick = (name) => {
    console.log(tenantID);
    history.push({
      pathname: `/tenant/${tenantID}`,
      // state: { storeName: name },
    });
  };
  return (
    <div className={classes.root}>
      <Card square onClick={() => handleOnClick(storeName)}>
        <CardContent>
          <div className={classes.content}>
            <Avatar alt="logo" src={imageUrl} style={{ marginRight: "10px" }} />
            <div display="inline" style={{ float: "left", flexGrow: 4 }}>
              <Typography
                style={{ marginBottom: "0" }}
                className={classes.title}
                color="textPrimary"
                display="inline"
                gutterBottom
              >
                <Box fontWeight="fontWeightBold" m={1}>
                  {storeName} • {cluster}
                </Box>
              </Typography>
              <Typography
                className={classes.subTitle}
                color="textSecondary"
                gutterBottom
              >
                <Box
                  fontWeight="fontWeightRegular"
                  fontSize={12}
                  color="textSecondary"
                  m={1}
                >
                  {completedDate
                    ? "Last Audit: " +
                      new Date(completedDate.slice(0, 10)).toDateString()
                    : "No audits done yet"}
                </Box>
              </Typography>
            </div>
            <div display="inline">
              <img
                alt="check"
                src={tick}
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <Typography
                className={classes.subTitle}
                color="textSecondary"
                gutterBottom
              >
                <Box
                  fontWeight="fontWeightRegular"
                  fontSize={12}
                  color="textSecondary"
                  m={1}
                  style={{ textAlign: "center" }}
                >
                  95%
                </Box>
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TenantItem;
