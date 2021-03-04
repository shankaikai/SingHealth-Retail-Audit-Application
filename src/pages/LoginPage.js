import React, { useState } from "react";
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
import { Link, useHistory } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";

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
  let history = useHistory();

  // Create a style object
  const classes = useStyles();

  // States to store username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Function to handle a login request
  const handleLogin = () => {
    console.log("attempt to login");
    // TODO: Add authencation here
    history.push("/tenants");
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.login}>
      <img src={logo} alt="Logo" className={classes.logo}></img>
      <FormControl className={classes.form} autoComplete="true">
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
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
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
            fullWidth="true"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
        <Typography className={classes.marginMax} align="left">
          Dont have an account? <Link to="/register">Register</Link>
        </Typography>
      </FormControl>
    </div>
  );
};

export default LoginPage;
