import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Avatar from "@mui/material/Avatar";
import { app } from "services/FirebaseConfig";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import MKTypography from "components/MKTypography";
import MKBox from "components/MKBox";
import DefaultCounterCard from "layouts/utils/Cards/CounterCards/DefaultCounterCard";

function Dashboard() {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const db = getFirestore(app);
        const classes = ["7 (A)", "7 (B)", "8 (A)", "8 (B)", "9 (A)", "9 (B)"];
        let allResults = {};

        for (const classInput of classes) {
          console.log("class input:", classInput);
          const classesDocRef = doc(db, "classes", classInput);
          const classesDoc = await getDoc(classesDocRef);

          if (classesDoc.exists()) {
            const data = classesDoc.data();
            let resultData = { teacher: data.teacher, finished: data.finished };

            if (data.finished) {
              const winnerDocRef = doc(db, "candidates", data.id_winner);
              const winnerDoc = await getDoc(winnerDocRef);

              const runnerUpDocRef = doc(db, "candidates", data.id_runnerUp);
              const runnerUpDoc = await getDoc(runnerUpDocRef);

              const winner = winnerDoc.exists ? winnerDoc.data() : null;
              const runnerUp = runnerUpDoc.exists ? runnerUpDoc.data() : null;

              resultData = {
                ...resultData,
                winner: winner
                  ? { name: winner.name, votes: winner.votes, image: winner.image }
                  : null,
                runnerUp: runnerUp ? { name: runnerUp.name, votes: runnerUp.votes } : null,
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

  if (loading) {
    return (
      <DefaultCounterCard
        count={100}
        time={10}
        suffix="%"
        title="Carregando..."
        description="candidatos"
      />
    );
  }

  return (
    <Grid container spacing={3}>
      {Object.entries(results).map(([classInput, result]) => (
        <Grid key={classInput} item xs={12} lg={6}>
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
                    Turma: {classInput}
                  </MKTypography>
                  <MKTypography color="light" variant="subtitle1">
                    Vencedor:{" "}
                    {result.winner ? `${result.winner.name} - ${result.winner.votes} votos` : "N/A"}
                  </MKTypography>
                  <MKTypography color="light" variant="subtitle1">
                    Vice-líder:{" "}
                    {result.runnerUp
                      ? `${result.runnerUp.name} - ${result.runnerUp.votes} votos`
                      : "N/A"}
                  </MKTypography>
                </Grid>
                <Grid item xs={12} lg={3}>
                  <Avatar
                    id="preview-avatar"
                    sx={{ width: 120, height: 120, margin: "0 auto 20px", cursor: "pointer" }}
                    alt="Candidate Photo"
                    src={result.winner ? result.winner.image : ""}
                  />
                </Grid>
              </Grid>
            </Container>
          </MKBox>
        </Grid>
      ))}
    </Grid>
  );
}

export default Dashboard;
