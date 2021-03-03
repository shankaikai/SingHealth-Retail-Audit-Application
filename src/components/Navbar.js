import { BottomNavigation } from "@material-ui/core";
import React, { useState } from "react";
import { Store, PlaylistAddCheck, AccountCircle } from "@material-ui/icons/";
import { BottomNavigationAction } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  bar: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#F15A22",
  },
  icons: {
    color: "rgba(255, 255, 255, .74)",
    "&.Mui-selected": {
      color: "#FFFFFF",
    },
  },
});

const Navbar = (props) => {
  // Use State
  const [value, setValue] = useState(props.route);
  const classes = useStyles();
  let history = useHistory();

  // Function to handle changing of tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Push the value to the parent container through props
    history.push(`/${newValue}`);
  };

  return (
    <BottomNavigation
      showLabels
      className={classes.bar}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Tenants"
        value="tenants"
        icon={<Store />}
        className={classes.icons}
      />
      <BottomNavigationAction
        label="Outstanding"
        value="outstanding"
        icon={<PlaylistAddCheck />}
        className={classes.icons}
      />
      <BottomNavigationAction
        label="Account"
        value="account"
        icon={<AccountCircle />}
        className={classes.icons}
      />
    </BottomNavigation>
  );
};

export default Navbar;
