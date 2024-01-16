import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

const Navbar = function ({ routes }) {
  return (
    <>
      <MKBox component="nav" position="absolute" top="0.5rem" width="100%">
        <Container>
          <Grid container flexDirection="row" alignItems="center">
            <MKTypography
              component={Link}
              href="#"
              variant="button"
              color="white"
              fontWeight="regular"
              py={0.8125}
              mr={2}
            >
              <Icon size ={"large"}>home</Icon> Memories
            </MKTypography>
            <MKButton
              variant="outlined"
              color="white"
              sx={{ display: { xs: "block", lg: "none" }, ml: "auto" }}
            >
              <MKBox component="i" color="white" className="fas fa-bars" />
            </MKButton>
            <MKBox
              component="ul"
              display={{ xs: "none", lg: "flex" }}
              p={0}
              my={0}
              mx="auto"
              sx={{ listStyle: "none" }}
            >
              {routes.map((route) => {
                if (route.showOnHomeScreen !== false) {
                  return  <>
                    <MKBox component="li">
                      <MKTypography
                        component={Link}
                        href={route.route}
                        variant="button"
                        color="white"
                        fontWeight="regular"
                        p={1}
                        
                      >
                        {route.name}
                      </MKTypography>
                    </MKBox>
                  </>;
                } else {
                  return <></>;
                }
              })}
            </MKBox>
            <MKBox
              component="ul"
              display={{ xs: "none", lg: "flex" }}
              p={0}
              m={0}
              sx={{ listStyle: "none" }}
            >
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="#"
                  variant="button"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  <MKBox
                    component="i"
                    color="white"
                    className="fab fa-twitter"
                  />
                </MKTypography>
              </MKBox>
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="#"
                  variant="button"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  <MKBox
                    component="i"
                    color="white"
                    className="fab fa-facebook"
                  />
                </MKTypography>
              </MKBox>
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="#"
                  variant="button"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  <MKBox
                    component="i"
                    color="white"
                    className="fab fa-instagram"
                  />
                </MKTypography>
              </MKBox>
            </MKBox>
          </Grid>
        </Container>
      </MKBox>
    </>
  );
};

export default Navbar;
