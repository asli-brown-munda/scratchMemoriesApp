// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Images
import Navbar from "components/NavBar/index";
import RotatingCard from "components/Cards/RotatingCard/index";
import RotatingCardFront from "components/Cards/RotatingCard/RotatingCardFront.js";
import RotatingCardBack from "components/Cards/RotatingCard/RotatingCardBack.js";
import routes from "routes";
import BackgroundParticles from "components/Background/index";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

function Home() {
  const navigate = useNavigate();

  const redirectToUrl = (url) => {
    navigate(url);
  };

  return (
    <>
      <BackgroundParticles />
      <Navbar routes={routes} />

      <MKBox component="header" position="relative">
        <MKBox display="flex" alignItems="center" minHeight="40vh">
          <Grid container justifyContent="center">
            <Grid item xs={12} md={7} lg={6} flexDirection="column">
              <MKTypography
                variant="h1"
                color="white"
                mb={3}
                align="center"
                sx={({ breakpoints, typography: { size } }) => ({
                  [breakpoints.down("md")]: {
                    fontSize: size["3xl"],
                  },
                })}
                pt={20}
              >
                Memories
              </MKTypography>
              <MKTypography
                variant="body1"
                color="white"
                align="center"
                fontSize={25}
              >
                <b>33%</b> cheaper, durable and secure storage for your precious
                data.
              </MKTypography>
              <MKTypography
                variant="body1"
                color="white"
                align="center"
                fontSize={18}
                sx={{ fontStyle: "oblique" }}
              >
                (Built by ex-Engineers of Google, Uber, Amazon & Microsoft.)
              </MKTypography>
              <Grid
                container
                justifyContent="center"
                direction="row"
                spacing={1}
                mt={3}
                alignItems="center"
              >
                <MKButton
                  color="white"
                  onClick={() => redirectToUrl("/sign_in")}
                  size="large"
                >
                  Get Free Storage
                </MKButton>
                <MKButton
                  variant="text"
                  color="white"
                  onClick={() => redirectToUrl("/about_us")}
                  size="large"
                >
                  About us
                </MKButton>
              </Grid>
            </Grid>
          </Grid>
        </MKBox>
        <Grid
          container
          spacing={4}
          flexDirection="row"
          justifyContent="center"
          pt={10}
        >
          <Grid item flexDirection="row" xl={3}>
            <RotatingCard>
              <RotatingCardFront
                icon="security"
                title={<>Security</>}
                description="All Data uploaded is server side encrypted, ensuring no one else can access your data."
              />
              <RotatingCardBack
                title="Details"
                description="No one should have access to your data else than you. Coming Soon: Client Side Encryption."
                action={{
                  type: "internal",
                  route: "/sign_in",
                  label: "Sign In",
                }}
              />
            </RotatingCard>
          </Grid>
          <Grid item flexDirection="row" xl={3}>
            <RotatingCard>
              <RotatingCardFront
                icon="content_copy"
                title={<>Durability</>}
                backgroundColor="info"
                description="All Data uploaded is replicated to get 11 9's of durability, ensuring data is never lost."
              />
              <RotatingCardBack
                title="Details"
                description="Making high numer of copies allows us to retrieve data even with a high fault rate."
                action={{
                  type: "internal",
                  route: "/sign_in",
                  label: "Sign In",
                }}
              />
            </RotatingCard>
          </Grid>

          <Grid item flexDirection="row" xl={3}>
            <RotatingCard>
              <RotatingCardFront
                icon="payments"
                title={<>Huge Savings</>}
                description="Why pay more for precious data that you might not check frequently when you have us?"
              />
              <RotatingCardBack
                title="Details"
                description="It is 33% cheaper to use our offering when compared to what exists in the market."
                action={{
                  type: "internal",
                  route: "/sign_in",
                  label: "Sign In",
                }}
              />
            </RotatingCard>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
}

export default Home;
