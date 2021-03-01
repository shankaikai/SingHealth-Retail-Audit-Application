import {
  ListItem,
  List,
  ListItemText,
  Divider,
  makeStyles,
} from "@material-ui/core";

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
      <ListItem button>
        <ListItemText primary="Tenant 1" />
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText primary="Tenant 1" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Tenant 1" />
      </ListItem>
      <Divider light />
      <ListItem button>
        <ListItemText primary="Tenant 1" />
      </ListItem>
    </List>
  );
};

export default TenantList;
