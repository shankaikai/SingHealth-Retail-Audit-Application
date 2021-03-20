import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import TenantMain from "./pages/TenantMain";
import StaffMain from "./pages/StaffMain";
import { LoginContext } from "./context/LoginContext";
import { useState } from "react";

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
  const [context, setContext] = useState({
    id: null, // Dummy data
    type: null, // Change to tenant if want to access tenant main
  });

  return (
    <div className="App">
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <LoginContext.Provider value={{ context, setContext }}>
        <ThemeProvider theme={theme}>
          <Router>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
            <Route exact path="/">
              {context.id === null ? (
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
