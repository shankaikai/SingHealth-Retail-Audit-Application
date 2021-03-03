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
  // const names = ["koufu1", "koufu2", "koufu3"]
  // const dates = ["01 Dec", "02 Dec", "03 Dec"]
  // const itemDescriptions = [["koufu1", "01 Dec"], ["koufu2", "02 Dec"], ["koufu3", "03 Dec"]];
  var itemDescriptions = [
    {
      name: "Store 1",
      date: "01 Dec 2020",
      check: true,
      score: 95
    },
    {
      name: "Store 2",
      date: "01 Dec 2020",
      check: true,
      score: 95
    },
    {
      name: "Store 3",
      date: "01 Dec 2020",
      check: true,
      score: 95
    },
    {
      name: "Store 4",
      date: "01 Dec 2020",
      check: true,
      score: 95
    },
    {
      name: "Store 5",
      date: "01 Dec 2020",
      check: true,
      score: 95
    },
    {
      name: "Store 6",
      date: "01 Dec 2020",
      check: true,
      score: 95
    },
    {
      name: "Store 7",
      date: "01 Dec 2020",
      check: true,
      score: 95
    },
    {
      name: "Store 8",
      date: "01 Dec 2020",
      check: true,
      score: 95
    },
  ]
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {itemDescriptions.map((item) =>
          <TenantItem storeName={item.name} completedDate={item.date} key = {item.name}/>)}
      </List>
    </div>
  );
};

export default TenantList;
