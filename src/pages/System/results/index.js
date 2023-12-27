import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import CenteredFooter from "layouts/utils/Footers/CenteredFooter";
import Dashboard from "./sections/Dashboard";

function Results() {
  return (
    <>
      <Container>
        <Grid container justifyContent="center" pt={13}>
          <Grid item xs={12}>
            <MKBox
              sx={{
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                textAlign: "center",
              }}
              variant="gradient"
              borderRadius="10px"
              p={10}
              mb={10}
            >
              <h3>Results</h3>
            </MKBox>
          </Grid>
          <Grid item xs={12}>
            <MKBox>
              <Dashboard />
            </MKBox>
          </Grid>
        </Grid>
        <Container>
          <MKBox pt={6} px={1} mt={6}>
            <CenteredFooter />
          </MKBox>
        </Container>
      </Container>
    </>
  );
}

export default Results;
