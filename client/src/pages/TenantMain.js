import React, { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import { Redirect, Route, BrowserRouter as Router } from "react-router-dom";

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
