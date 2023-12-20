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

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import FilledInfoCard from "layouts/utils/Cards/InfoCards/FilledInfoCard";
import MKTypography from "components/MKTypography";

function Next() {
  return (
    <MKBox component="section" position="relative" py={6} px={{ xs: 2, lg: 0 }} my={3} mx={-2}>
      <Container>
        <Grid container>
          <Grid item xs={12} md={8} sx={{ mb: 6 }}>
            <MKTypography variant="h3" color="dark">
              Proximo
            </MKTypography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <FilledInfoCard
              color="info"
              variant="gradient"
              icon="precision_manufacturing"
              title="Como Votar"
              description="Vamos entender o funciona a votação para lider e vice lider."
              action={{
                type: "internal",
                route: "../docs/vote",
                label: "Saiba Mais",
              }}
            />
          </Grid>
          <Grid item xs={12} my={3}>
            <FilledInfoCard
              color="warning"
              variant="gradient"
              icon="people-alt"
              title="Sobre Nós"
              description="Quem está por trás de todo este sistema? clique em saiba mais e descubra, garanto que vai se surpreender!"
              action={{
                type: "internal",
                route: "../docs/about-us",
                label: "Saiba Mais",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FilledInfoCard
              color="info"
              variant="gradient"
              icon="precision_manufacturing"
              title="Como Organizar a sala"
              description="Vamos entender o Como se Organiza a sala em dia de eleição."
              action={{
                type: "internal",
                route: "../docs/environment",
                label: "Saiba Mais",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Next;
