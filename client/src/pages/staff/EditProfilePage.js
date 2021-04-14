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
import { RepeatOneSharp, Visibility, VisibilityOff } from "@material-ui/icons";
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
    marginTop: "100px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
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
});

const EditProfilePage = () => {
  const classes = useStyle();

  const { context, setSpinner, setContext } = useContext(LoginContext);

  // States to store username and password
  const [values, setValues] = useState({
    id: "",
    name: "",
    cluster: "",
    email: "",
    password: "",
    usertype: context.type,
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
    // Axios post
  };

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/auth/edit/${context.id}`).then(
      (response) => {
        setValues({
          name: response.data.name,
          email: response.data.email,
          cluster: response.data.cluster,
          imageUrl: response.data.imageUrl,
        });
      }
    );
  }, []);

  return (
    <div className={classes.root}>
      <Header back title="Edit Profile" />
      <FormControl className={classes.form}>
        <Box m={1} className={classes.marginMax}>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            fullWidth="true"
            onChange={handleChange}
            value={values.name}
          />
        </Box>
        <Box m={1} className={classes.marginMax}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth="true"
            onChange={handleChange}
            value={values.email}
          />
        </Box>
        <Box m={1} className={classes.marginMax}>
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

        <Box m={1} className={classes.marginMax}>
          <FormControl variant="outlined" fullWidth="true">
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
        <Box m={1} className={classes.marginMax}>
          <Button
            variant="contained"
            color="primary"
            fullWidth="true"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </FormControl>
    </div>
  );
};

export default EditProfilePage;
