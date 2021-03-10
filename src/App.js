import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import TenantsPage from "./pages/TenantsPage";
import TenantPage from "./pages/TenantPage";
import LoginPage from "./pages/LoginPage";
import OutstandingPage from "./pages/OutstandingPage";
import AccountPage from "./pages/AccountPage";
import AddTenantPage from "./pages/AddTenantPage";
import AuditChecklistPage from "./pages/AuditChecklistPage";
import AuditEndPage from "./pages/AuditEndPage";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Route, BrowserRouter as Router } from "react-router-dom";

// Creating a custom theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#F15A22",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
});

// Main wrapper class for all other pages
const App = () => {
  return (
    <div className="App">
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <ThemeProvider theme={theme}>
        <Router>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/tenants">
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
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
