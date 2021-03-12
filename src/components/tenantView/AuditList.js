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

const TenantList = () => {
  var itemDescriptions = [
    {
      name: "Store 1",
      date: "01 Dec 2020",
      check: true,
      score: 95,
    },
    {
      name: "Store 2",
      date: "01 Dec 2020",
      check: true,
      score: 95,
    },
    {
      name: "Store 3",
      date: "01 Dec 2020",
      check: true,
      score: 95,
    },
    {
      name: "Store 4",
      date: "01 Dec 2020",
      check: true,
      score: 95,
    },
    {
      name: "Store 5",
      date: "01 Dec 2020",
      check: true,
      score: 95,
    },
    {
      name: "Store 6",
      date: "01 Dec 2020",
      check: true,
      score: 95,
    },
    {
      name: "Store 7",
      date: "01 Dec 2020",
      check: true,
      score: 95,
    },
    {
      name: "Store 8",
      date: "01 Dec 2020",
      check: true,
      score: 95,
    },
  ];
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {itemDescriptions.map((item) => (
          <TenantItem
            storeName={item.name}
            completedDate={item.date}
            key={item.name}
          />
        ))}
      </List>
    </div>
  );
};

export default TenantList;
