import React, { useState, useContext } from "react";
import logo from "../assets/Singhealth-logo.png";
import {
  Button,
  TextField,
  Box,
  Typography,
  makeStyles,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { LoginContext } from "../context/LoginContext";
import Axios from "axios";
require("dotenv/config");

const useStyles = makeStyles({
  login: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingTop: "90px",
  },
  logo: {
    width: "60%",
    padding: "20px",
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

const LoginPage = (props) => {
  // Create a style object
  const classes = useStyles();

  // States to store username and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Grab setContext and setSpinner from LoginContext
  const { setContext, setSpinner } = useContext(LoginContext);

  // Function to handle a login request
  const handleLogin = () => {
    setSpinner(true);
    console.log("here");
    Axios.post("http://localhost:3001/api/auth/login", {
      email,
      password,
    }).then((res) => {
      if (res.data.login_status) {
        console.log(res.data);
        setContext(res.data);
      } else {
        alert(res.data.reason);
      }
    });
    setSpinner(false);
  };

  const handleForgetPassword = () => {
    Axios.post("http://localhost:3001/api/auth/login", {
      email,
      password,
    }).then((res) => {
      if (res.data.reason !== "INVALID_EMAIL") {
        Axios.post("http://localhost:3001/auth/resetpassword", { email })
          .then((res) => {
            alert("PLEASE_CHECK_YOUR_EMAIL");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert(res.data.reason);
      }
    });

    console.log("Handle forget");
  };

  return (
    <div className={classes.login}>
      <img src={logo} alt="Logo" className={classes.logo}></img>
      <FormControl className={classes.form} autoComplete>
        <Box m={1} className={classes.marginMax}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Box>

        <Box m={1} className={classes.marginMax}>
          <FormControl variant="outlined" fullWidth autoComplete>
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
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            onSubmit={handleLogin}
            type="submit"
          >
            Login
          </Button>
        </Box>
        <Typography className={classes.marginMax} align="left">
          Dont have an account? <Link to="/register">Register</Link>
        </Typography>
        <Typography className={classes.marginMax} align="left">
          <Link to="resetenterusername" onClick={handleForgetPassword}>
            Forgot Password?
          </Link>
        </Typography>
      </FormControl>
    </div>
  );
};

export default LoginPage;
