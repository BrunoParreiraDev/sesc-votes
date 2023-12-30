/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Grid, Container } from "@mui/material";
import MKButton from "components/MKButton";
import DefaultCounterCard from "layouts/utils/Cards/CounterCards/DefaultCounterCard";
import { toPng } from "html-to-image";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { MKLineChart } from "../components/MKLineChart";

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
          link.download = "grafico.png";
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
        description="componentes graficos"
      />
    );
  }
  const data = [
    { class: "7 (A)", value: results["7 (A)"].winner ? results["7 (A)"].winner.votes || 0 : 0 },
    { class: "7 (B)", value: results["7 (B)"].winner ? results["7 (B)"].winner.votes || 0 : 0 },
    // Adicione os dados para as outras classes
  ];
  return (
    <>
      <MKButton color="info" variant="gradient" onClick={downloadAsImage} fullWidth>
        Baixar Resultado como Imagem
      </MKButton>
      <Grid container spacing={3} mt={1} ref={gridRef}>
        {Object.entries(results).map(([classInput, result]) => (
          <Grid key={classInput} item xs={12} lg={6}>
            <MKLineChart data={result} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Dashboard;
