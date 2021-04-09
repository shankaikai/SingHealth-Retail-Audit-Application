import React, { useContext } from "react";
import { Avatar, Button, makeStyles, Typography } from "@material-ui/core";
import Navbar from "../../components/common/NavbarTenant";
import { LoginContext } from "../../context/LoginContext";
<<<<<<< HEAD
=======
import Axios from "axios";
>>>>>>> 95af014cbdab109377f83ebeb3ef57b022269f06

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
<<<<<<< HEAD
  let history = useHistory();

=======
>>>>>>> 95af014cbdab109377f83ebeb3ef57b022269f06
  const { context, setContext } = useContext(LoginContext);

  // Function to handle logouts
  const handleLogout = () => {
<<<<<<< HEAD
    // TODO: Release session
    setContext({});
=======
    // TODO: Release session from node
    Axios.post("http://localhost:3001/api/auth/logout", {
      withCredentials: true,
    }).then(() => {
      setContext({});
    });
>>>>>>> 95af014cbdab109377f83ebeb3ef57b022269f06
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
