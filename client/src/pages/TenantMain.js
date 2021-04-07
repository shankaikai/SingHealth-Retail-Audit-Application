import React, { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import { Redirect, Route, BrowserRouter as Router } from "react-router-dom";
import TenantAuditIssuePage from "./tenant/TenantAuditIssuePage";
import TenantNewMessagePage from "./tenant/TenantNewMessage";
import Tenant


export default function TenantMain(props) {
  const { context } = useContext(LoginContext);

  return (
    <div>
      {context.id === null ? (
        <Redirect to="/login" />
      ) : (
        <h1>Tenant Main not done</h1>
      )}
    </div>
  );
}
