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

const checklist = require("../assets/checklist_with_scores.json");

// TODO: Implement real props from the tenant page
const AuditChecklistPage = (props) => {
  const classes = useStyles();
  const handleNewIssue = () => {
    console.log("Handle new issue");
  };

  // Index counter
  const [index, setIndex] = useState(0);

  // Overall score saving
  const [auditChecklist, setAuditCheckList] = useState(
    checklist[tempProps.type]
  );

  useEffect(() => {
    // Grab from database to change audit checklist
    setAuditCheckList(checklist[tempProps.type]);
  }, []);

  // Handle next press
  const handleNext = (currentIndex, currentScores) => {
    // Save the current scores of the current question index
    updateTotalScores(currentIndex, currentScores);
    // Increase index by 1 if not last
    if (index < checklist[tempProps.type].length - 1) {
      setIndex(index + 1);
    } else {
      // TODO: Push to the end page with the tabulated scores
    }
  };

  // Handle back press
  const handleBack = (currentIndex, currentScores) => {
    // Save the current scores of the current question index
    updateTotalScores(currentIndex, currentScores);
    // Decrease index by 1
    setIndex(index - 1);
  };

  // Handle update score
  const updateTotalScores = (index, currentSectionScore) => {
    var temp = JSON.parse(JSON.stringify(auditChecklist));
    temp[index] = currentSectionScore;
    setAuditCheckList(temp);
  };

  return (
    <div className={classes.root}>
      <Header back title="Audit Name" noDivider />
      <ChecklistHeader newIssueHandler={handleNewIssue} />
      <Checklist
        data={auditChecklist[tempProps.type][index]}
        nextHandler={handleNext}
        backHandler={handleBack}
        index={index}
        length={auditChecklist[tempProps.type].length}
      />
    </div>
  );
};

export default AuditChecklistPage;
