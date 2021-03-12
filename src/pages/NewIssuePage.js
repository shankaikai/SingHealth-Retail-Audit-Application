import { makeStyles, TextField, Button } from "@material-ui/core";
import Header from "../components/common/Header";
import { useState } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { set } from "date-fns";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
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

const NewIssuePage = (props) => {
  const classes = useStyles();

  // Submit handler
  const handleSubmit = () => {
    console.log("Submit New Issue");
  };

  // Upload Photo Handler
  const handlePhoto = (e) => {
    console.log(e.target.value);
  };

  // State to store values
  const [values, setValues] = useState({
    issueName: "",
    location: "",
    description: "",
    deadline: null,
  });

  const handleChange = (e) => {
    console.log(e.target);
    setValues({
      ...values,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className={classes.root}>
      <Header
        back
        title="New Issue"
        backHandler={() => {
          props.handleBack(false);
        }}
      />
      <form className={classes.form}>
        <TextField
          id="issueName"
          className={classes.field}
          fullWidth
          variant="filled"
          label="Issue Name"
          value={values.issueName}
          onChange={handleChange}
        />
        <TextField
          id="location"
          className={classes.field}
          fullWidth
          variant="filled"
          label="Location"
          value={values.location}
          onChange={handleChange}
        />
        <TextField
          id="description"
          className={classes.field}
          fullWidth
          variant="filled"
          label="Description"
          multiline
          value={values.description}
          onChange={handleChange}
        />
        <div className={classes.field}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              value={values.deadline}
              fullWidth
              label="Deadline"
              inputVariant="filled"
              format="MM/dd/yyyy"
              onChange={(event) =>
                setValues({
                  ...values,
                  deadline: event,
                })
              }
            />
          </MuiPickersUtilsProvider>
        </div>
      </form>
      <Button
        variant="outlined"
        color="primary"
        className={classes.submit}
        onClick={handlePhoto}
      >
        Upload Photo
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

export default NewIssuePage;
