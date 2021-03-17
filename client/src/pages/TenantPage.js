import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Header from "../components/common/Header";
import Tabs from "../components/tenantView/tenantViewTab"
import { makeStyles } from "@material-ui/core";
import HeaderViewTenant from "../components/tenantView/HeaderViewTenant"
import HeaderDetails from "../components/common/HeaderDetails"

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  headers: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
  },
});

const TenantPage = () => {
  const classes = useStyles();
  const location = useLocation();
  const tenantName = location.state.storeName;

  return (
    <div className={classes.root}>
      <Header title={tenantName} avatar=" ../assets/koufu.jpg" noDivider />
      <HeaderViewTenant />
      <Tabs />
      <Navbar route="tenants" />
    </div>
  );
};

export default TenantPage;
