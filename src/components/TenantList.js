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
  },
});

const TenantList = () => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      <TenantItem/>
      <TenantItem/>
      <TenantItem/>
      <TenantItem/>
      <TenantItem/>
      <TenantItem/>
      <TenantItem/>
    </List>
  );
};

export default TenantList;
