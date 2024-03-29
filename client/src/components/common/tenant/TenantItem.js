import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import logo from "../../../assets/koufu.jpg";
import tick from "../../../assets/tick.svg";
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
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
  const completedDate = props.data.dateCompleted;
  const tenantID = props.data.id;
  const imageUrl = props.data.imageUrl;
  const cluster = props.data.cluster;
  const score = props.data.score;

  const handleOnClick = () => {
    history.push({
      pathname: `/tenant/${tenantID}`,
    });
  };
  return (
    <div className={classes.root}>
      <Card square onClick={handleOnClick}>
        <CardContent>
          <div className={classes.content}>
            <Avatar alt="logo" src={imageUrl} style={{ marginRight: "10px" }} />
            <div display="inline" style={{ float: "left", flexGrow: 4 }}>
              <Typography
                style={{ marginBottom: "0" }}
                className={classes.title}
                display="inline"
                gutterBottom>
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "center",
                minWidth: "49px",
              }}
            >{score>=95?
              <DoneIcon style={{color:green[500]}}/>:
            <ClearIcon style={{color:red[500]}}/>
            }
              
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
                  {score ? score.toFixed(1) + "%" : "-"}
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
