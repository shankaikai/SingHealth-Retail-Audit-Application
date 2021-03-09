import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Header from "../components/common/Header";
import Tabs from "../components/tenantView/tenantViewTab"

const TenantPage = () => {

  var lines = [
    {
      header:"Type",
      text: "F&B"
    },
    {
      header:"Location",
      text: "#01-25"
    },
    {
      header:"Last Audit Date",
      text: "01 August 2020"
    },
    {
      header:"Demerit Points",
      text: "1"
    }
  ]

  const location= useLocation();
  const tenantName = location.state.storeName; 
  console.log(tenantName);
  return (
    <div>
      <Header title={tenantName} avatar= " ../assets/koufu.jpg" details = {lines}/>
      {/* <h1>{tenantName}</h1> */}
      {/* <TenantHeader/> */}
      <Tabs/>
      <Navbar route="tenants"/>
    </div>
  );
};

export default TenantPage;
