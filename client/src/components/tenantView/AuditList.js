import { List, makeStyles } from "@material-ui/core";
import AuditItem from "./AuditItem";
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

const AuditList = (props) => {
  var audits = [
    {
      completedDate: "21/12/21",
      auditNumber: "1",
      score: "90",
      id: "1",
    },
    {
      completedDate: "22/12/21",
      auditNumber: "2",
      score: "96",
      id: "2",
    },
    {
      completedDate: "23/12/21",
      auditNumber: "3",
      score: "99",
      id: "3",
    },
    {
      completedDate: "24/12/21",
      auditNumber: "4",
      score: "100",
      id: "4",
    },
    {
      completedDate: "25/12/21",
      auditNumber: "5",
      score: "70",
      id: "5",
    },
    {
      completedDate: "26/12/21",
      auditNumber: "6",
      score: "98",
      id: "6",
    },
    {
      completedDate: "27/12/21",
      auditNumber: "7",
      score: "92",
      id: "7",
    },
  ];

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {props.audits.map((audit) => (
          <List className={classes.list}>
            <AuditItem
              data = {audit}
              key={audit.id}
              completedDate={audit.dateCompleted}
              score={Math.round(audit.score * 10) / 10}
              auditNumber={audit.id}
              id={audit.id}
            />
            <Divider light />
          </List>
        ))}
      </List>
    </div>
  );
};

export default AuditList;
