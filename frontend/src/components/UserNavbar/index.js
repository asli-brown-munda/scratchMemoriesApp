import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Grid } from "@mui/material";
import { UserContext } from "context/UserContext";
import { useContext } from "react";
import MKAvatar from "components/MKAvatar";
import MKButton from "components/MKButton";
import axios from "axios";
import { BACKEND_URL } from "config/app_config";
import { useNavigate } from "react-router-dom";
import MKTypography from "components/MKTypography";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LoggedInUserNavbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const logoutUser = () => {
    axios
      .post(BACKEND_URL + "/logout", {})
      .then((response) => {
        console.log("Logout Success: ", response.data);
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout Error: ", error);
        setUser(null);
        navigate("/");
      });
  };
  const sendFeedback = () => {
    window.location.href = "mailto:shubham@memoriesmvp.com";
  };

  return (
    <AppBar color="info" position="static">
      <Toolbar>
        <Grid container justifyContent="right">
          <Grid item pt={0.85} pr={1} xs>
            <Grid container direction="row-reverse" justifyContent="left">
              <Grid item>
                <MKTypography color="white" variant="h4">Memories ♥</MKTypography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item pt={0.75} pr={1}>
            <MKTypography color="white">Storage Usage:</MKTypography>
          </Grid>
          <Grid item pr={4} pt={0.5}>
            <CircularProgressWithLabel value={user.storage_used / 100000000} />
          </Grid>

          <Grid item pt={0.75} pr={1}>
            <MKTypography color="white">Download Usage:</MKTypography>
          </Grid>
          <Grid item pr={4} pt={0.5}>
            <CircularProgressWithLabel value={user.download_used / 200000000} />
          </Grid>
          <Grid item pr={2} pt={0.75}>
            <MKButton
              sx={{ color: "#1a73e8" }}
              onClick={sendFeedback}
              size="small"
            >
              Send Feedback
            </MKButton>
          </Grid>
          <Grid item pr={2} pt={0.75}>
            <MKButton
              sx={{ color: "#1a73e8" }}
              onClick={logoutUser}
              size="small"
            >
              Logout
            </MKButton>
          </Grid>
          <Grid item>
            <Tooltip title={user.name}>
              <IconButton sx={{ p: 0 }}>
                <MKAvatar
                  src={user.picture_url}
                  alt={user.name}
                  variant="circular"
                  size="md"
                />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        color="inherit" // Set the color to inherit
        sx={{
          color: "white",
        }}
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="button" component="div" color="white">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default LoggedInUserNavbar;
