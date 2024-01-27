import "bootstrap/dist/css/bootstrap.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_OAUTH_CLIENT_ID } from "config/app_config";
import axios from "axios";

import theme from "assets/theme";
import routes from "routes";

axios.defaults.withCredentials = true;

function App() {
  const { pathname } = useLocation();

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
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

  return (
    <ThemeProvider theme={theme}>
      <GoogleOAuthProvider clientId={GOOGLE_OAUTH_CLIENT_ID}>
        <CssBaseline />
        <Routes>
          {getRoutes(routes)}
          <Route path="/" element={<Navigate to="/home" />} />

          {/* <Route path="*" element={<Navigate to="/presentation" />} /> */}
        </Routes>
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
}

export default App;
