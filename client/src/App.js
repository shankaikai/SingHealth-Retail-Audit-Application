import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import TenantMain from "./pages/TenantMain";
import StaffMain from "./pages/StaffMain";
import { LoginContext } from "./context/LoginContext";
import Axios from "axios";
import { useEffect, useState } from "react";

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
  useEffect(() => {
    Axios.get("http://localhost:3001/api/auth/login").then((res) => {
      setTimeout(1000);
      if (res.data.cookie_status) {
        var user = res.data.result;
        setContext({
          id: user.userID,
          type: user.userType,
          name: user.userName,
        });
      }
    });
  }, []);
  return (
    <div className="App">
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <LoginContext.Provider value={{ context, setContext }}>
        <ThemeProvider theme={theme}>
          <Router>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
            <Route exact path="/login">
              {context.id ? <Redirect to="/" /> : <LoginPage />}
            </Route>

            {/* IMPT to put exact path*/}
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
  );
};

export default App;
