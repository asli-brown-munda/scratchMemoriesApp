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
import bgImage from "assets/images/Down3.jpg";

function Home() {
  return (
    <>
      <MKBox component="header" position="relative">
        <MKBox display="flex" alignItems="center">
          <Navbar routes={routes} />
        </MKBox>
        <MKBox
          display="flex"
          alignItems="center"
          minHeight="40vh"
          sx={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "grid",
            placeItems: "center",
          }}
        >
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
                Guarding your cherished memories in our secure vault, so you can
                relive them anytime without the fear of losing or anyone
                peeking. Safeguarding your treasured memories with our reliable
                long-term storage solutions—because every special moment
                deserves a forever home, worry-free and secure
              </MKTypography>
              <Stack direction="row" spacing={1} mt={3}>
                <MKButton color="white">Get Started</MKButton>
                <MKButton variant="text" color="white">
                  Read more
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
          <Grid item flexDirection="row" xl={"2"}>
            <RotatingCard>
              <RotatingCardFront
                image="https://bit.ly/3G5JXJZ"
                icon="touch_app"
                color="#063846"
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

          <Grid item flexDirection="row" xl={"2"}>
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

          <Grid item flexDirection="row" xl={"2"}>
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
