import React, { useContext, useState } from "react";
import TenantsPage from "./staff/TenantsPage";
import TenantPage from "./staff/TenantPage";
import OutstandingPage from "./staff/OutstandingPage";
import AccountPage from "./staff/AccountPage";
import AddTenantPage from "./staff/AddTenantPage";
import AuditChecklistPage from "./staff/AuditChecklistPage";
import AuditEndPage from "./staff/AuditEndPage";
import { Redirect, Route, BrowserRouter as Router } from "react-router-dom";
import NewMessagePage from "./staff/NewMessagePage";
import AuditIssuePage from "./staff/AuditIssuePage";
import App from "../App";
import { LoginContext } from "../context/LoginContext";

export default function StaffMain(props) {
  const { context } = useContext(LoginContext);
  console.log("StaffMain")
  return (
    <div>
      {/* {context.id === null ? (
        <Redirect to="/login" />
      ) : (
        
      )} */}
      {
        context.showTenants ? (
          <TenantsPage />
        ) : (
          <Router>
        <Route exact path="/outstanding">
          <OutstandingPage />
        </Route>
        <Route exact path="/account">
          <AccountPage />
        </Route>
        <Route exact path="/tenant/:id">
          <TenantPage />
        </Route>
        <Route exact path="/addtenant">
          <AddTenantPage />
        </Route>
        <Route exact path="/auditchecklist">
          <AuditChecklistPage />
        </Route>
        <Route exact path="/auditend">
          <AuditEndPage />
        </Route>
        <Route exact path="/newmessage">
          <NewMessagePage />
        </Route>
        <Route exact path="/issue">
          <AuditIssuePage />
        </Route>
        <Route exact path="/logout">
          <App/>
        </Route>
        <Route exact path="/">
          <TenantsPage />
        </Route>
        
      </Router>
        )
          
        
      }
      
      
    </div>
  );
}
