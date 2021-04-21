import React, { useState, useContext } from "react";
import logo from "../assets/Singhealth-logo.png";
import { useHistory } from "react-router-dom";
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
  FormHelperText,
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
    width: "100vw",
    height: "100vh",
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

const LoginPage = () => {
  // Create a style object
  const classes = useStyles();
  let history = useHistory();

  // States to store username and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Grab setContext and setSpinner from LoginContext
  const { setContext, setSpinner } = useContext(LoginContext);

  // Error states
  const [error, setError] = useState(false);

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Function to handle a login request
  const handleLogin = () => {
    if (validateEmail(email)) {
      setSpinner(true);
      Axios.post(
        "http://localhost:3001/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      ).then((res) => {
        if (res.data.login_status) {
          setContext(res.data);
        } else {
          setError(true);
        }
        setSpinner(false);
      });
    } else {
      setError(true);
    }
  };

  const handleForgetPassword = () => {
    history.push("/resetenterusername");
  };

  return (
    <div className={classes.login}>
      <img src={logo} alt="Logo" className={classes.logo}></img>
      <Typography variant="h6">Retail Audit</Typography>
      <FormControl className={classes.form} autoComplete="true">
        <Box m={1} className={classes.marginMax}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            error={error}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Box>

        <Box m={1} className={classes.marginMax}>
          <FormControl variant="outlined" fullWidth autoComplete="true">
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              variant="outlined"
              error={error}
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
            {error ? (
              <FormHelperText error>Invalid email or password</FormHelperText>
            ) : null}
          </FormControl>
        </Box>

        <Box m={1} className={classes.marginMax}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
        <Typography className={classes.marginMax} align="right">
          <Link to="resetenterusername" onClick={handleForgetPassword}>
            Forgot Password?
          </Link>
        </Typography>
      </FormControl>
    </div>
  );
};

export default LoginPage;
