import { makeStyles, List } from "@material-ui/core";
import Header from "../../components/common/Header";
import { useLocation, useParams } from "react-router-dom";
import IssueItem from "../../components/tenantView/IssueItem";
import { LoginContext } from "../../context/LoginContext";
import { useContext } from "react"
import React, { useState, useEffect } from "react";
import Axios from "axios";
import MessageItem from "../../components/issueHandling/MessageItem"

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
    marginTop: "63px",
    height: "calc(100vh - 63px)",
    // paddingTop: "20px",
    // paddingBottom: "20px",
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

  useEffect(() => {
    Axios.get(`http://localhost:3001/tenant/issue/${id}`).then((response) => {

      setIssueData(response.data.issue);
      setMessageData(response.data.messages.reverse()); 
      console.log(response.data.issue);
      // console.log(response.data.issue[0].description);
      
      let users = {
        "tenant":response.data.tenant,
        "staff":response.data.staff,
      };

      let issueMessageTranslate = {
        "isStaff":1,
        "dateSent": response.data.issue[0].date,
        "body": response.data.issue[0].description,
        "photoUrl":response.data.issue[0].imageUrl,
      }
      
      setUserNames(users);
      setIssueDataTranslated(issueMessageTranslate);
    });
  }, []);

  // Submit handler
  const handleSubmit = () => {
    //TODO: Axios post req
    console.log("Submit");
  };

  return (
    <div className={classes.root}>
      <Header back title={context.name} noDivider />
      <div className={classes.messageContainer}>
        <List>
          {messageData ?
            messageData.map((data) => (
              <MessageItem
                key={data.id}
                data={data}
                users={userNames}
              />
            ))
            : null}
            {issueDataTranslated?
            <MessageItem data={issueDataTranslated} users={userNames}/>
            :null}
        </List>
      </div>
    </div>
  );
};

export default AddIssuePage;
