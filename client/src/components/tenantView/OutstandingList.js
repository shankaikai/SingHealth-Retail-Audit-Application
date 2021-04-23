import { List, makeStyles, Typography } from "@material-ui/core";
import IssueItem from "./IssueItem";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles({
  root: {
    width: "100%",
    margin: 0,
    height: "calc(100vh - 272.4px)",
    overflow: "auto",
  },
  list: {
    padding: 0,
    overflow: "auto",
  },
  noIssues: {
    alignSelf: "center",
    justifySelf: "center",
  },
});

const OutstandingList = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {props.outstanding.length === 0 ? (
          <Typography className={classes.noIssues}>No issues :)</Typography>
        ) : (
          props.outstanding.map((issue) => (
            <div key={issue.id}>
              <IssueItem
                dueDate={issue.deadline}
                issueID={issue.id}
                issueName={issue.title}
              />
              <Divider light />
            </div>
          ))
        )}
      </List>
    </div>
  );
};

export default OutstandingList;
