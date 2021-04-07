import React from "react";
import PropTypes from "prop-types";
import { AppBar, Tabs, Tab, makeStyles, Box, Divider } from "@material-ui/core";
import ScoreItem from "./ScoreItem";
import IssueItem from "./IssueItem";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: "calc(62px + 72px + 20px)",
    position: "fixed",
  },
  scores: {
    overflowY: "scroll",
    height: "calc(100vh - 62px - 72px - 20px - 48px)",
  },
});

export default function AuditResults(props) {
  const scores = props.data.scores;
  const issues = props.data.issues;

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
          <Tab label="Scores" />
          <Tab label="Issues" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} className={classes.tab}>
        <div className={classes.scores}>
          {scores.map((score) => (
            <div>
              <ScoreItem data={score} />
              <Divider />
            </div>
          ))}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={classes.issue}>
          {issues.map((issue) => (
            <div>
              <IssueItem data={issue} />
              <Divider />
            </div>
          ))}
        </div>
      </TabPanel>
    </div>
  );
}
