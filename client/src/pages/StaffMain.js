import React, { useEffect } from "react";
import TenantsPage from "./staff/TenantsPage";
import TenantPage from "./staff/TenantPage";
import OutstandingPage from "./staff/OutstandingPage";
import AccountPage from "./staff/AccountPage";
import AddTenantPage from "./staff/AddTenantPage";
import AuditChecklistPage from "./staff/AuditChecklistPage";
import AuditEndPage from "./staff/AuditEndPage";
import EditTenantPage from "./staff/EditTenantPage";
import { useHistory, Route, BrowserRouter as Router } from "react-router-dom";
import AddIssuePage from "./staff/AddIssuePage";
import NewMessagePage from "./staff/NewMessagePage";
import AuditIssuePage from "./staff/AuditIssuePage";

export default function StaffMain() {
  return (
    <div>
      <Router>
        <Route exact path="/">
          <TenantsPage />
        </Route>
        <Route exact path="/outstanding">
          <OutstandingPage />
        </Route>
        <Route exact path="/account">
          <AccountPage />
        </Route>
        <Route exact path="/tenant">
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
        <Route exact path="/addissue">
          <AddIssuePage />
        </Route>
        <Route exact path="/newmessage">
          <NewMessagePage />
        </Route>
        <Route exact path="/issue">
          <AuditIssuePage />
        </Route>
      </Router>
    </div>
  );
}
