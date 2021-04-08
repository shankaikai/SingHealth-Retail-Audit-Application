import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  Typography,
  Avatar,
  Divider,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    ".Mui-expanded": {
      margin: 0,
    },
  },
  container: {
    display: "flex",
    flexDirection: "row",
  },
  description: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontWeight: 500,
  },
  details: {
    fontSize: 12,
    color: theme.palette.text.secondary,
  },
  avatar: {
    alignSelf: "center",
    marginRight: "10px",
  },
  issuesContainer: {
    display: "flex",
    flexDirection: "column",
  },
  issue: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "18px",
  },
  issueDescription: {
    fontSize: 12,
    color: theme.palette.text.secondary,
    padding: "5px",
    marginLeft: "10px",
  },
}));

const OutstandingItem = (props) => {
  const classes = useStyles();

  //Function to handle onClick issue
  const handleIssueClick = (id) => {
    console.log(id);
  };

  return (
    <div className={classes.root}>
      <Accordion square>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <div className={classes.container}>
            <Avatar
              alt="logo"
              src={props.data.imageUrl}
              className={classes.avatar}
            />
            <div className={classes.description}>
              <Typography className={classes.title}>
                {props.data.storeName}
              </Typography>
              <Typography className={classes.details}>
                {props.data.type} • {props.data.location}
              </Typography>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.issuesContainer}>
            {props.data.issues.map((issue) => (
              <div key={issue.issueID} className={classes.issue}>
                <Divider orientation="vertical" />
                <Typography
                  className={classes.issueDescription}
                  onClick={() => handleIssueClick(issue.issueID)}
                >
                  {issue.title} •{" "}
                  {new Date(issue.date.slice(0, 10)).toDateString()}
                </Typography>
              </div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default OutstandingItem;
