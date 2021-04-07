import {
  makeStyles,
  List,
  Typography,
  Box,
  Button,
  Divider,
} from "@material-ui/core";
import Header from "../../components/common/Header";
import { useLocation, useParams, useHistory } from "react-router-dom";
import IssueItem from "../../components/tenantView/IssueItem";
import { LoginContext } from "../../context/LoginContext";
import { useContext } from "react";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import MessageItem from "../../components/issueHandling/MessageItem";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  form: {
    marginTop: "63px",
    width: "80%",
    paddingTop: "20px",
  },
  submit: {
    width: "80%",
    marginBottom: "30px",
  },
  field: {
    marginBottom: "30px",
  },
  messageContainer: {
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    // marginTop: "63px",
    height: "calc(100vh - 163px)",
  },
  subheader: {
    display: "flex",
    flexDirection: "row",
    // marginTop: "63px",
    // height: "30px",
    justifyContent: "space-between",
    width: "90%",
  },
  subheaderContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "63px",
    height: "100px",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  subheaderText: {
    display: "flex",
    flexDirection: "column",
  },
  subheaderButtons: {
    display: "flex",
    flexDirection: "column",
  },
  buttons: {
    marginBottom: "10px",
  },
  skeletons: {
    padding: "10px",
    marginLeft: "20px",
    marginRight: "20px",
    // width: "90%",
  },
});

const AddIssuePage = () => {
  const classes = useStyles();
  const { context } = useContext(LoginContext);
  const { id } = useParams();
  const [issueData, setIssueData] = useState(0);
  const [messageData, setMessageData] = useState(0);
  const [userNames, setUserNames] = useState(0);
  const [issueDataTranslated, setIssueDataTranslated] = useState(0);

  let history = useHistory();

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/tenant/issue/${id}`).then(
      (response) => {
        setIssueData(response.data.issue);
        setMessageData(response.data.messages.reverse());
        console.log(response.data.issue);

        let users = {
          tenant: response.data.tenant,
          staff: response.data.staff,
        };

        let closed;
        if (response.data.issue[0].closed == 0) {
          closed = false;
        } else {
          closed = true;
        }

        let issueMessageTranslate = {
          isStaff: 1,
          dateSent: response.data.issue[0].date,
          body: response.data.issue[0].description,
          photoUrl: response.data.issue[0].imageUrl,
          location: response.data.issue[0].location,
          closed: closed,
        };

        setUserNames(users);
        setIssueDataTranslated(issueMessageTranslate);
      }
    );
  }, []);

  const handleReply = () => {
    history.push({
      pathname: `/newmessage/${id}`,
    });
  };

  const handleClose = () => {
    Axios.post(`http://localhost:3001/api/tenant/issue/${id}`, {
      closed: "1",
    }).then((response) => {
      console.log(response.data);
      if (response.data.message) {
        setIssueDataTranslated({ ...issueDataTranslated, closed: 1 });
      }
    });
  };

  return (
    <div>
      {!issueDataTranslated ? (
        <div className={classes.skeletons}>
          <Skeleton height={50} />
          <Skeleton height={80} />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div className={classes.root}>
          <Header back title={context.name} noDivider />
          {issueDataTranslated ? (
            <div className={classes.subheaderContainer}>
              <div className={classes.subheader}>
                <div className={classes.subheaderText}>
                  <Typography color="textPrimary">
                    <Box fontSize={16} style={{ marginBottom: "10px" }}>
                      Location: {issueDataTranslated.location}
                    </Box>
                  </Typography>
                  <Typography color="textPrimary">
                    <Box fontSize={16}>
                      Issue Date:{" "}
                      {new Date(issueDataTranslated.dateSent)
                        .toDateString()
                        .slice(4)}
                    </Box>
                  </Typography>
                </div>
                <div className={classes.subheaderButtons}>
                  <Button
                    color="primary"
                    className={classes.buttons}
                    variant="outlined"
                    onClick={() => handleReply()}
                    disabled={issueDataTranslated.closed}
                  >
                    NEW REPLY
                  </Button>
                  <Button
                    color="primary"
                    variant="outlined"
                    className={classes.button}
                    onClick={() => handleClose()}
                    disabled={issueDataTranslated.closed}
                  >
                    CLOSE ISSUE
                  </Button>
                </div>
              </div>
              <Divider style={{ width: "100%" }} />
            </div>
          ) : null}
          <div className={classes.messageContainer}>
            <List>
              {messageData
                ? messageData.map((data) => (
                    <MessageItem key={data.id} data={data} users={userNames} />
                  ))
                : null}
              {issueDataTranslated ? (
                <MessageItem data={issueDataTranslated} users={userNames} />
              ) : null}
            </List>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddIssuePage;
