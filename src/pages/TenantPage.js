import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import TenantHeader from "../components/TenantHeader";
import TenantList from "../components/TenantList";

const TenantPage = () => {
  const location= useLocation();
  const tenantName = location.state.storeName; 
  console.log(tenantName);
  return (
    <div>
      <h1>{tenantName}</h1>
      {/* <TenantHeader/> */}
      <Navbar />
    </div>
  );
};

export default TenantPage;
