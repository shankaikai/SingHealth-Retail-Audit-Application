import React, { useContext } from "react";
import { Avatar, Button, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/common/NavbarTenant";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { LoginContext } from "../../context/LoginContext";

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

const TenantProfilePage = () => {
  let history = useHistory();

  const { context, setContext } = useContext(LoginContext);

  // Function to handle logouts
  const handleLogout = () => {
    // TODO: Release session
    setContext({});
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

export default TenantProfilePage;
