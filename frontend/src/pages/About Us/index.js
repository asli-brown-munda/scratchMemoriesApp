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
import MKBox from "components/MKBox";
import BackgroundParticles from "components/Background/index";

import Navbar from "components/NavBar/index";
import routes from "routes";
import Team from "components/Team";
function AboutUs() {
  return (
    <>
      <BackgroundParticles />

      <MKBox component="header" position="relative">
        <Navbar routes={routes} />
        <Team />

      </MKBox>
    </>
  );
}

export default AboutUs;
