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
import logo from "../../../assets/koufu.jpg";

var placeHolderIssues = [
  {
    name: "Issue 1",
    dueDate: "05 August 2021",
  },
  {
    name: "Issue 2",
    dueDate: "05 August 2021",
  },
  {
    name: "Issue 3",
    dueDate: "05 August 2021",
  },
];

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
    paddingRight: "5px",
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
            <Avatar alt="Koufu" src={logo} className={classes.avatar} />
            <div className={classes.description}>
              <Typography className={classes.title}>{props.name}</Typography>
              <Typography className={classes.details}>
                {props.type} • {props.location}
              </Typography>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.issuesContainer}>
            {placeHolderIssues.map((issue) => (
              <div className={classes.issue}>
                <Divider orientation="vertical" />
                <Typography
                  className={classes.issueDescription}
                  onClick={() => handleIssueClick(issue.name)}
                >
                  {issue.name} • {issue.dueDate}
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
