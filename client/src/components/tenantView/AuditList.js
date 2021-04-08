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
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {props.audits.map((audit) => (
          <div key={audit.id}>
            <AuditItem
              data={audit}
              completedDate={audit.dateCompleted}
              score={Math.round(audit.score * 10) / 10}
              auditNumber={audit.id}
              tenantID={audit.tenantID}
              id={audit.id}
            />
            <Divider light />
          </div>
        ))}
      </List>
    </div>
  );
};

export default AuditList;
