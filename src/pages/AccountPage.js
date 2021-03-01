import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";

const AccountPage = () => {
  let history = useHistory();
  // Function to handle logouts
  const handleLogout = () => {
    // TODO: Release session
    history.push("/");
  };
  return (
    <div>
      <h1>AccountPage</h1>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
      <Navbar />
    </div>
  );
};

export default AccountPage;
