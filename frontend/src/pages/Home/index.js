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

function Home() {
  return (
    <>
      <BackgroundParticles />
      <Navbar routes={routes} />

      <MKBox component="header" position="relative">
        <MKBox display="flex" alignItems="center" minHeight="40vh">
          <Container>
            <Grid
              container
              item
              xs={12}
              md={7}
              lg={6}
              flexDirection="column"
              justifyContent="center"
            >
              <MKTypography
                variant="h1"
                color="white"
                mb={3}
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
                pr={6}
                mr={6}
                fontSize={25}
              >
                A cheaper, durable and secure storage for your precious
                data.
              </MKTypography>
              <Stack direction="row" spacing={1} mt={3}>
                <MKButton color="white" href="/sign_in">Login</MKButton>
                <MKButton variant="text" color="white">
                  About us
                </MKButton>
              </Stack>
            </Grid>
          </Container>
        </MKBox>
        <Grid
          container
          spacing={8}
          flexDirection="row"
          justifyContent="center"
          pt={10}
          sx={{
            backgroundColor: "white",
          }}
        >
          <Grid item flexDirection="row" xl={2}>
            <RotatingCard>
              <RotatingCardFront
                icon="security"
                title={<>Security</>}
                description="All Data uploaded is secured at your computer, ensuring no one else can access your data."
              />
              <RotatingCardBack
                title="Details"
                description="No one should have access to your data else than you. For this we use encryption: XXXX."
                action={{
                  type: "internal",
                  route: "/sign_in",
                  label: "Sign In",
                }}
              />
            </RotatingCard>
          </Grid>
          <Grid item flexDirection="row" xl={2}>
            <RotatingCard>
              <RotatingCardFront
                icon="content_copy"
                title={<>Durability</>}
                backgroundColor="info"
                description="All Data uploaded is copied XXXX number of times, so be worry-free about your data."
              />
              <RotatingCardBack
                title="Details"
                description="Making XXXX numer of copies allows us to retrieve data even with a high fault rate."
                action={{
                  type: "internal",
                  route: "/sign_in",
                  label: "Sign In",
                }}
              />
            </RotatingCard>
          </Grid>

          <Grid item flexDirection="row" xl={2}>
            <RotatingCard>
              <RotatingCardFront
                icon="payments"
                title={<>Savings</>}
                description="Why pay more for precious data that you might not check frequently when you have us?"
              />
              <RotatingCardBack
                title="Details"
                description="Stop paying extra for the Precious Data that you visit only once in a while. Pay for what you use."
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
