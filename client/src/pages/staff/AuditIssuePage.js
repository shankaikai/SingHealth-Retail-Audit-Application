import {
  makeStyles,
  List,
  Typography,
  Box,
  Button,
  Divider,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import Header from "../../components/common/Header";
import { useParams, useHistory } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import { useContext } from "react";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import MessageItem from "../../components/issueHandling/MessageItem";
import Skeleton from "@material-ui/lab/Skeleton";
import NotificationImportantIcon from "@material-ui/icons/NotificationImportant";
import config from "../../App.config";

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
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subheaderButtons: {
    display: "flex",
    flexDirection: "column",
  },
  buttons: {
    marginBottom: "10px",
    padding: "6px",
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
  const { context, setSpinner, setSnackbar } = useContext(LoginContext);
  const { id } = useParams();
  const [issueData, setIssueData] = useState(0);
  const [messageData, setMessageData] = useState(0);
  const [issueDataTranslated, setIssueDataTranslated] = useState(0);
  const [promptConfirm, setPromptConfirm] = useState(false);

  let history = useHistory();

  useEffect(() => {
    Axios.get(`${config.SERVERURL}/api/tenant/issue/${id}`).then((response) => {
      setIssueData(response.data.issue);
      setMessageData(response.data.messages.reverse());
      console.log(response.data);

      let closed;
      if (response.data.issue[0].closed === 0) {
        closed = false;
      } else {
        closed = true;
      }

      let issueMessageTranslate = {
        staffName: response.data.issue[0].staffName,
        dateSent: response.data.issue[0].date,
        deadline: response.data.issue[0].deadline,
        body: response.data.issue[0].description,
        photoUrl: response.data.issue[0].imageUrl,
        location: response.data.issue[0].location,
        closed: closed,
      };

      // setUserNames(users);
      setIssueDataTranslated(issueMessageTranslate);
    });
  }, [id]);

  const handleReply = () => {
    history.push({
      pathname: `/newmessage/${id}`,
    });
  };

  const initPrompt = () => {
    setPromptConfirm(true);
  };

  const handlePrompt = () => {
    setPromptConfirm(false);
    setSpinner(true);
    Axios.post(`${config.SERVERURL}/api/tenant/issue/prompt/${id}`).then(
      (response) => {
        if (response.data.message) {
        } else {
          setSnackbar({
            status: true,
            message: "Prompt failed. Please try again.",
            noBar: true,
          });
        }
        setSpinner(false);
      }
    );
  };

  const handleClose = () => {
    Axios.post(`${config.SERVERURL}/api/tenant/issue/${id}`, {
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
          <Dialog open={promptConfirm} onClose={() => setPromptConfirm(false)}>
            <DialogTitle>{`Prompt ${issueData[0].title}?`}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Prompting a tenant sends an email to remind them to rectify this
                issue. Would you like to prompt this tennant?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setPromptConfirm(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={handlePrompt} color="primary" autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
          <Header back title={issueData[0].title} noDivider />
          {issueDataTranslated ? (
            <div className={classes.subheaderContainer}>
              <div className={classes.subheader}>
                <div className={classes.subheaderText}>
                  <Typography color="textPrimary">
                    <Box fontSize={16} style={{ marginBottom: "5px" }}>
                      Location: {issueDataTranslated.location}
                    </Box>
                  </Typography>
                  <Typography color="textPrimary">
                    <Box fontSize={16} style={{ marginBottom: "5px" }}>
                      Issue Date:{" "}
                      {new Date(issueDataTranslated.dateSent)
                        .toDateString()
                        .slice(4)}
                    </Box>
                  </Typography>
                  <Typography color="textPrimary">
                    <Box fontSize={16}>
                      Deadline:{" "}
                      {new Date(issueDataTranslated.deadline)
                        .toDateString()
                        .slice(4)}
                    </Box>
                  </Typography>
                </div>
                <div className={classes.subheaderButtons}>
                  <div className={classes.buttonGroup}>
                    {context.type === "staff" ? (
                      <IconButton
                        color="primary"
                        className={classes.buttons}
                        variant="outlined"
                        onClick={() => initPrompt()}
                        disabled={issueDataTranslated.closed}
                      >
                        <NotificationImportantIcon />
                      </IconButton>
                    ) : null}
                    <Button
                      color="primary"
                      className={classes.buttons}
                      variant="outlined"
                      onClick={() => handleReply()}
                      disabled={issueDataTranslated.closed}
                    >
                      REPLY
                    </Button>
                  </div>
                  {context.type === "staff" ? (
                    <Button
                      color="primary"
                      variant="outlined"
                      className={classes.button}
                      onClick={() => handleClose()}
                      disabled={issueDataTranslated.closed}
                    >
                      CLOSE ISSUE
                    </Button>
                  ) : null}
                </div>
              </div>
              <Divider style={{ width: "100%" }} />
            </div>
          ) : null}
          <div className={classes.messageContainer}>
            <List>
              {messageData
                ? messageData.map((data) => (
                    <MessageItem key={data.id} data={data} />
                  ))
                : null}
              {issueDataTranslated ? (
                <MessageItem data={issueDataTranslated} />
              ) : null}
            </List>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddIssuePage;
