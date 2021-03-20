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
require("dotenv/config")

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  // Function to handle a register request

  const DUPLICATED_USERNAME = "DUPLICATED_USERNAME"
  const DATABASE_ERROR = "DATABASE_ERROR"

  const handleRegister = () => {
    // TODO: POST request to '/register'
    if (password === repeatPassword) {
      console.log("react: password: " + password)
      const user = {username, password}

      fetch("http://localhost:3000/register", {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(user)
      })
      .then((response) => response.json())
      .then((data) => {
        if(data.register_status) {
          alert("REGISTER_SUCCESS")
          history.push("/")
        } else {
          if(data.reason === DUPLICATED_USERNAME) {
            alert(DUPLICATED_USERNAME)
          } else if(data.reason === DATABASE_ERROR) {
            alert(DATABASE_ERROR)
          }
        }
      })
      .catch((err) => {
        console.log(err)
      });

    } 
    
    else {
      alert("PASSWORD_NOT_MATCHING");
    }
  };

  return (
    <div className={classes.root}>
      <Header back title="Register" />
      <FormControl className={classes.form}>
        <Box m={1} className={classes.marginMax}>
          <TextField
            id="userName"
            label="Username"
            variant="outlined"
            fullWidth="true"
            onChange={(e) => {
              setUsername(e.target.value);
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
              id="repeatpassword"
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
