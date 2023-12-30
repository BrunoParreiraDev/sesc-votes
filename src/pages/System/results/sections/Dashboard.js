import React, { useState, useEffect, useRef } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import MKBox from "components/MKBox";
import DefaultCounterCard from "layouts/utils/Cards/CounterCards/DefaultCounterCard";
import { toPng } from "html-to-image";

import { app } from "services/FirebaseConfig";

function Dashboard() {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const gridRef = useRef(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const db = getFirestore(app);
        const classes = ["7 (A)", "7 (B)", "8 (A)", "8 (B)", "9 (A)", "9 (B)"];
        let allResults = {};

        let winner;
        let runnerUp;

        for (const classInput of classes) {
          const classesDocRef = doc(db, "classes", classInput);
          const classesDoc = await getDoc(classesDocRef);

          if (classesDoc.exists()) {
            const data = classesDoc.data();
            let resultData = { teacher: data.teacher, finished: data.finished };

            if (data.finished) {
              try {
                const winnerDocRef = doc(db, "candidates", String(data.id_winner));
                const winnerDocSnapshot = await getDoc(winnerDocRef);

                if (winnerDocSnapshot.exists()) {
                  winner = winnerDocSnapshot.data();
                  console.log("Dados do Vencedor:", winner);
                } else {
                  console.log("Nenhum documento encontrado para o ID do Vencedor:", data.id_winner);
                }
              } catch (error) {
                console.error("Erro ao buscar documentos:", error);
              }
              try {
                const runnerUpDocRef = doc(db, "candidates", String(data.id_runnerUp));
                const runnerUpDocSnapshot = await getDoc(runnerUpDocRef);

                if (runnerUpDocSnapshot.exists()) {
                  runnerUp = runnerUpDocSnapshot.data();
                  console.log("Dados do Vice-Vencedor:", runnerUp);
                } else {
                  console.log(
                    "Nenhum documento encontrado para o ID do Vice-Vencedor:",
                    data.id_winner
                  );
                }
              } catch (error) {
                console.error("Erro ao buscar documentos2:", error);
              }

              resultData = {
                ...resultData,
                winner: winner
                  ? { name: winner.name || "", votes: winner.votes || 0, image: winner.image || "" }
                  : null,
                runnerUp: runnerUp
                  ? { name: runnerUp.name || "", votes: runnerUp.votes || 0 }
                  : null,
              };
            }

            allResults[classInput] = resultData;
          } else {
            console.warn(`No such document for class ${classInput}!`);
          }
        }

        setResults(allResults);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching results: ", error);
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const downloadAsImage = () => {
    if (gridRef && gridRef.current) {
      toPng(gridRef.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "resultado.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error("Erro ao gerar a imagem:", error);
        });
    }
  };

  if (loading) {
    return (
      <DefaultCounterCard
        count={100}
        time={20}
        suffix="%"
        title="Carregando..."
        description="candidatos"
      />
    );
  }
  console.table(results);
  return (
    <>
      <MKButton color="info" variant="gradient" onClick={downloadAsImage} fullWidth>
        Baixar Resultado como Imagem
      </MKButton>
      <Grid container spacing={3} mt={1} ref={gridRef}>
        {Object.entries(results).map(([classInput, result]) => (
          <Grid key={classInput} item xs={12}>
            <Grid container spacing={2}>
              {/* Card do vencedor */}
              <Grid item xs={12} lg={6}>
                <MKBox
                  variant="gradient"
                  borderRadius="10px"
                  bgColor="dark"
                  p={10}
                  sx={{
                    margin: "0 auto 20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Container>
                    <Grid container spacing={2}>
                      <Grid item xs={12} lg={9}>
                        <MKTypography color="light" variant="h4">
                          Líder: {classInput}
                        </MKTypography>
                        <MKTypography color="light" variant="subtitle1">
                          Nome: {result.winner ? result.winner.name || "N/A" : "N/A"}
                        </MKTypography>
                        <MKTypography color="light" variant="subtitle1">
                          Votos: {result.winner ? result.winner.votes || "N/A" : "N/A"}
                        </MKTypography>
                      </Grid>
                      <Grid item xs={12} lg={3}>
                        <Avatar
                          id="preview-avatar"
                          sx={{ width: 120, height: 120, margin: "0 auto 20px", cursor: "pointer" }}
                          alt="Candidate Photo"
                          src={result.winner ? result.winner.image || "" : ""}
                        />
                      </Grid>
                    </Grid>
                  </Container>
                </MKBox>
              </Grid>

              {/* Card do vice-líder */}
              <Grid item xs={12} lg={6}>
                <MKBox
                  variant="gradient"
                  borderRadius="10px"
                  bgColor="secondary"
                  p={10}
                  sx={{
                    margin: "0 auto 20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Container>
                    <Grid container spacing={2}>
                      <Grid item xs={12} lg={9}>
                        <MKTypography color="light" variant="h4">
                          Vice-líder: {classInput}
                        </MKTypography>
                        <MKTypography color="light" variant="subtitle1">
                          Nome: {result.runnerUp ? result.runnerUp.name || "N/A" : "N/A"}
                        </MKTypography>
                        <MKTypography color="light" variant="subtitle1">
                          Votos: {result.runnerUp ? result.runnerUp.votes || "N/A" : "N/A"}
                        </MKTypography>
                      </Grid>
                      <Grid item xs={12} lg={3}>
                        <Avatar
                          id="preview-avatar"
                          sx={{ width: 120, height: 120, margin: "0 auto 20px", cursor: "pointer" }}
                          alt="Candidate Photo"
                          src={result.runnerUp ? result.runnerUp.image || "" : ""}
                        />
                      </Grid>
                    </Grid>
                  </Container>
                </MKBox>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Dashboard;
