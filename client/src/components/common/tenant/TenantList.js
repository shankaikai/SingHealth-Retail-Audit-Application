import { List, makeStyles } from "@material-ui/core";
import TenantItem from "./TenantItem";

const useStyles = makeStyles({
  root: {
    width: "100%",
    margin: 0,
    marginTop: "139px",
    marginBottom: "56x",
    height: "calc(100vh - 195px)",
  },
  list: {
    padding: 0,
    overflow: "auto",
    height: "100%",
  },
});

const TenantList = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {props.data.map((tenant) => (
          <TenantItem
            storeName={tenant.name}
            completedDate={tenant.lastAudit}
            imageUrl={tenant.imageUrl}
            key={tenant.id}
            id={tenant.id}
          />
        ))}
      </List>
    </div>
  );
};

export default TenantList;
