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
import { Link, useHistory } from "react-router-dom";
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

const ResetEnterUsernamePage = (props) => {
  let history = useHistory();

  // Create a style object
  const classes = useStyles();

  // States to store username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Grab setContext from LoginContext
  const { setContext } = useContext(LoginContext);

  // Function to handle a login request
  const INVALID_USERNAME = "Username does not exist!"; // check on login && register
  const INVALID_PASSWORD = "Incorrect password!"; // check on valid username

  // Send email that contains link that redirect to * a new tab * that shows the enterpassword component
  const handleSendResetLink = (e) => {
    Axios.post("http://localhost:3001/api/auth/sendemailresetpassword", { email })
      .then((res) => {
        alert("PLEASE_CHECK_YOUR_EMAIL");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.login}>
      <img src={logo} alt="Logo" className={classes.logo}></img>
      <FormControl className={classes.form} autoComplete="true">
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
          <Button
            variant="contained"
            color="primary"
            fullWidth="true"
            onClick={handleSendResetLink}
          >
            Send reset link
          </Button>
        </Box>
      </FormControl>
    </div>
  );
};

export default ResetEnterUsernamePage;
