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
              <MKTypography color="white">
                Memories isn't just another storage solution, it's a digital
                guardian, preserving your precious moments for generations to
                come. We understand the frustration of juggling external drives,
                battling cloud limitations, and worrying about data loss. That's
                why we created Memories, a secure, affordable, and easy-to-use
                platform specifically designed for creative professionals and
                everyday storytellers like you.
              </MKTypography>
              <br></br>
              <MKTypography variant="h3" color="white">
                Why Memories?
              </MKTypography>

              <MKTypography color="white">
                <ol>
                  <li><b>1. Savings</b>: 33% cheaper than other storage solutions. </li>
                  <li>
                    <b>2. Security</b>: Server-side encryption with client-side coming
                    soon.{" "}
                  </li>
                  <li>
                    <b>3. Scalability</b>: Grows with your needs, fits any library.{" "}
                  </li>
                  <li>
                    <b>4. Accessibility</b>: Fast downloads, retrieve files anytime,
                    anywhere.{" "}
                  </li>
                </ol>
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
