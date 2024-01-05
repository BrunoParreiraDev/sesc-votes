import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MKButton from "components/MKButton";
import MKBox from "components/MKBox";
import CenteredFooter from "layouts/utils/Footers/CenteredFooter";
import Urn from "./sections/urn";
import Candidates from "./sections/candidates";
import Swal from "sweetalert2";
import { getFirestore, updateDoc, doc, getDoc, getDocs, collection } from "firebase/firestore";

import { app } from "services/FirebaseConfig";

function Vote() {
  const [input, setInput] = useState("");
  const db = getFirestore(app);

  useEffect(() => {
    const fetchClassInfo = async () => {
      if (input) {
        const classesDocRef = doc(db, "classes", input);
        const classesDoc = await getDoc(classesDocRef);

        if (classesDoc.exists()) {
          const finished = classesDoc.data().finished;
          if (finished) {
            Swal.fire("Oops!", `Parece que a eleição do ${input} já foi finalizada.`);
            setInput("");
          }
        } else {
          console.warn("No such document!");
        }
      }
    };

    fetchClassInfo();
  }, [input, db]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleFinish = async () => {
    try {
      const classesDocRef = doc(db, "classes", input);
      const classesDoc = await getDoc(classesDocRef);

      if (classesDoc.exists()) {
        const finished = classesDoc.data().finished;

        if (!finished) {
          const querySnapshot = await getDocs(collection(db, "candidates"));
          const candidatesData = querySnapshot.docs
            .filter((doc) => doc.data().class === input)
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

          const sortedCandidates = candidatesData.sort((a, b) => b.votes - a.votes);
          const winner = sortedCandidates[0];
          const runnerUp = sortedCandidates[1];

          await updateDoc(classesDocRef, {
            finished: true,
            id_winner: winner.id,
            id_runnerUp: runnerUp.id,
          });

          Swal.fire({
            title: "Resultados da Eleição",
            html: `
              <p>Vencedor: ${winner.name} com ${winner.votes} votos</p>
              <p>Vice-líder: ${runnerUp.name} com ${runnerUp.votes} votos</p>
            `,
            icon: "success",
            showConfirmButton: true,
          }).then(() => {
            document.location = "/";
          });
        } else {
          Swal.fire("Oops!", `Parece que a eleição do ${input} já foi finalizada.`);
        }
      } else {
        console.warn("No such document!");
      }
    } catch (error) {
      console.error("Error finishing the election:", error);
    }
  };

  return (
    <>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: 8,
          pt: 13,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Container>
          <Grid container justifyContent="center" mb={3}>
            <Grid item xs={12} lg={12}>
              <MKBox>
                <select
                  id="class"
                  value={input}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ced4da",
                    borderRadius: "4px",
                  }}
                  required
                >
                  <option value="" disabled>
                    Selecione a Turma
                  </option>
                  <option value="7 (A)">7 (A)</option>
                  <option value="7 (B)">7 (B)</option>
                  <option value="8 (A)">8 (A)</option>
                  <option value="8 (B)">8 (B)</option>
                  <option value="9 (A)">9 (A)</option>
                  <option value="9 (B)">9 (B)</option>
                </select>
              </MKBox>
            </Grid>
          </Grid>
          <Grid item mb={3}>
            <MKButton variant="gradient" fullWidth color="info" onClick={handleFinish}>
              Finalizar
            </MKButton>
          </Grid>
          <Urn class={input} />
          <Candidates class={input} />
        </Container>
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <CenteredFooter />
      </MKBox>
    </>
  );
}

export default Vote;
