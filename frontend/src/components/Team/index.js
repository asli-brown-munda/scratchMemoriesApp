import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import HorizontalTeamCard from "components/Cards/TeamCards/HorizontalTeamCard/index";

import shubhsha from "assets/images/shubhsha.jpeg";
import akshay from "assets/images/akshay.jpeg";

const Team = function () {
  return (
      <Container>
        <Grid container pt={2}>
          <Grid item xs={12} md={8} sx={{ mb: 6 }}>
            <MKTypography variant="h3" color="white">
              The Team
            </MKTypography>
            <MKTypography variant="body2" color="white">
              We want to make Cloud Storage accessible to everyone, so you can
              stop worrying about using external drives or expensive
              alternatives!
            </MKTypography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <MKBox mb={1}>
              <HorizontalTeamCard
                image={shubhsha}
                name="Shubham Sharma"
                position={{ color: "info", label: "Co-Founder" }}
                description="Passionate about developing convenient personal storage solutions. Experienced Engineer who worked at big tech companies: Google, Microsoft & Amazon."
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
              />
            </MKBox>
          </Grid>
        </Grid>
      </Container>
  );
};

export default Team;
