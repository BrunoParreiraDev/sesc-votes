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
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React layouts/utils
import CenteredFooter from "layouts/utils/Footers/CenteredFooter";

// Presentation page sections

import footerRoutes from "footer.routes";

function Presentation() {
  return (
    <>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: 8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Container></Container>
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <CenteredFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Presentation;
