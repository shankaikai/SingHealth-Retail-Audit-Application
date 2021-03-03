import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import TenantsPage from "./pages/TenantsPage";
import TenantPage from "./pages/TenantPage";
import LoginPage from "./pages/LoginPage";
import OutstandingPage from "./pages/OutstandingPage";
import AccountPage from "./pages/AccountPage";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";

// Creating a custom theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#F15A22",
    },
  },
});

// Main wrapper class for all other pages
const App = () => {
  const [showBar, setShowBar] = useState(true);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Route
            exact
            path="/"
            render={(props) => <LoginPage setShowBarProps={setShowBar} />}
          />
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/tenants">
            <TenantsPage />
          </Route>
          <Route path="/outstanding">
            <OutstandingPage />
          </Route>
          <Route path="/account">
            <AccountPage />
          </Route>
          <Route exact path="/tenant">
            <TenantPage/>
          </Route>
          <Route path="/test"></Route>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
