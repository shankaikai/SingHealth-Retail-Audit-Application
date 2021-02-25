import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const AccountPage = () => {
  let history = useHistory();
  // Function to handle logouts
  const handleLogout = () => {
    history.push("/login");
  };
  return (
    <div>
      <h1>AccountPage</h1>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default AccountPage;
