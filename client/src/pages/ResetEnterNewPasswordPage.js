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
  
    // States to store username and password
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
  
    // Function to handle a register request
  
    const REGISTER_SUCCESS = "REGISTER_SUCCESS";
    const handleRegister = () => {
      /*
      // TODO: POST request to '/register'
      if (password === repeatPassword) {
        console.log("react: password: " + password);
        const user = { username, password };
  
        fetch("http://localhost:3000/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.register_status) {
              alert("REGISTER_SUCCESS");
              history.push("/");
            } else {
              if (data.reason === DUPLICATED_USERNAME) {
                alert(DUPLICATED_USERNAME);
              } else if (data.reason === DATABASE_ERROR) {
                alert(DATABASE_ERROR);
              }
            }
          }
        })
        .catch((err) => {
          console.log(err)
        });
  
      } 
      
      else {
        alert("PASSWORD_NOT_MATCHING");
      // TODO: Add proper authencation here
      if (email === "" || password === "") {
        alert("Email/Password cannot be blank!");
      }
  */
      if (password === repeatPassword) {
        Axios.post("http://localhost:3000/auth/register", {
          password: password,
        }).then((response) => {
          console.log(response);
          if (response.data.register_status === true) {
            alert(REGISTER_SUCCESS);
            history.push("/login");
          } else {
            alert(response.data.reason);
            console.log("register status: ", response.data.register_status);
          }
        });
      } else {
        alert("PASSWORD_NOT_MATCHED");
      }
    };
  
    return (
      <div className={classes.root}>
        <Header back title="Reset Password Page" />
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
              onClick={handleRegister}
            >
              Reset password
            </Button>
          </Box>
        </FormControl>
      </div>
    );
  };
  
  export default RegisterPage;
  