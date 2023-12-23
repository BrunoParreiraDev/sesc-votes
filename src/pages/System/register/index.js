import React from "react";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import Form from "./section/Form";
import CenteredFooter from "layouts/utils/Footers/CenteredFooter";
import footerRoutes from "footer.routes";
import { app } from "services/FirebaseConfig";

function Register() {
  const db = getFirestore(app);

  const handleBackend = async (data) => {
    try {
      const docRef = doc(db, "candidates", String(data.id));
      await setDoc(docRef, data);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: 8,
          pt: 8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Form
          onSend={(data) => {
            handleBackend(data);
          }}
        />
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <CenteredFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Register;
