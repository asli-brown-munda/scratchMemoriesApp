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
import routes from "routes";

function Pricing() {
  return (
    <>
      <Container>
        <Grid
          container
          item
          xs={12}
          md={7}
          lg={6}
          flexDirection="column"
          justifyContent="center"
        ></Grid>
      </Container>
    </>
  );
}

export default Pricing;
