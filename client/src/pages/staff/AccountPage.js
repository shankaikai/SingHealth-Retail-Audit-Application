import React from "react";
import { Avatar, Button, makeStyles, Typography } from "@material-ui/core";
import Navbar from "../../components/common/Navbar";
import { LoginContext } from "../../context/LoginContext";
import { useContext } from "react";
import Axios from "axios";

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
  const { context, setContext } = useContext(LoginContext);

  const handleLogout = () => {
    // TODO: Release session from node
    Axios.post("http://localhost:3001/api/auth/logout", {
      withCredentials: true,
    }).then(() => {
      setContext({});
    });
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar src={context.imageUrl} className={classes.avatar} />
      <Typography variant="h5" className={classes.name}>
        {context.name}
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
