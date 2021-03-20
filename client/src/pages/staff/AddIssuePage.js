import { TextField, makeStyles, Button } from "@material-ui/core";
import Header from "../../components/common/Header";

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

  // Submit handler
  const handleSubmit = () => {
    //TODO: Axios post req
    console.log("Submit");
  };

  return (
    <div className={classes.root}>
      <Header back title="Add New Issue" />
      <form className={classes.form}>
        <TextField
          fullWidth
          variant="filled"
          label="Issue Name"
          className={classes.field}
        />
        <TextField
          fullWidth
          variant="filled"
          label="Location"
          className={classes.field}
        />
        <TextField
          fullWidth
          variant="filled"
          label="Description"
          className={classes.field}
          multiline
          rows={6}
        />
        <TextField
          fullWidth
          variant="filled"
          label="Date"
          className={classes.field}
        />
      </form>
      <Button
        variant="outlined"
        component="label"
        color="primary"
        className={classes.submit}
      >
        Upload Photo
        <input type="file" hidden />
      </Button>
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

export default AddIssuePage;
