import { makeStyles, TextField, Button } from "@material-ui/core";
import Header from "../../components/common/Header";
import { useContext, useState } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";
import { LoginContext } from "../../context/LoginContext";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
  },
  form: {
    width: "80%",
  },
  submit: {
    width: "80%",
    marginTop: "30px",
  },
  field: {
    marginTop: "10px",
  },
  imageHolder: {
    width: "80%",
    marginTop: "10px",
  },
  image: {
    width: "100%",
  },
  formContainer: {
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    marginTop: "63px",
    height: "calc(100vh - 63px)",
    paddingTop: "20px",
    paddingBottom: "20px",
  },
});

const NewIssuePage = (props) => {
  const classes = useStyles();

  const { setSpinner } = useContext(LoginContext);
  // Submit handler
  const handleSubmit = () => {
    console.log("Submit New Issue");
    // Form validation
    for (var key in values) {
      if (values[key] === null || values[key] === "") {
        alert("Please fill in all the required details!");
        return;
      }
    }
    // Push the data to the issues state variable in the parent
    props.handleIssues(values);
    props.handleBack(false);
  };

  // Upload Photo Handler
  const handlePhoto = (e) => {
    setSpinner(true);
    setImageSelected(e.target.files[0]);

    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "esc-image-bucket");

    // Push image to cloud and grab the image url
    Axios.post(
      "https://api.cloudinary.com/v1_1/esc-singhealth/image/upload",
      formData
    ).then((res) => {
      console.log(res.data.url);
      setValues({
        ...values,
        imageUrl: res.data.url,
      });
      setSpinner(false);
    });
  };

  // State to store the current selected image
  const [imageSelected, setImageSelected] = useState(null);

  // State to store values
  const [values, setValues] = useState({
    issueName: "",
    location: "",
    description: "",
    deadline: null,
    imageUrl: null,
  });

  // Function to handle changes in input values
  const handleChange = (e) => {
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
      <div className={classes.formContainer}>
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
            rows={4}
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
          component="label"
          className={classes.submit}
        >
          Upload Photo
          <input type="file" hidden onChange={handlePhoto} accept="image/*" />
        </Button>

        <div className={classes.imageHolder}>
          {imageSelected ? (
            values.imageUrl ? (
              <img
                alt="issue"
                className={classes.image}
                src={values.imageUrl}
              ></img>
            ) : (
              <Skeleton height={80} />
            )
          ) : null}
        </div>

        <Button
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default NewIssuePage;
