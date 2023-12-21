import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import Form from "./section/Form";
import CenteredFooter from "layouts/utils/Footers/CenteredFooter";
import footerRoutes from "footer.routes";
import firebaseConfig from "layouts/utils/FireBase";

function Register() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  async function handleBackend(data) {
    try {
      const docRef = await addDoc(collection(db, "candidates"), data);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

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
        <Form onSend={handleBackend} />
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <CenteredFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Register;
