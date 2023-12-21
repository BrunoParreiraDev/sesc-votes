import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc, doc, getDoc, getDocs, collection } from "firebase/firestore";
import firebaseConfig from "layouts/utils/FireBase";
import MKButton from "components/MKButton";
import MKBox from "components/MKBox";

function Urn() {
  const [inputValue, setInputValue] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [confirmedCandidate, setConfirmedCandidate] = useState(null);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    async function fetchCandidates() {
      try {
        const querySnapshot = await getDocs(collection(db, "candidates"));
        const candidates = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCandidates(candidates);
      } catch (error) {
        console.error("Error fetching candidates: ", error);
      }
    }
    fetchCandidates();
  }, []);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const handleNumberClick = (number) => {
    setInputValue(inputValue + number);
  };

  const handleVote = async () => {
    if (!selectedCandidate) return;
    console.log(selectedCandidate);
    const candidateDocRef = doc(db, "candidates", selectedCandidate.id);
    const candidateDoc = await getDoc(candidateDocRef);

    if (candidateDoc.exists()) {
      const currentVotes = candidateDoc.data().votes || 0;
      await updateDoc(candidateDocRef, { votes: currentVotes + 1 });
      console.log("Voto registrado com sucesso!");
    } else {
      console.error("Candidato não encontrado!");
    }
  };

  const handleCorrection = () => {
    setInputValue("");
    setSelectedCandidate(null);
    setConfirmedCandidate(null);
  };

  const handleBlankVote = () => {
    setConfirmedCandidate("Voto em Branco, confirmar?");
  };

  const handleConfirmVote = async () => {
    if (
      confirmedCandidate === "Voto Nulo, confirmar?" ||
      confirmedCandidate === "Voto em Branco, confirmar?"
    ) {
      setConfirmedCandidate(null);
      return;
    }

    const candidate = candidates.find((c) => c.id === inputValue);
    if (candidate) {
      setSelectedCandidate(candidate);
    } else {
      setConfirmedCandidate("Voto Nulo, confirmar?");
    }

    await handleVote();

    if (selectedCandidate) {
      console.log(`Voto confirmado para: ${selectedCandidate.name}`);
    } else {
      console.log("Voto confirmado em branco ou nulo");
    }

    setInputValue("");
    setSelectedCandidate(null);
    setConfirmedCandidate(null);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <MKBox
          sx={{ padding: "20px", textAlign: "center" }}
          bgColor="dark"
          variant="gradient"
          borderRadius="10px"
          p={10}
          mb={10}
        >
          <Typography variant="h1" style={{ color: "white" }} gutterBottom>
            Urna Eletrônica
          </Typography>
          <Typography variant="h3" style={{ color: "white" }} gutterBottom>
            {selectedCandidate ? selectedCandidate.name : confirmedCandidate || inputValue}
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, "Branco", 0, "Corrige"].map((number) => (
              <Grid key={number} item xs={4} md={3}>
                <MKButton
                  variant="gradient"
                  color="light"
                  onClick={() => {
                    if (number === "Branco") {
                      handleBlankVote();
                    } else if (number === "Corrige") {
                      handleCorrection();
                    } else {
                      handleNumberClick(number);
                    }
                  }}
                  fullWidth
                >
                  {number}
                </MKButton>
              </Grid>
            ))}
            <Grid item xs={12} md={12}>
              <MKButton
                size="small"
                fullWidth
                variant="gradient"
                color="light"
                onClick={handleConfirmVote}
              >
                {confirmedCandidate ? "Confirmar" : "Confirma"}
              </MKButton>
            </Grid>
          </Grid>
        </MKBox>
      </Grid>
    </Grid>
  );
}

export default Urn;
