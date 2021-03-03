import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import TenantList from "../components/TenantList";


const TenantPage = () => {
  return (
    <div>
      <Header searchbar title = "Tenants" />
      <TenantList />
      <Navbar route = "tenants"/>
    </div>
  );
};

export default TenantPage;
