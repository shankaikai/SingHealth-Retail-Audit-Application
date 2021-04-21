import {
  TextField,
  makeStyles,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import Header from "../../components/common/Header";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import Axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  formContainer: {
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    height: "calc(100vh - 83px)",
    marginTop: "63px",
    paddingBottom: "20px",
  },
  form: {
    width: "80%",
    paddingTop: "20px",
  },
  submit: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  field: {
    marginTop: "10px",
  },
  imageHolder: {
    width: "100%",
    marginTop: "10px",
  },
  image: {
    width: "100%",
    marginBottom: "20px",
  },
});

const AddTenantPage = () => {
  const classes = useStyles();
  let history = useHistory();

  const [values, setValues] = useState({
    name: "",
    location: "",
    email: "",
    type: "",
    cluster: "",
  });

  const { setSpinner, setSnackbar } = useContext(LoginContext);

  const [imageSelected, setImageSelected] = useState(null);

  // Submit handler
  const handleSubmit = () => {
    setSpinner(true);
    Axios.post("http://localhost:3001/api/tenant/create", values).then(
      (response) => {
        setSpinner(false);
        if (response.data.message) {
          setSnackbar({
            status: true,
            message: "Added new tenant successfully!",
          });
          history.push("/");
        } else {
          setSnackbar({
            status: true,
            message: "Add tenant failed. Please try again.",
            noBar: true,
          });
        }
      }
    );
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.id]: e.target.value,
    });
  };

  const handleSelect = (e) => {
    setValues({
      ...values,
      cluster: e.target.value,
    });
  };

  const handleType = (e) => {
    setValues({
      ...values,
      type: e.target.value,
    });
  };

  const handlePhoto = (e) => {
    setValues({
      ...values,
      imageUrl: null,
    });
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
      setValues({
        ...values,
        imageUrl: res.data.url,
      });
      setSpinner(false);
    });
  };

  return (
    <div className={classes.root}>
      <Header back title="Add New Tenant" />

      <div className={classes.formContainer}>
        <form className={classes.form}>
          <TextField
            id="name"
            value={values.name}
            className={classes.field}
            fullWidth
            variant="filled"
            label="Tenant Name"
            onChange={handleChange}
          />
          <TextField
            id="location"
            value={values.location}
            className={classes.field}
            fullWidth
            variant="filled"
            label="Location"
            onChange={handleChange}
          />
          <FormControl variant="filled" className={classes.field} fullWidth>
            <InputLabel>Type</InputLabel>
            <Select onChange={handleType} label="Type" value={values.type}>
              <MenuItem value={"F&B"}>{"F&B"}</MenuItem>
              <MenuItem value={"Non-F&B"}>{"Non-F&B"}</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="filled" className={classes.field} fullWidth>
            <InputLabel>Cluster</InputLabel>
            <Select
              onChange={handleSelect}
              label="Cluster"
              value={values.cluster}
            >
              <MenuItem value={"CGH"}>CGH</MenuItem>
              <MenuItem value={"SGH"}>SGH</MenuItem>
              <MenuItem value={"SKGH"}>SKGH</MenuItem>
              <MenuItem value={"KKH"}>KKH</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="email"
            value={values.email}
            className={classes.field}
            fullWidth
            variant="filled"
            label="Email Address"
            onChange={handleChange}
          />
          <Button
            variant="outlined"
            color="primary"
            component="label"
            fullWidth
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
            fullWidth
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddTenantPage;
