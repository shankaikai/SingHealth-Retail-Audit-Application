import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import TenantMain from "./pages/TenantMain";
import StaffMain from "./pages/StaffMain";
import { LoginContext } from "./context/LoginContext";
import Axios from "axios";
import { useEffect, useState, useMemo } from "react";
import LoadingOverlay from "react-loading-overlay";
import ResetEnterUsernamePage from "./pages/ResetEnterUsernamePage";
import ResetEnterNewPasswordPage from "./pages/ResetEnterNewPasswordPage";

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
  // Create states to store context variables
  const [context, setContext] = useState({});
  const [spinner, setSpinner] = useState(false);

  const providerValue = useMemo(
    () => ({ context, setContext, spinner, setSpinner }),
    [context, setContext, spinner, setSpinner]
  );

  useEffect(() => {
    Axios.get("http://localhost:3001/api/auth/login", {
      withCredentials: true,
    }).then((response) => {
      if (response.data.login_status) {
        setContext(response.data.user);
      }
    });
  }, []);

  return (
    <LoadingOverlay active={spinner} spinner styles={{ zIndex: 100000 }}>
      <div className="App">
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <LoginContext.Provider value={providerValue}>
          <ThemeProvider theme={theme}>
            <Router>
              <Route exact path="/login">
                {context.id ? <Redirect to="/" /> : <LoginPage />}
              </Route>
              <Route exact path="/register">
                <RegisterPage />
              </Route>
              <Route exact path="/resetenterusername">
                <ResetEnterUsernamePage />
              </Route>
              <Route exact path="/resetenternewpassword">
                <ResetEnterNewPasswordPage />
              </Route>
              <Route path="/">
                {!context.id ? (
                  <Redirect to="/login" />
                ) : context.type === "staff" ? (
                  <StaffMain />
                ) : (
                  <TenantMain />
                )}
              </Route>
            </Router>
          </ThemeProvider>
        </LoginContext.Provider>
      </div>
    </LoadingOverlay>
  );
};

export default App;
