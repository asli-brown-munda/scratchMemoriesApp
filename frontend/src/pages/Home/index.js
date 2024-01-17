// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Images
import bgImage from "assets/images/bg2.jpg";
import Navbar from "components/NavBar/index";
import RotatingCard from "components/Cards/RotatingCard/index";
import RotatingCardFront from "components/Cards/RotatingCard/RotatingCardFront.js";
import RotatingCardBack from "components/Cards/RotatingCard/RotatingCardBack.js";
import routes from "routes";

function Home() {
  return (
    <>
      <MKBox component="header" position="relative">
        <Navbar routes={routes} />
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
                color="info"
                mb={3}
                sx={({ breakpoints, typography: { size } }) => ({
                  [breakpoints.down("md")]: {
                    fontSize: size["3xl"],
                  },
                })}
              >
                Memories
              </MKTypography>
              <MKTypography
                variant="body1"
                color="info"
                opacity={0.8}
                pr={6}
                mr={6}
              >
                The time is now for it be okay to be great. People in this world
                shun people for being nice.
              </MKTypography>
              <Stack direction="row" spacing={1} mt={3}>
                <MKButton color="info">Get Started</MKButton>
                <MKButton variant="text" color="info">
                  Read more
                </MKButton>
              </Stack>
            </Grid>
          </Container>
        </MKBox>
        <Grid container spacing={8} flexDirection="row" justifyContent="center">
          <Grid  item flexDirection="row" xl={"2"}> 
            <RotatingCard>
              <RotatingCardFront
                image="https://bit.ly/3G5JXJZ"
                icon="touch_app"
                title={
                  <>
                    Feel the
                    <br />
                    Material Kit
                  </>
                }
                description="All the MUI components that you need in a development have been re-design with the new look."
              />
              <RotatingCardBack
                image="https://bit.ly/32ZoTGx"
                title="Discover More"
                description="You will save a lot of time going from prototyping to full-functional code because all elements are implemented."
                action={{
                  type: "internal",
                  route: "/",
                  label: "start with header",
                }}
              />
            </RotatingCard>
          </Grid>

          <Grid  item flexDirection="row" xl={"2"}> 
            <RotatingCard>
              <RotatingCardFront
                image="https://bit.ly/3G5JXJZ"
                icon="touch_app"
                title={
                  <>
                    Feel the
                    <br />
                    Material Kit
                  </>
                }
                description="All the MUI components that you need in a development have been re-design with the new look."
              />
              <RotatingCardBack
                image="https://bit.ly/32ZoTGx"
                title="Discover More"
                description="You will save a lot of time going from prototyping to full-functional code because all elements are implemented."
                action={{
                  type: "internal",
                  route: "/",
                  label: "start with header",
                }}
              />
            </RotatingCard>
          </Grid>

          <Grid  item flexDirection="row" xl={"2"}> 
            <RotatingCard>
              <RotatingCardFront
                image="https://bit.ly/3G5JXJZ"
                icon="touch_app"
                title={
                  <>
                    Feel the
                    <br />
                    Material Kit
                  </>
                }
                description="All the MUI components that you need in a development have been re-design with the new look."
              />
              <RotatingCardBack
                image="https://bit.ly/32ZoTGx"
                title="Discover More"
                description="You will save a lot of time going from prototyping to full-functional code because all elements are implemented."
                action={{
                  type: "internal",
                  route: "/",
                  label: "start with header",
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
