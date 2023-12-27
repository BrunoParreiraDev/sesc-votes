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
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";

import CenteredFooter from "layouts/utils/Footers/CenteredFooter";

function Charts() {
  return (
    <>
      <Card p={30}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={4}></Grid>
            <Grid item xs={12} lg={4}></Grid>
            <Grid item xs={12} lg={4}></Grid>
          </Grid>
        </Container>
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <CenteredFooter />
      </MKBox>
    </>
  );
}

export default Charts;
