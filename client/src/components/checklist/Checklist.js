import React, { useRef } from "react";
import { makeStyles, Paper, Typography, Button } from "@material-ui/core";
import ChecklistItem from "./ChecklistItem";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "calc(62px + 92px)",
    height: "calc(100vh - 62px - 92px)",
    width: "100%",
    position: "fixed",
  },
  bar: {
    width: "100vw",
    height: "48px",
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
  },
  barContent: {
    width: "100vw",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "20px",
    marginRight: "20px",
    alignItems: "center",
  },
  questions: {
    height: "calc(100vh - 62px - 92px - 48px)",
    overflowY: "scroll",
    padding: 0,
  },
  section: {
    fontSize: "14px",
  },
  part: {
    fontSize: "12px",
    minWidth: "80px",
  },
  subtitle: {
    margin: "10px",
  },
  buttons: {
    margin: "30px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
}));

export default function Checklist(props) {
  const listRef = useRef(null);

  const classes = useStyles();

  const handleNext = () => {
    listRef.current.scrollTop = 0;
    props.nextHandler();
  };

  const handleBack = () => {
    listRef.current.scrollTop = 0;
    props.backHandler();
  };

  return (
    <div className={classes.root}>
      <Paper square className={classes.bar}>
        <div className={classes.barContent}>
          <Typography color="secondary" className={classes.section}>
            {props.checklist.title}
          </Typography>
          <Typography color="secondary" className={classes.part}>
            Part {props.index + 1} out of {props.length}
          </Typography>
        </div>
      </Paper>
      <div ref={listRef} className={classes.questions}>
        {props.checklist.sections.map((subsection, sectionIndex) => {
          return (
            <div key={sectionIndex}>
              <Typography variant="h6" className={classes.subtitle}>
                {subsection.subtitle}
              </Typography>
              {subsection.questions.map((question, questionIndex) => {
                return (
                  <ChecklistItem
                    key={question.text}
                    data={{
                      sectionIndex: sectionIndex,
                      questionIndex: questionIndex,
                      subtitle: subsection.title,
                      text: question.text,
                      score: question.score,
                    }}
                    updateHandler={props.updateTotalScores}
                  />
                );
              })}
            </div>
          );
        })}
        <div className={classes.buttons}>
          {props.index !== 0 ? (
            <Button variant="outlined" color="primary" onClick={handleBack}>
              Back
            </Button>
          ) : null}
          <Button variant="outlined" color="primary" onClick={handleNext}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
