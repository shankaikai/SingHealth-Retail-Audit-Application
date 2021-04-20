import React, { useContext, useState } from "react";
import {
  Avatar,
  Button,
  makeStyles,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  TextField,
} from "@material-ui/core";
import Navbar from "../../components/common/Navbar";
import { LoginContext } from "../../context/LoginContext";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 56px)",
  },
  avatar: {
    width: "100px",
    height: "100px",
    marginBottom: "30px",
  },
  name: {
    marginBottom: "50px",
  },
  logout: {
    width: "70%",
    marginBottom: "20px",
  },
});

const AccountPage = () => {
  const {
    context,
    setContext,
    setSpinner,
    setSnackbar,
    setSnackbarMessage,
  } = useContext(LoginContext);
  let history = useHistory();

  const [addStaff, setAddStaff] = useState(false);

  const [newStaffEmail, setNewStaffEmail] = useState("");

  const [invalidEmail, setInvalidEmail] = useState(false);

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleLogout = () => {
    setSpinner(true);
    // TODO: Release session from node
    Axios.post("http://localhost:3001/api/auth/logout", {
      withCredentials: true,
    }).then((response) => {
      if (!response.data.login_status) {
        setContext({});
        setSpinner(false);
      }
    });
  };

  const handleEdit = () => {
    history.push(`/editprofile`);
  };

  const handleNewStaff = () => {
    if (validateEmail(newStaffEmail)) {
      setInvalidEmail(false);
      setAddStaff(false);
      setNewStaffEmail("");
      Axios.get(
        `http://localhost:3001/api/auth/newstaff/${newStaffEmail}`
      ).then((response) => {
        if (response.data.message) {
          setSnackbar({ status: false, message: "" });
        }
      });
    } else {
      setInvalidEmail(true);
    }
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Dialog open={addStaff} onClose={() => setAddStaff(false)}>
        <DialogTitle>Create a new staff account?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the email for the new staff.
          </DialogContentText>
          <TextField
            error={invalidEmail}
            helperText={invalidEmail ? "Invalid email" : null}
            autoFocus
            variant="outlined"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            onChange={(e) => setNewStaffEmail(e.target.value)}
            value={newStaffEmail}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddStaff(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleNewStaff} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Avatar src={context.imageUrl} className={classes.avatar} />

      <Typography variant="h5" className={classes.name}>
        {context.name}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleEdit}
        className={classes.logout}
      >
        Edit Profile
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setAddStaff(true)}
        className={classes.logout}
      >
        Add new staff
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogout}
        className={classes.logout}
      >
        Logout
      </Button>
      <Navbar route="account" />
    </div>
  );
};

export default AccountPage;
