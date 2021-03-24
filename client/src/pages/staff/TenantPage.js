import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Header from "../../components/common/Header";
import Tabs from "../../components/tenantView/tenantViewTab";
import { makeStyles } from "@material-ui/core";
import HeaderViewTenant from "../../components/tenantView/HeaderViewTenant";

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
  // const tenantName = location.state.storeName;
  let {id} = useParams();
  
  // add axios function to get the tenant details using the id

  return (
    <div className={classes.root}>
      <Header title={id} avatar=" ../assets/koufu.jpg" noDivider /> {/*change title to tenantName later */}
      <HeaderViewTenant />
      <Tabs />
      <Navbar route="tenants" />
    </div>
  );
};

export default TenantPage;
