import React from "react";
import logo from "../assets/Singhealth-logo.png";
import {
  Button,
  TextField,
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

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

  // Set the Navbar to not show using props
  props.setShowBarProps(false);
  let history = useHistory();
  // Function to handle a login request
  const handleLogin = () => {
    console.log("attempt to login");
    // TODO: Add authencation here
    props.setShowBarProps(true);
    history.push("/tenants");
  };

  return (
    <div className={classes.login}>
      <img src={logo} alt="Logo" className={classes.logo}></img>
      <form className={classes.form}>
        <Box m={1} className={classes.marginMax}>
          <TextField
            id="userName"
            label="Username"
            variant="outlined"
            fullWidth="true"
          />
        </Box>
        <Box m={1} className={classes.marginMax}>
          <TextField
            id="passWord"
            label="Password"
            variant="outlined"
            fullWidth="true"
          />
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
      </form>
    </div>
  );
};

export default LoginPage;
