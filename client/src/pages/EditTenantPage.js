import { TextField, makeStyles, Button } from "@material-ui/core";
import Header from "../components/common/Header";

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
  field: {
    marginTop: "10px",
  },
});

const EditTenantPage = () => {
  const classes = useStyles();

  // Submit handler
  const handleSubmit = () => {
    //TODO: Axios post req
    console.log("Submit");
  };

  return (
    <div className={classes.root}>
      <Header back title="EditTenantPage" />
      <form className={classes.form}>
        <TextField
          className={classes.field}
          fullWidth
          variant="filled"
          label="Tenant Name"
        />
        <TextField
          className={classes.field}
          fullWidth
          variant="filled"
          label="Location"
        />
        <TextField
          className={classes.field}
          fullWidth
          variant="filled"
          label="Type"
        />
        <TextField
          className={classes.field}
          fullWidth
          variant="filled"
          label="Email Address"
        />
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

export default EditTenantPage;
