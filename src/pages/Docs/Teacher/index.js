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

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React layouts/utils
import CenteredFooter from "layouts/utils/Footers/CenteredFooter";

// Teacher page sections
import Class from "pages/Docs/Teacher/sections/Class";
import Next from "pages/Docs/Teacher/sections/Next";

import footerRoutes from "footer.routes";

function Teacher() {
  return (
    <>
      <MKBox
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: 6,
          mb: 4,
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Class />
        <Next />
      </MKBox>
      <MKBox pt={6} px={1} mt={6}>
        <CenteredFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Teacher;
