import "bootstrap/dist/css/bootstrap.css";
import { ThemeProvider } from "@mui/material/styles";
import { PrimeReactProvider } from "primereact/api";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_OAUTH_CLIENT_ID } from "config/app_config";
import axios from "axios";

import { UserContext } from "context/UserContext";
import theme from "assets/theme";
import routes from "routes";
import { BACKEND_URL } from "config/app_config";
import Tailwind from "primereact/passthrough/tailwind";

axios.defaults.withCredentials = true;

function App() {
  const initialState = JSON.parse(localStorage.getItem("user")) || null;
  const [user, setUser] = useState(initialState);
  PerformUserManagement(user, setUser);

  const getRoutes = (allRoutes) => {
    var routeToBeAdded = [];
    if (user && user.has_interest_in_premium_plans) {
      routeToBeAdded = (
        <Route exact path="/" element={<Navigate to="/dashboard" />} />
      );
    } else if (user != null) {
      routeToBeAdded = (
        <Route exact path="/" element={<Navigate to="/pricing" />} />
      );
    } else {
      routeToBeAdded = <Route path="/" element={<Navigate to="/home" />} />;
    }
    const otherRoutes = allRoutes.map((route) => {
      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        );
      }
      return null;
    });
    return [routeToBeAdded, ...otherRoutes];
  };

  return (
    <ThemeProvider theme={theme}>
      <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
        <GoogleOAuthProvider clientId={GOOGLE_OAUTH_CLIENT_ID}>
          <UserContext.Provider value={{ user, setUser }}>
            <CssBaseline />
            <Routes>{getRoutes(routes)}</Routes>
          </UserContext.Provider>
        </GoogleOAuthProvider>
      </PrimeReactProvider>
    </ThemeProvider>
  );
}

function PerformUserManagement(user, setUser) {
  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    console.log("App set the following User", user);
  }, [user]);
  useEffect(() => {
    // Check session validity using your authentication mechanism
    axios
      .post(BACKEND_URL + "/protected_area")
      .then((response) => {
        console.log("Session Still exists for the user", response.data);
        if (response.data !== user) {
          setUser(response.data);
        }
      })
      .catch((error) => {
        localStorage.removeItem("user");
        setUser(null);
        console.log("");
      });
  }, []);
}

export default App;
