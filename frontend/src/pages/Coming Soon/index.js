/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Kit 2 React example components
import Navbar from "components/NavBar/index";
import BackgroundParticles from "components/Background/index";
import MKTypography from "components/MKTypography";

// Material Kit 2 React page layout routes
import routes from "routes";

function ComingSoon() {
  return (
    <>
      <BackgroundParticles />
      <Navbar routes={routes} />
      <MKTypography
        variant="h4"
        color="white"
        component="section"
        position="relative"
        py={6}
        px={{ xs: 2, lg: 0 }}
        mx={-2}
        align="center"
      >
        Thank you for the Sign Up! We will be reaching out to you soon!
      </MKTypography>
    </>
  );
}

export default ComingSoon;
