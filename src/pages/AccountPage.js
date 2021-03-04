import React from "react";
import { Avatar, Button, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

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
  },
});

const AccountPage = () => {
  let history = useHistory();
  // Function to handle logouts
  const handleLogout = () => {
    // TODO: Release session
    history.push("/");
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar src={<AccountCircleIcon />} className={classes.avatar} />
      <Typography variant="h5" className={classes.name}>
        Staff Name
      </Typography>
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
