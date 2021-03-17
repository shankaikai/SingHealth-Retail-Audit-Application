import Header from "../components/common/Header";
import ChecklistHeader from "../components/checklist/ChecklistHeader";
import { makeStyles } from "@material-ui/core";
import Checklist from "../components/checklist/Checklist";
import { useState, useEffect } from "react";
import NewIssuePage from "./NewIssuePage";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
});

const tempProps = {
  type: "F&B",
};

// Importing the template json file
const checklist = require("../assets/checklist_with_scores.json");

// TODO: Implement real props from the tenant page
const AuditChecklistPage = (props) => {
  const classes = useStyles();

  // Index counter
  const [index, setIndex] = useState(0);

  // Overall score saving state!
  const [auditChecklist, setAuditCheckList] = useState(
    checklist[tempProps.type]
  );

  // New Issue State which will replace the UI with the new issue page
  const [newIssue, setNewIssue] = useState(false);

  useEffect(() => {
    // Grab from database to change audit checklist
    // setAuditCheckList(checklist[tempProps.type]);
  }, []);

  // Handle next press
  const handleNext = () => {
    // Increase index by 1 if not last
    if (index < auditChecklist.length - 1) {
      setIndex(index + 1);
    } else {
      // TODO: Push to the end page with the tabulated scores
      console.log(auditChecklist);
    }
  };

  // Handle back press
  const handleBack = () => {
    // Decrease index by 1
    setIndex(index - 1);
  };

  // Handle update score
  const updateTotalScores = (sectionIndex, questionIndex, score) => {
    var temp = JSON.parse(JSON.stringify(auditChecklist));
    temp[index].sections[sectionIndex].questions[questionIndex].score = score;
    setAuditCheckList(temp);
  };

  return (
    <div className={classes.root}>
      {newIssue ? (
        <NewIssuePage handleBack={setNewIssue} />
      ) : (
        <div className={classes.root}>
          <Header back title="Audit Name" noDivider />
          <ChecklistHeader
            newIssueHandler={() => {
              setNewIssue(true);
            }}
          />
          <Checklist
            checklist={auditChecklist[index]}
            nextHandler={handleNext}
            backHandler={handleBack}
            index={index}
            length={auditChecklist.length}
            updateTotalScores={updateTotalScores}
          />
        </div>
      )}
    </div>
  );
};

export default AuditChecklistPage;
