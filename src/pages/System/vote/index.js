import React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import CenteredFooter from "layouts/utils/Footers/CenteredFooter";
import firebaseConfig from "layouts/utils/FireBase";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Urn from "./sections/urn";
import Candidates from "./sections/candidates";
import footerRoutes from "footer.routes";

function Vote() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return (
    <>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: 8,
          pt: 12,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Container>
          <Urn db={db} />
          <Candidates db={db} />
        </Container>
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <CenteredFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Vote;
