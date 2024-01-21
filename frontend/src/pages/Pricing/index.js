// @mui material components

// Material Kit 2 React components
import BackgroundParticles from "components/Background/index";
import Navbar from "components/NavBar/index";
import routes from "routes";
import FilledInfoCard from "components/Cards/InfoCards/FilledInfoCard";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import plans from "config/plans.json";

function Pricing() {
  return (
    <>
      <BackgroundParticles />
      <MKBox component="header" position="relative">
        <Navbar routes={routes} />

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
          {plans.map((plan) => (
            <Grid item flexDirection="row" xl={3}>
              <FilledInfoCard
                icon="person"
                title={plan["title"]}
                description={DescriptionGenerator(
                  plan["description"],
                  plan["price"],
                  plan["original_price"]
                )}
                color="info"
                variant="contained"
                action={{
                  type: "internal",
                  route: "/sign_in",
                  label: "Sign In",
                }}
              />
            </Grid>
          ))}
        </Grid>
      </MKBox>
    </>
  );
}

function DescriptionGenerator(points, price, originalPrice) {
  return (
    <>
      <MKTypography display="block" mb={2}>
        <ul>
          {points.map((point) => (
            <>
              <li>{point}</li>
            </>
          ))}
        </ul>
        Early Bird Price: <del>{originalPrice}</del> {price}$.
      </MKTypography>
    </>
  );
}

export default Pricing;
