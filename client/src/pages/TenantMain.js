import React, { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
<<<<<<< HEAD
import { Redirect, Route, BrowserRouter as Router } from "react-router-dom";
=======
import { Redirect, Route, BrowserRouter as Router, Switch } from "react-router-dom";
>>>>>>> f3e4b7cd51ce8c7fab8dcb5375f548c3ff5e42d5
import TenantAuditIssuePage from "./tenant/TenantAuditIssuePage";
import TenantNewMessagePage from "./tenant/TenantNewMessage";
import TenantOutstandingPage from "./tenant/TenantOutstandingPage";
import TenantProfilePage from "./tenant/TenantProfilePage";

<<<<<<< HEAD
=======

>>>>>>> f3e4b7cd51ce8c7fab8dcb5375f548c3ff5e42d5

export default function TenantMain(props) {
  const { context } = useContext(LoginContext);

  return (
    <div>
      {context.id === null ? (
        <Redirect to="/login" />
      ) : (
<<<<<<< HEAD
        <Router>
          <Route exact path="/outstanding">
=======
        <Switch>
          <Route exact path="/">
>>>>>>> f3e4b7cd51ce8c7fab8dcb5375f548c3ff5e42d5
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
<<<<<<< HEAD
        </Router>
=======
        </Switch>
>>>>>>> f3e4b7cd51ce8c7fab8dcb5375f548c3ff5e42d5
      )}
    </div>
  );
}

