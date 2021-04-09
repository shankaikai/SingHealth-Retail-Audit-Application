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
  form: {
    marginTop: "63px",
    width: "80%",
    paddingTop: "20px",
  },
  submit: {
    width: "80%",
    marginTop: "30px",
    marginBottom: "30px",
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
});

const AddTenantPage = () => {
  const classes = useStyles();

  const [details, setDetails] = useState({
    cluster: "",
    type: "",
  });

  const { setSpinner } = useContext(LoginContext);

  const [imageSelected, setImageSelected] = useState(null);

  // Submit handler
  const handleSubmit = () => {
    //TODO: Axios post req
    console.log(details);
    Axios.post("http://localhost:3001/api/tenant/create", details).then(
      (response) => {
        console.log(response.data);
      }
    );
  };

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.id]: e.target.value,
    });
    console.log(details);
  };

  const handleSelect = (e) => {
    setDetails({
      ...details,
      cluster: e.target.value,
    });
    console.log(details);
  };

  const handleType = (e) => {
    setDetails({
      ...details,
      type: e.target.value,
    });
    console.log(details);
  };

  const handlePhoto = (e) => {
    setDetails({
      ...details,
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
      console.log(res.data.url);
      setDetails({
        ...details,
        imageUrl: res.data.url,
      });
      setSpinner(false);
    });
  };

  return (
    <div className={classes.root}>
      <Header back title="Add New Tenant" />
      <form className={classes.form}>
        <TextField
          id="name"
          className={classes.field}
          fullWidth
          variant="filled"
          label="Tenant Name"
          onChange={handleChange}
          value={details.name}
        />
        <TextField
          id="location"
          className={classes.field}
          fullWidth
          variant="filled"
          label="Location"
          onChange={handleChange}
          value={details.location}
        />
        <FormControl variant="filled" className={classes.field} fullWidth>
          <InputLabel>Type</InputLabel>
          <Select onChange={handleType} label="Type">
            <MenuItem value={"F&B"}>{"F&B"}</MenuItem>
            <MenuItem value={"Non-F&B"}>{"Non-F&B"}</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="filled" className={classes.field} fullWidth>
          <InputLabel>Cluster</InputLabel>
          <Select onChange={handleSelect} label="Cluster">
            <MenuItem value={"CGH"}>CGH</MenuItem>
            <MenuItem value={"SGH"}>SGH</MenuItem>
            <MenuItem value={"SKGH"}>SKGH</MenuItem>
            <MenuItem value={"KKH"}>KKH</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="email"
          className={classes.field}
          fullWidth
          variant="filled"
          label="Email Address"
          onChange={handleChange}
          value={details.email}
        />
        <TextField
          id="password"
          className={classes.field}
          fullWidth
          variant="filled"
          label="Password"
          onChange={handleChange}
          value={details.password}
        />
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
          details.imageUrl ? (
            <img
              alt="issue"
              className={classes.image}
              src={details.imageUrl}
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
  );
};

export default AddTenantPage;
