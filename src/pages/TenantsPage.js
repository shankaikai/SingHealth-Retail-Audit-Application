import React from "react";
import Navbar from "../components/Navbar";
import TenantHeader from "../components/TenantHeader";
import TenantList from "../components/TenantList";

const TenantsPage = () => {
  return (
    <div>
      <TenantHeader />
      <TenantList />
      <Navbar />
    </div>
  );
};

export default TenantsPage;
