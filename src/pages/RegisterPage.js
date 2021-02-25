import { IconButton, makeStyles } from "@material-ui/core";
import React from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useHistory } from "react-router-dom";

const useStyle = makeStyles({
  root: {
    padding: "30px",
  },
});
const RegisterPage = () => {
  const classes = useStyle();
  let history = useHistory();

  // Function to handle back press
  const handleBack = () => {
    history.push("/login");
  };

  return (
    <div className={classes.root}>
      <IconButton aria-label="back" size="medium" onClick={handleBack}>
        <ArrowBackIosIcon fontSize="inherit" />
      </IconButton>
      <h1>Register</h1>
    </div>
  );
};

export default RegisterPage;
