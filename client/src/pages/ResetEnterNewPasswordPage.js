import {
  makeStyles,
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  Button,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Header from "../components/common/Header";
import Axios from "axios";
import { LoginContext } from "../context/LoginContext";
import config from "../App.config";
require("dotenv/config");

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
  let { email } = useParams();
  const { setSnackbar } = useContext(LoginContext);

  // States to store username and password
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [error, setError] = useState(false);

  // Function to handle update password
  const handleResetPassword = () => {
    if (password === repeatPassword) {
      Axios.post(`${config.SERVERURL}/api/auth/resetpassword`, {
        email,
        password,
      })
        .then((res) => {
          setSnackbar({
            status: true,
            message: "Password reset successful!",
            noBar: true,
          });
          history.push("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setSnackbar({
        status: true,
        message: "Passwords do not match!",
        noBar: true,
      });
    }
  };

  return (
    <div className={classes.root}>
      <Header title="Reset Password" />
      <FormControl className={classes.form}>
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
              error={error}
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
            onClick={handleResetPassword}
          >
            Reset password
          </Button>
        </Box>
      </FormControl>
    </div>
  );
};

export default RegisterPage;
