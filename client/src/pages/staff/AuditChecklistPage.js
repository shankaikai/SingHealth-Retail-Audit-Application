import Header from "../../components/common/Header";
import ChecklistHeader from "../../components/checklist/ChecklistHeader";
import { makeStyles, Button } from "@material-ui/core";
import Checklist from "../../components/checklist/Checklist";
import { useState, useEffect, useContext } from "react";
import NewIssuePage from "./NewIssuePage";
import { useHistory, useParams } from "react-router-dom";
import Axios from "axios";
import { LoginContext } from "../../context/LoginContext";
import Skeleton from "@material-ui/lab/Skeleton";
import config from "../../App.config";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  skeletons: {
    padding: "10px",
    marginLeft: "20px",
    marginRight: "20px",
  },
  hack: {
    zIndex: 100,
    fontSize: "5px",
  },
});

// Importing the template json file
const checklist = require("../../assets/checklist_with_scores.json");

// Hacker checklist for 100 marksss
const checklist_hack = require("../../assets/checklist_hack.json");
const scores_hack = require("../../assets/scores_hack.json");

// Import scores template json
const scoresTemplate = require("../../assets/scores_template.json");

// TODO: Implement real props from the tenant page
const AuditChecklistPage = () => {
  const classes = useStyles();
  let history = useHistory();

  const [loaded, setLoaded] = useState(false);

  const { type, tenantID, onGoingAuditID } = useParams();

  // Grab context
  const { context, setSpinner, setSnackbar } = useContext(LoginContext);

  // Index counter
  const [index, setIndex] = useState(0);

  // Holder for the scores per section
  const [scores, setScores] = useState(scoresTemplate[type]);

  // Overall score saving state!
  const [auditChecklist, setAuditCheckList] = useState(checklist[type]);

  // New Issue State which will replace the UI with the new issue page
  const [newIssue, setNewIssue] = useState(false);

  // Holder for the tenants details in the header
  const [tenantData, setTenantData] = useState({});

  // Holder for the total weighted audit score
  const [currentScore, setCurrentScore] = useState(0);

  // Holder for date started
  const [dateStarted, setDateStarted] = useState(new Date(Date.now()));

  // Holder for all the issues during this audit
  const [issues, setIssues] = useState([]);

  // Function to calculate the weighted total score
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

  // Function to handle addition of new issues
  const handleIssues = (issue) => {
    setIssues([...issues, issue]);
  };

  // Function to handle back press in header
  // It will push the current audit data to the data base and update the tenant's onGoingAuditID
  const handleBackPress = () => {
    console.log("back");
    // Upload data to backend for partial audit
    uploadData(false);
  };

  // Grab tenant data from database to update UI
  useEffect(() => {
    Axios.get(`${config.SERVERURL}/api/tenant/${tenantID}`).then(
      (response) => {
        setTenantData(response.data);
        setLoaded(true);
      }
    );
  }, [tenantID]);

  // Conditional grabbing of ongoing audit data if there is any
  useEffect(() => {
    if (onGoingAuditID) {
      Axios.get(
        `${config.SERVERURL}/api/audit/ongoing/${onGoingAuditID}`
      ).then((response) => {
        const res = response.data;
        setScores(JSON.parse(res.scores));
        setAuditCheckList(JSON.parse(res.data));
        setCurrentScore(res.score);
        setDateStarted(new Date(res.dateStarted));
      });
    }
  }, [onGoingAuditID]);

  // To update the current total score whenever the scores state changes
  useEffect(() => {
    setCurrentScore(calculateWeightedTotal(scores));
  }, [scores, auditChecklist]);

  // Handle next press
  const handleNext = () => {
    // Increase index by 1 if not last
    if (index < auditChecklist.length - 1) {
      setIndex(index + 1);
    } else {
      // Check if any unanswered questions
      let complete = true;
      for (let i = 0; i < scores.length; i++) {
        if (scores[i].numUnanswered !== 0) {
          setSnackbar({
            status: true,
            message: "Please complete all questions!",
            noBar: true,
          });
          complete = false;
          break;
        }
      }

      if (complete) {
        console.log("Moving to end page... uploading the checklist data");
        // Call the upload data function and wait for the audit id response
        uploadData(true);
      }
    }
  };

  // POST req to push a completed set
  const uploadData = (complete) => {
    setSpinner(true);
    let toUpload = {
      tenantID: tenantID,
      staffID: context.id,
      dateStarted: dateStarted,
      completed: complete ? 1 : 0,
      data: auditChecklist,
      dateCompleted: complete ? new Date(Date.now()) : null,
      scores: scores,
      score: currentScore,
      issues: issues,
      auditID: onGoingAuditID ? onGoingAuditID : null,
    };
    // new to complete insert
    if (complete && !onGoingAuditID) {
      Axios.post(`${config.SERVERURL}/api/audit/newcomplete`, toUpload).then(
        (response) => {
          console.log(response.data);
          setSpinner(false);
          setSnackbar({
            status: true,
            message: "Audit saved successfully!",
            noBar: true,
          });
          history.push(`/auditend/${tenantID}/${response.data.auditID}`);
        }
      );
      // new to partial insert
    } else if (!complete && !onGoingAuditID) {
      Axios.post(`${config.SERVERURL}/api/audit/newpartial`, toUpload).then(
        (response) => {
          console.log(response.data);
          setSpinner(false);
          setSnackbar({ status: true, message: "Audit saved successfully!" });
          history.push(`/tenant/${tenantID}`);
        }
      );
      // partial to partial update
    } else if (!complete && onGoingAuditID) {
      Axios.post(`${config.SERVERURL}/api/audit/partial`, toUpload).then(
        (response) => {
          console.log(response.data);
          setSpinner(false);
          setSnackbar({ status: true, message: "Audit saved successfully!" });
          history.push(`/tenant/${tenantID}`);
        }
      );
      // partial to complete update
    } else if (complete && onGoingAuditID) {
      Axios.post(
        `${config.SERVERURL}/api/audit/partialcomplete`,
        toUpload
      ).then((response) => {
        console.log(response.data);
        setSpinner(false);
        setSnackbar({
          status: true,
          message: "Audit saved successfully!",
          noBar: true,
        });
        history.push(`/auditend/${tenantID}/${response.data.auditID}`);
      });
    }
  };

  // Handle back press
  const handleBack = () => {
    // Decrease index by 1
    setIndex(index - 1);
  };

  // Handle update score for the individual audit checklist items on the UI
  const updateTotalScores = (sectionIndex, questionIndex, score) => {
    var temp = JSON.parse(JSON.stringify(auditChecklist));
    temp[index].sections[sectionIndex].questions[questionIndex].score = score;
    setAuditCheckList(temp);
    updateScores(temp);
  };

  // Update the UI for the total scores
  const updateScores = (newAuditChecklist) => {
    var temp = JSON.parse(JSON.stringify(scores));
    var section = newAuditChecklist[index];
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
        <NewIssuePage handleIssues={handleIssues} handleBack={setNewIssue} />
      ) : loaded ? (
        <div className={classes.root}>
          <Button
            onClick={() => {
              console.log("hacking checklist");
              setAuditCheckList(checklist_hack[type]);
              setScores(scores_hack[type]);
            }}
            className={classes.hack}
          >
            Hack
          </Button>
          <Header
            back
            title={"Audit - " + dateStarted.toDateString()}
            noDivider
            backHandler={handleBackPress}
          />
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
      ) : (
        <div className={classes.skeletons}>
          <Skeleton height={50} />
          <Skeleton height={80} />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      )}
    </div>
  );
};

export default AuditChecklistPage;
