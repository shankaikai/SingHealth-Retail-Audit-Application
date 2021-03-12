import Header from "../components/common/Header";
import ChecklistHeader from "../components/checklist/ChecklistHeader";
import { makeStyles } from "@material-ui/core";
import Checklist from "../components/checklist/Checklist";
import { useState, useEffect } from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
});

const tempProps = {
  type: "F&B",
};

var data = require("../assets/checklist.json");

// TODO: Implement real props from the tenant page
const AuditChecklistPage = (props) => {
  const classes = useStyles();
  const handleNewIssue = () => {
    console.log("Handle new issue");
  };

  // Index counter
  const [index, setIndex] = useState(0);

  // Overall data saving
  const [auditData, setAuditData] = useState([]);

  // Handle next press
  const handleNext = (currentScores) => {
    // Save the current scores of the current question index

    // Increase index by 1 if not last
    if (index < data[tempProps.type].length - 1) {
      setIndex(index + 1);
    } else {
      // TODO: Push to the end page with the tabulated scores
    }
  };

  // Handle back press
  const handleBack = (currentScores) => {
    // Save the current scores of the current question index

    // Decrease index by 1
    setIndex(index - 1);
    console.log(index);
  };

  return (
    <div className={classes.root}>
      <Header back title="Audit Name" noDivider />
      <ChecklistHeader newIssueHandler={handleNewIssue} />
      <Checklist
        data={data[tempProps.type][index]}
        nextHandler={handleNext}
        backHandler={handleBack}
        index={index + 1}
        length={data[tempProps.type].length}
      />
    </div>
  );
};

export default AuditChecklistPage;
