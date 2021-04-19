import {
  makeStyles,
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  Button,
  InputLabel,
  OutlinedInput,
  TextField,
  Select,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../components/common/Header";
import Axios from "axios";
import { LoginContext } from "../../context/LoginContext";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyle = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  formContainer: {
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "calc(100vh - 83px)",
    marginTop: "63px",
    paddingBottom: "20px",
  },
  form: {
    width: "80%",
    paddingBottom: "20px",
  },
  marginMax: {
    width: "100%",
  },
  imageHolder: {
    width: "100%",
    marginTop: "10px",
  },
  image: {
    width: "100%",
  },
  submit: {
    marginTop: "20px",
    marginBottom: "20px",
  },
});

const EditProfilePage = () => {
  const classes = useStyle();
  let history = useHistory();

  const { context, setSpinner, setContext } = useContext(LoginContext);

  // States to store username and password
  const [values, setValues] = useState({
    name: "",
    cluster: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [imageSelected, setImageSelected] = useState(true);

  const handlePhoto = (e) => {
    setValues({
      ...values,
      imageUrl: null,
    });
    setSpinner(true);
    setImageSelected(true);

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

  const handleSubmit = () => {
    setSpinner(true);
    // Axios post
    Axios.post(
      `http://localhost:3001/api/auth/edit/${context.id}`,
      values
    ).then((response) => {
      console.log(response.data);
      setContext({
        ...context,
        name: values.name,
        imageUrl: values.imageUrl,
      });
      history.goBack();
      setSpinner(false);
    });
  };

  useEffect(() => {
    setSpinner(true);
    Axios.get(`http://localhost:3001/api/auth/edit/${context.id}`).then(
      (response) => {
        setValues({
          name: response.data.name,
          email: response.data.email,
          cluster: response.data.cluster,
          imageUrl: response.data.imageUrl,
        });
        setSpinner(false);
      }
    );
  }, []);

  return (
    <div className={classes.root}>
      <Header back title="Edit Profile" />
      <div className={classes.formContainer}>
        <form className={classes.form}>
          <Box m={1}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              onChange={handleChange}
              value={values.name}
              fullWidth
            />
          </Box>
          <Box m={1}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              onChange={handleChange}
              value={values.email}
              fullWidth
            />
          </Box>
          <Box m={1}>
            <FormControl variant="outlined" fullWidth>
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
          </Box>

          <Box m={1}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                variant="outlined"
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              ></OutlinedInput>
            </FormControl>
            <Typography variant="caption">
              Please leave password blank if you do not want to change it.
            </Typography>
          </Box>
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
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
