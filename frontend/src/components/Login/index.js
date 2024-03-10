// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import axios from "axios";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import { useContext } from "react";

import { GoogleLogin } from "@react-oauth/google";
import { BACKEND_URL } from "config/app_config";
import { UserContext } from "context/UserContext";

import { useNavigate } from "react-router-dom";

const Login = function () {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  // TODO: Update the login behavior.
  const google_login = (response) =>
    axios
      .post(BACKEND_URL + "/login/google", {
        token: response["credential"],
      })
      .then((response) => {
        console.log("Logged In User: ", response);
        setUser(response.data);
        navigate("/pricing");
      });
  return (
    <MKBox
      px={1}
      width="100%"
      height="100vh"
      mx="auto"
      position="relative"
      zIndex={2}
    >
      <Grid
        container
        spacing={1}
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
          <Card>
            <MKBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              mx={2}
              mt={-3}
              p={2}
              mb={1}
              textAlign="center"
            >
              <MKTypography
                variant="h4"
                fontWeight="medium"
                color="white"
                mt={1}
              >
                Magic is one click away!
              </MKTypography>
            </MKBox>
            <MKBox pb={3} px={3} sx={{ justifyContent: "center" }}>
              <Grid
                container
                spacing={1}
                flexDirection="column"
                alignContent="center"
              >
                <Grid item md={8}>
                  <GoogleLogin
                    onSuccess={google_login}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </Grid>
              </Grid>
            </MKBox>
          </Card>
        </Grid>
      </Grid>
    </MKBox>
  );
};

export default Login;
