import React, { useContext } from "react";
import TenantsPage from "./staff/TenantsPage";
import TenantPage from "./staff/TenantPage";
import OutstandingPage from "./staff/OutstandingPage";
import AccountPage from "./staff/AccountPage";
import AddTenantPage from "./staff/AddTenantPage";
import AuditChecklistPage from "./staff/AuditChecklistPage";
import AuditEndPage from "./staff/AuditEndPage";
import { Redirect, Route, Switch } from "react-router-dom";
import NewMessagePage from "./staff/NewMessagePage";
import AuditIssuePage from "./staff/AuditIssuePage";
import { LoginContext } from "../context/LoginContext";
import EditTenantPage from "./staff/EditTenantPage";
import EditProfilePage from "./staff/EditProfilePage";

export default function StaffMain() {
  const { context } = useContext(LoginContext);
  return (
    <div>
      {!context.id ? (
        <Redirect to="/login" />
      ) : (
        <Switch>
          <Route exact path="/">
            <TenantsPage />
          </Route>
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
          <Route exact path="/auditchecklist/:type/:tenantID/:onGoingAuditID?">
            <AuditChecklistPage />
          </Route>
          <Route exact path="/auditend/:tenantID/:auditID">
            <AuditEndPage />
          </Route>
          <Route exact path="/newmessage/:issueid">
            <NewMessagePage />
          </Route>
          <Route exact path="/issue/:id">
            <AuditIssuePage />
          </Route>
          <Route exact path="/edittenant/:id">
            <EditTenantPage />
          </Route>
          <Route exact path="/editprofile">
            <EditProfilePage />
          </Route>
        </Switch>
      )}
    </div>
  );
}
