import { List, makeStyles, Typography } from "@material-ui/core";
import OutstandingItem from "./OutstandingItem";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";

const useStyles = makeStyles({
  root: {
    width: "100%",
    margin: 0,
    marginTop: "64px",
    marginBottom: "56x",
    height: "calc(100vh - 119px)",
  },
  list: {
    padding: 0,
    overflow: "auto",
    height: "100%",
  },
  noissue: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  icon: {
    height: "100px",
    width: "100px",
  },
});

const OutstandingList = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {props.data.length === 0 ? (
        <div className={classes.noissue}>
          <Typography variant="h3">No Issues</Typography>
          <InsertEmoticonIcon className={classes.icon} />
        </div>
      ) : (
        <List className={classes.list}>
          {props.data.map((item) => (
            <OutstandingItem key={item.storeID} data={item} />
          ))}
        </List>
      )}
    </div>
  );
};

export default OutstandingList;
