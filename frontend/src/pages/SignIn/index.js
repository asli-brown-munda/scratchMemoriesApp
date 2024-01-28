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
import Login from "components/Login/index";

// Material Kit 2 React page layout routes
import routes from "routes";

function SignInBasic() {
  return (
    <>
      <BackgroundParticles />
      <Navbar routes={routes} />
      <Login />
    </>
  );
}

export default SignInBasic;
