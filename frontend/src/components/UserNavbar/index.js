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

  return (
    <AppBar color="info" position="static">
      <Toolbar>
        <Grid container justifyContent="right">
          <Grid item pr={4} pt={0.75}>
            <MKTypography color="white">
              Storage Usage: {user.storage_used / 1000} GB
            </MKTypography>
          </Grid>
          <Grid item pr={4} pt={0.75}>
            <MKTypography color="white">
              Download Usage: {user.download_used / 1000} GB
            </MKTypography>
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

export default LoggedInUserNavbar;