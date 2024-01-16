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
import FilledInfoCard from "components/Cards/RotatingCard/index";
import routes from "routes";

function Home() {
  return (
    <>
      <MKBox component="header" position="relative">
        <Navbar routes={routes} />
        <MKBox
          display="flex"
          alignItems="center"
          minHeight="100vh"
          sx={{
            backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) =>
              `${linearGradient(
                rgba(gradients.dark.main, 0.5),
                rgba(gradients.dark.state, 0.5)
              )}, url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
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
              >
                Memories
              </MKTypography>
              <MKTypography
                variant="body1"
                color="white"
                opacity={0.8}
                pr={6}
                mr={6}
              >
                The time is now for it be okay to be great. People in this world
                shun people for being nice.
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
        <FilledInfoCard
          icon="public"
          title="Get Started"
          description="Check the possible ways of working with our product and the necessary files for building your own project."
          action={{
            type: "internal",
            route: "/somewhere",
            label: "Let's start",
          }}
        />{" "}
      </MKBox>
    </>
  );
}

export default Home;
