import { TextField, makeStyles, Button } from "@material-ui/core";
import Header from "../components/Header";

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
    marginTop: "30px",
  },
});

const AddTenantPage = () => {
  const classes = useStyles();

  // Submit handler
  const handleSubmit = () => {
    //TODO: Axios post req
    console.log("Submit");
  };

  return (
    <div className={classes.root}>
      <Header back title="Add New Tenant" />
      <form className={classes.form}>
        <TextField fullWidth variant="filled" label="Tenant Name" />
        <TextField fullWidth variant="filled" label="Location" />
        <TextField fullWidth variant="filled" label="Type" />
        <TextField fullWidth variant="filled" label="Email Address" />
      </form>
      <Button
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default AddTenantPage;
