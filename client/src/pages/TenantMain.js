import React, { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import { Redirect, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import TenantAuditIssuePage from "./tenant/TenantAuditIssuePage";
import TenantNewMessagePage from "./tenant/TenantNewMessage";
import TenantOutstandingPage from "./tenant/TenantOutstandingPage";
import TenantProfilePage from "./tenant/TenantProfilePage";


export default function TenantMain(props) {
  const { context } = useContext(LoginContext);

  return (
    <div>
      {context.id === null ? (
        <Redirect to="/login" />
      ) : (
        <Switch>
          <Route exact path="/">
            <TenantOutstandingPage/>
          </Route>
          <Route exact path="/account">
            <TenantProfilePage/>
          </Route>
          <Route exact path="/issue/:id">
            <TenantAuditIssuePage/>
          </Route>
          <Route exact path="/newmessage">
            <TenantNewMessagePage/>
          </Route>
        </Switch>
      )}
    </div>
  );
}

