import {
  ListItem,
  List,
  ListItemText,
  Divider,
  makeStyles,
} from "@material-ui/core";
import TenantItem from "./TenantItem";

const useStyles = makeStyles({
  root: {
    width: "100%",
    margin: 0,
    position: "fixed",
    marginTop: "136px",
    marginBottom: "56x",
    height: "calc(100vh - 192px)"
  },
  list: {
    padding: 0,
    overflow: "auto",
    height: "100%",
  }
});

const TenantList = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List className ={classes.list}>
      <TenantItem/>
      <TenantItem/>
      <TenantItem/>
      <TenantItem/>
      <TenantItem/>
      <TenantItem/>
      <TenantItem/>
      <TenantItem/>
      <TenantItem/>
      <TenantItem/>
      <TenantItem/>
    </List>
    </div>
    
  );
};

export default TenantList;
