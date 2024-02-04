// @mui material components

// Material Kit 2 React components
import BackgroundParticles from "components/Background/index";
import Navbar from "components/NavBar/index";
import routes from "routes";
import FilledInfoCard from "components/Cards/InfoCards/FilledInfoCard";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import plans from "config/plans.json";
import { UserContext } from "context/UserContext";
import { useContext } from "react";
import axios from "axios";
import { BACKEND_URL } from "config/app_config";
import { useNavigate } from 'react-router-dom';

function Pricing() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      <BackgroundParticles />
      <MKBox component="header" position="relative">
        {user == null ? <Navbar routes={routes} /> : null}

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
                action={ActionButton(user, setUser, plan, navigate)}
              />
            </Grid>
          ))}
        </Grid>
      </MKBox>
    </>
  );
}

function DescriptionGenerator(points, price, originalPrice) {
  const priceElement =
    originalPrice > 0 ? (
      <>
        Early Bird Price: <del>{originalPrice}</del> {price}$
      </>
    ) : (
      <>
        <br></br>
      </>
    );
  return (
    <>
      <MKTypography display="block" mb={2} component={"span"}>
        <ul>
          {points.map((point) => (
            <>
              <li>{point}</li>
            </>
          ))}
        </ul>
        {priceElement}
      </MKTypography>
    </>
  );
}

function ActionButton(user, setUser, plan, navigate) {
  const makePurchase = () =>
    axios
      .post(BACKEND_URL + "/purhcase", {
        planCode: plan["code"],
      })
      .then((response) => {
        console.log("Purchase Success: ", response);
        setUser(response.data);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Purchase Error: ", error);
      });
  if (user == null) {
    return (
      <MKButton color="info" href="/sign_in">
        Sign In
      </MKButton>
    );
  } else {

    if (plan["price"] > 0 && user.plan == 'FREE_PLAN') {
      return (
        <MKButton color="info" onClick={makePurchase}>
          Purchase
        </MKButton>
      );
    } else {
      return (
        <MKButton color="info" href="/dashboard">
          Continue to Dashboard
        </MKButton>
      );
    }
  }
}

export default Pricing;
