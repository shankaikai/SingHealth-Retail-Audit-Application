import React from "react";
import Navbar from "../components/common/Navbar";
import Header from "../components/common/Header";
import TenantList from "../components/common/tenant/TenantList";
import AddIcon from "@material-ui/icons/Add";
import { Fab, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  fab: {
    zIndex: 100,
    position: "fixed",
    bottom: 70,
    right: 20,
  },
});

const TenantsPage = () => {
  let history = useHistory();
  // Function for Add Tenant FAB
  const handleAddTenant = () => {
    history.push("/addtenant");
  };

  const classes = useStyles();

  return (
    <div>
      <Header searchbar title="Tenants" />
      <TenantList />
      <Fab
        color="primary"
        aria-label="Add tenant"
        onClick={handleAddTenant}
        className={classes.fab}
      >
        <AddIcon />
      </Fab>
      <Navbar route="tenants" />
    </div>
  );
};

export default TenantsPage;
