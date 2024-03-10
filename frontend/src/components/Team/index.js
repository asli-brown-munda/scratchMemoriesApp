import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import HorizontalTeamCard from "components/Cards/TeamCards/HorizontalTeamCard/index";

import shubhsha from "assets/images/shubhsha.jpg";
import akshay from "assets/images/akshay.jpeg";

const Team = function () {
  return (
    <Container>
      <Grid container pt={2}>
        <Grid >
          <MKTypography variant="h3" color="white">
            The Team
          </MKTypography>
          <MKTypography color="white">
            We're a passionate team of tech enthusiasts and memory keepers,
            driven by the belief that your memories deserve the best care. We
            understand the value of every photo, video, and document, and we're
            committed to providing you with the tools and peace of mind needed
            to safely store and access them for years to come.
          </MKTypography>
        </Grid>
      </Grid>
      <Grid container spacing={3} pt={5}>
        <Grid item xs={12} lg={6}>
          <MKBox mb={1}>
            <HorizontalTeamCard
              image={shubhsha}
              name="Shubham Sharma"
              position={{ color: "info", label: "Co-Founder" }}
              description="Passionate about developing convenient personal storage solutions. Experienced Engineer who worked at big tech companies: Google, Microsoft & Amazon."
              email="shubham@memoriesmvp.com"
            />
          </MKBox>
        </Grid>
        <Grid item xs={12} lg={6}>
          <MKBox mb={1}>
            <HorizontalTeamCard
              image={akshay}
              name="Akshay Arora"
              position={{ color: "info", label: "Co-Founder" }}
              description="Experienced Software Engineer who has worked at big companies: Uber & Amazon. Keeping a mystry about me."
              email="akshay@memoriesmvp.com"
            />
          </MKBox>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Team;
