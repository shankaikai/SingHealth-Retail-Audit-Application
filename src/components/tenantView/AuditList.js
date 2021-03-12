import { List, makeStyles } from "@material-ui/core";
import AuditItem from "./AuditItem";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles({
  root: {
    width: "100%",
    margin: 0,
    height: "calc(100vh - 272.4px)",
    overflow:"auto",
  },
  list: {
    padding: 0,
    overflow: "auto",
  },
});

const AuditList = () => {

  var audits = [
    {
      completedDate: "21/12/21",
      auditNumber: "1",
      score: "90",
    },
    {
      completedDate: "22/12/21",
      auditNumber: "2",
      score: "96",
    },
    {
      completedDate: "23/12/21",
      auditNumber: "3",
      score: "99",
    },
    {
      completedDate: "24/12/21",
      auditNumber: "4",
      score: "100",
    },
    {
      completedDate: "25/12/21",
      auditNumber: "5",
      score: "70",
    },
    {
      completedDate: "26/12/21",
      auditNumber: "6",
      score: "98",
    },
    {
      completedDate: "27/12/21",
      auditNumber: "7",
      score: "92",
    },
  ];

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {audits.map((audit) => (
          <List className={classes.list}>
            <AuditItem
              completedDate={audit.completedDate}
              score={audit.score}
              auditNumber={audit.auditNumber} />
            <Divider light />
          </List>
        ))}
      </List>
    </div>
  );
};

export default AuditList;
