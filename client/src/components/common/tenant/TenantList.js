import { List, makeStyles } from "@material-ui/core";
import TenantItem from "./TenantItem";

const useStyles = makeStyles({
  root: {
    width: "100%",
    margin: 0,
    marginBottom: "56x",
    marginTop: "139px",
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
  const search = props.searchValue;

  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {props.data
          .filter((tenant) => tenant.name.toLowerCase().includes(search))
          .map((filteredTenant) => (
            <TenantItem data={filteredTenant} key={filteredTenant.id} />
          ))}
      </List>
    </div>
  );
};

export default TenantList;
