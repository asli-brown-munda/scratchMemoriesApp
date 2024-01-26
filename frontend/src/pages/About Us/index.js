/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import BackgroundParticles from "components/Background/index";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

import Navbar from "components/NavBar/index";
import routes from "routes";
import Team from "components/Team";

function AboutUs() {
  return (
    <>
      <BackgroundParticles />
      <Navbar routes={routes} />

      <MKBox
        component="section"
        position="relative"
        py={6}
        px={{ xs: 2, lg: 0 }}
        mx={-2}
      >
        <Container>
          <Grid
            container
            spacing={8}
            flexDirection="row"
            pb={2}
            sx={{
              backgroundColor: "white",
            }}
          >
            <Grid item flexDirection="row">
              <MKTypography variant="h3" color="white">
                Memories
              </MKTypography>

              <MKTypography variant="body2" color="white">
                We want to make Cloud Storage accessible to everyone, so you can
                stop worrying about using external drives or expensive
                alternatives!
              </MKTypography>
            </Grid>
          </Grid>
        </Container>
        <Team />
      </MKBox>
    </>
  );
}

export default AboutUs;
