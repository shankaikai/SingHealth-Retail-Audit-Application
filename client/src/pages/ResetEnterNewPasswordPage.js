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
  import {  useParams, useHistory } from "react-router-dom";
  import Header from "../components/common/Header";
  import Axios from "axios";
import LoginPage from "./LoginPage";
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
  
    // States to store username and password
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
  
    // Function to handle update password
  
    const REGISTER_SUCCESS = "REGISTER_SUCCESS";
    const handleResetPassword = () => {
        if(password === repeatPassword) {
          Axios.post("http://localhost:3001/api/auth/resetpassword", { email, password })
          .then((res) => {
            alert("Password reset");
          })
          .catch((err) => {
            console.log(err);
          });
        } else {
          alert("Password not matched")
        }
        history.push("/login")

      }
  
    return (
      <div className={classes.root}>
        <Header back title="Reset Password" />
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
  