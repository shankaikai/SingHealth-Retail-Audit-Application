import { makeStyles } from "@material-ui/core";
import Header from "../../components/common/Header";
import { useLocation } from "react-router-dom";
import IssueItem from "../../components/tenantView/IssueItem";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  form: {
    marginTop: "63px",
    width: "80%",
    paddingTop: "20px",
  },
  submit: {
    width: "80%",
    marginBottom: "30px",
  },
  field: {
    marginBottom: "30px",
  },
});

const AddIssuePage = () => {
  const classes = useStyles();
  const location = useLocation();
  const issueName = location.state.issueName;

  // Submit handler
  const handleSubmit = () => {
    //TODO: Axios post req
    console.log("Submit");
  };

  return (
    <div className={classes.root}>
      <Header back title={issueName} />
      {/* <Typography>
        <Box>
          Your Reply
        </Box>
      </Typography> */}
      <IssueItem />
    </div>
  );
};

export default AddIssuePage;
