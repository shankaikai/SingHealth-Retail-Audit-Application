import { List, makeStyles } from "@material-ui/core";
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
});

const OutstandingList = () => {
  var issues = [
    {
      dueDate: "21/12/21",
      issueName: "Pot not boiled",
      issueID: "90",
    },
    {
      dueDate: "22/12/21",
      issueName: "A creative title",
      issueID: "96",
    },
    {
      dueDate: "23/12/21",
      issueName: "ran out of ideas",
      issueID: "99",
    },
    {
      dueDate: "24/12/21",
      issueName: "time to count",
      issueID: "100",
    },
    {
      dueDate: "25/12/21",
      issueName: "5",
      issueID: "70",
    },
    {
      dueDate: "26/12/21",
      issueName: "6",
      issueID: "98",
    },
    {
      dueDate: "27/12/21",
      issueName: "7",
      issueID: "92",
    },
  ];

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {issues.map((issue) => (
          <List className={classes.list}>
            <IssueItem
              key={issue.issuseName}
              dueDate={issue.dueDate}
              issueID={issue.issueID}
              issueName={issue.issueName}
            />
            <Divider light />
          </List>
        ))}
      </List>
    </div>
  );
};

export default OutstandingList;
