import React, { useState, useContext } from "react";
import logo from "../assets/Singhealth-logo.png";
import {
  Button,
  TextField,
  Box,
  makeStyles,
  FormControl,
  IconButton,
  Typography,
} from "@material-ui/core";
import { LoginContext } from "../context/LoginContext";
import Axios from "axios";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";

require("dotenv/config");

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
  },
  login: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    marginTop: "90px",
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
  back: {
    position: "fixed",
    top: 10,
    left: 10,
  },
});

const ResetEnterUsernamePage = (props) => {
  // Create a style object
  const classes = useStyles();
  let history = useHistory();
  // States to store username and password
  const [email, setEmail] = useState("");

  const { setSnackbar } = useContext(LoginContext);

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Send email that contains link that redirect to * a new tab * that shows the enterpassword component
  const handleSendResetLink = (e) => {
    if (validateEmail(email)) {
      Axios.post("http://localhost:3001/api/auth/sendemailresetpassword", {
        email,
      })
        .then((res) => {
          setSnackbar({ status: true, message: "Invalid email", noBar: true });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setSnackbar({ status: true, message: "Invalid email", noBar: true });
    }
  };

  return (
    <div className={classes.root}>
      <IconButton onClick={() => history.push("/")} className={classes.back}>
        <ArrowBackIcon />
      </IconButton>
      <div className={classes.login}>
        <img src={logo} alt="Logo" className={classes.logo}></img>
        <Typography variant="h6">Reset Password</Typography>
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
    </div>
  );
};

export default ResetEnterUsernamePage;
