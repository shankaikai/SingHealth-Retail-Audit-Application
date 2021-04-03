import Header from "../../components/common/Header";
import ChecklistHeader from "../../components/checklist/ChecklistHeader";
import { makeStyles } from "@material-ui/core";
import Checklist from "../../components/checklist/Checklist";
import { useState, useEffect, useContext } from "react";
import NewIssuePage from "./NewIssuePage";
import { useHistory, useParams } from "react-router-dom";
import Axios from "axios";
import { LoginContext } from "../../context/LoginContext";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
});

// Importing the template json file
const checklist = require("../../assets/checklist_with_scores.json");

// Import scores template json
const scoresTemplate = require("../../assets/scores_template.json");

// TODO: Implement real props from the tenant page
const AuditChecklistPage = (props) => {
  const classes = useStyles();

  const { type, tenantID } = useParams();

  // Grab context
  const { context } = useContext(LoginContext);

  // Index counter
  const [index, setIndex] = useState(0);

  const [scores, setScores] = useState(scoresTemplate[type]);

  // Overall score saving state!
  const [auditChecklist, setAuditCheckList] = useState(checklist[type]);

  // New Issue State which will replace the UI with the new issue page
  const [newIssue, setNewIssue] = useState(false);

  const [tenantData, setTenantData] = useState({});

  const auditDetails = {
    tenantID: tenantID,
    staffID: context.id,
    completed: 0,
    dateStarted: new Date(Date.now()).toDateString(),
  };

  // Hold the totalAuditScore
  const [currentScore, setCurrentScore] = useState(0);

  const calculateWeightedTotal = (scores) => {
    if (scores) {
      let total = 0;
      for (let i = 0; i < scores.length; i++) {
        var score = scores[i];
        total += score.weightedScore;
      }
      return total;
    }
    return 0;
  };

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Grab from database to change audit checklist
    Axios.get(`http://localhost:3001/tenant/${tenantID}`).then((response) => {
      setTenantData(response.data);
      setLoaded(true);
    });
  }, [tenantID]);

  // To update the current total score whenever the scores state changes
  useEffect(() => {
    setCurrentScore(calculateWeightedTotal(scores));
  }, [scores]);

  // Handle next press
  const handleNext = () => {
    // Increase index by 1 if not last
    if (index < auditChecklist.length - 1) {
      setIndex(index + 1);
    } else {
      // TODO: Push to the end page with the tabulated scores
      console.log(auditChecklist);
      // history.push("/auditend");
      // Check if any unanswered questions
      let complete = true;
      for (let i = 0; i < scores.length; i++) {
        if (scores[i].numUnanswered !== 0) {
          alert("Please complete all questions!");
          complete = false;
          break;
        }
      }
      if (complete) {
        console.log("Moving to end page... uploading the checklist data");
      }
    }
  };

  // Handle back press
  const handleBack = () => {
    // Decrease index by 1
    setIndex(index - 1);
  };

  // Handle update score for UI
  const updateTotalScores = (questionIndex, sectionIndex, score) => {
    var temp = JSON.parse(JSON.stringify(auditChecklist));
    temp[index].sections[sectionIndex].questions[questionIndex].score = score;
    setAuditCheckList(temp);
    updateScores(temp);
  };

  const updateScores = (newAuditChecklist) => {
    var temp = JSON.parse(JSON.stringify(scores));
    var section = newAuditChecklist[index];
    console.log(section);
    var weightage = section.weightage;
    let totalSectionScore = 0;
    let numQuestionsConsidered = 0;
    let numUnanswered = 0;
    for (let j = 0; j < section.sections.length; j++) {
      var subsection = section.sections[j];
      for (let k = 0; k < subsection.questions.length; k++) {
        var question = subsection.questions[k];
        if (question.score !== -1) {
          numQuestionsConsidered += 1;
        }
        if (question.score === 1) {
          totalSectionScore += 1;
        }
        if (question.score === null || question.score === "") {
          numUnanswered += 1;
        }
      }
      // Set the temp scores object
      temp[index].numUnanswered = numUnanswered;
      temp[index].weightedScore =
        (totalSectionScore / numQuestionsConsidered) * weightage;
    }
    setScores(temp);
  };

  return (
    <div className={classes.root}>
      {newIssue ? (
        <NewIssuePage handleBack={setNewIssue} />
      ) : loaded ? (
        <div className={classes.root}>
          <Header back title="Audit Name" noDivider />
          <ChecklistHeader
            currentScore={currentScore}
            details={tenantData}
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
      ) : null}
    </div>
  );
};

export default AuditChecklistPage;
