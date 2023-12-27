import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import CenteredFooter from "layouts/utils/Footers/CenteredFooter";

function Results() {
  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <MKBox
            sx={{
              padding: "20px",
              textAlign: "center",
            }}
            bgColor="dark"
            variant="gradient"
            borderRadius="10px"
            p={10}
            mb={10}
          ></MKBox>
        </Grid>
      </Grid>
      <Container>
        <MKBox pt={6} px={1} mt={6}>
          <CenteredFooter />
        </MKBox>
      </Container>
    </Container>
  );
}

export default Results;
