import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc, doc, getDoc, getDocs, collection } from "firebase/firestore";
import firebaseConfig from "layouts/utils/FireBase";
import MKButton from "components/MKButton";
import MKBox from "components/MKBox";
import UrnBip from "assets/urna.mp3";

function Urn() {
  const [inputValue, setInputValue] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [confirmedCandidate, setConfirmedCandidate] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [showEnd, setShowEnd] = useState(false);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

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

  const playSound = () => {
    const audio = new Audio(UrnBip);
    audio.play();
  };

  const handleNumberClick = (number) => {
    setInputValue((prevInput) => prevInput + number);
  };

  const handleVote = async () => {
    if (!selectedCandidate) return;

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const candidateDocRef = doc(db, "candidates", selectedCandidate.id);
    const candidateDoc = await getDoc(candidateDocRef);

    if (candidateDoc.exists()) {
      const currentVotes = candidateDoc.data().votes || 0;
      await updateDoc(candidateDocRef, { votes: currentVotes + 1 });
      console.log("Voto registrado com sucesso!");
      setShowEnd(true);
      playSound();
    } else {
      console.error("Candidato não encontrado!");
    }
  };

  const handleCorrection = () => {
    setInputValue("");
    setSelectedCandidate(null);
    setConfirmedCandidate(null);
    setShowEnd(false);
  };

  const handleBlankVote = () => {
    setConfirmedCandidate("Votar Branco?");
    setSelectedCandidate({ id: 0, name: "Voto em Branco" });
  };

  const handleConfirmVote = async () => {
    if (confirmedCandidate === "Votar Branco?") {
      setConfirmedCandidate(null);
    } else if (confirmedCandidate === "Votar Nulo?") {
      setSelectedCandidate("Voto Nulo");
      setConfirmedCandidate(null);
    } else {
      const candidate = candidates.find((c) => c.id === parseInt(inputValue));
      if (candidate) {
        setSelectedCandidate(candidate);
      } else {
        setConfirmedCandidate("Votar Nulo?");
        return;
      }
    }

    await handleVote();

    if (selectedCandidate) {
      console.log(`Voto confirmado para: ${selectedCandidate.name}`);
    } else {
      console.log("Voto confirmado em branco ou nulo");
    }

    setInputValue("");
    setSelectedCandidate(null);
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
            {showEnd
              ? "FIM"
              : selectedCandidate
              ? selectedCandidate.name
              : confirmedCandidate || inputValue}
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
