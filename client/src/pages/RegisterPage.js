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
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../components/common/Header";
import Axios from "axios";

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
    width: "70%",
  },
  marginMax: {
    width: "100%",
  },
});
const RegisterPage = () => {
  const classes = useStyle();
  let history = useHistory();

  // States to store username and password
  const [password, setPassword] = useState("");
  const [cluster, setCluster] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  // Function to handle a register request
  const handleRegister = () => {
    // TODO: Add proper authencation here
    if (email === "" || password === "") {
      alert("Email/Password cannot be blank!");
    }

    if (password === repeatPassword) {
      Axios.post("http://localhost:3001/auth/register", {
        email: email,
        password: password,
        name: name,
        cluster: "SGH",
        type: "staff",
      }).then((response) => {
        console.log(response);
        if (response.data.messageExists) {
          alert("Username is taken!");
        } else if (response.data.message) {
          alert("Registration successful!");
        } else {
          alert("Server error!");
        }
      });
      history.push("/login");
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className={classes.root}>
      <Header back title="Register" />
      <FormControl className={classes.form}>
        <Box m={1} className={classes.marginMax}>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            fullWidth="true"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Box>
        <Box m={1} className={classes.marginMax}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth="true"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Box>
        <Box m={1} className={classes.marginMax}>
          <FormControl variant="outlined" fullWidth="true">
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              variant="outlined"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
        </Box>
        <Box m={1} className={classes.marginMax}>
          <FormControl variant="outlined" fullWidth="true">
            <InputLabel> Repeat Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword2 ? "text" : "password"}
              label="Repeat Password"
              variant="outlined"
              onChange={(e) => {
                setRepeatPassword(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword2(!showPassword2)}
                    edge="end"
                  >
                    {showPassword2 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            ></OutlinedInput>
          </FormControl>
        </Box>
        <Box m={1} className={classes.marginMax}>
          <Button
            variant="contained"
            color="primary"
            fullWidth="true"
            onClick={handleRegister}
          >
            Register
          </Button>
        </Box>
      </FormControl>
    </div>
  );
};

export default RegisterPage;
