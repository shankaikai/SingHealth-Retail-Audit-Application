import { TextField, makeStyles, Button } from "@material-ui/core";
import Header from "../../components/common/Header";
import Axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";
import { useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    height: "100vh",
    width: "100%",
  },
  form: {
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
  thefixeddiv: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "63px",
    height: "calc(100vh - 63px)",
    overflow: "auto",
    width: "100%",
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

const AddIssuePage = () => {
  const classes = useStyles();
  const { issueid } = useParams();
  let history = useHistory();

  // State to store values
  const [values, setValues] = useState({
    reply: "",
    imageUrl: null,
  });
  // State to store the current selected image
  const [imageSelected, setImageSelected] = useState(null);

  // Set identifying values in the post request data
  values.issueID = issueid;
  const { context } = useContext(LoginContext);
  if (context.type == "staff") {
    values.isStaff = "1";
  } else {
    values.isStaff = "0";
  }

  const handleTyping = (e) => {
    setValues({ ...values, reply: e.target.value });
  };

  // Upload Photo Handler
  const handlePhoto = (e) => {
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
    });
  };

  // Submit handler
  const handleSubmit = () => {
    Axios.post("http://localhost:3001/api/tenant/issue/reply", values).then(
      (response) => {
        console.log(response);
        history.goBack();
      }
    );
    console.log(values);
  };

  return (
    <div className={classes.root}>
      <Header back title="Reply" />
      <div className={classes.thefixeddiv}>
        <form className={classes.form}>
          <TextField
            fullWidth
            variant="filled"
            label="Enter reply here"
            className={classes.field}
            multiline
            rows={20}
            onChange={handleTyping}
          />
        </form>
        <Button
          variant="outlined"
          component="label"
          color="primary"
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

export default AddIssuePage;
