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
        console.error("Error getting documents: ", error);
      }
    }
    fetchCandidates();
  }, []);

  useEffect(() => {
    const handleConfirmedCandidate = async () => {
      await handleVote();
    };

    handleConfirmedCandidate();
  }, [confirmedCandidate]);

  const playSound = () => {
    const audio = new Audio(UrnBip);
    audio.play();
  };

  const handleNumberClick = (number) => {
    setShowEnd(false);
    setInputValue((prevInput) => prevInput + number);
  };

  const handleVote = async () => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    if (selectedCandidate) {
      const candidateDocRef = doc(db, "candidates", String(selectedCandidate.id || "0"));
      const candidateDoc = await getDoc(candidateDocRef);

      if (candidateDoc.exists()) {
        const currentVotes = parseInt(candidateDoc.data().votes || 0, 10);
        await updateDoc(candidateDocRef, { votes: currentVotes + 1 });
        setShowEnd(true);
        playSound();
      } else {
        console.warn("No such document!");
      }
    } else {
      console.warn("No candidate selected!");
    }
  };

  const handleCorrection = () => {
    setInputValue("");
    setSelectedCandidate(null);
    setConfirmedCandidate(null);
    setShowEnd(false);
  };

  const handleBlankVote = () => {
    setSelectedCandidate({ id: 0, name: "Voto Branco" });
    handleVote(); // Votar em branco imediatamente
  };

  const handleConfirmVote = () => {
    if (confirmedCandidate === "Votar Branco?") {
      setShowEnd(true);
      playSound();
    } else if (confirmedCandidate === "Votar Nulo?") {
      setShowEnd(true);
      playSound();
    } else {
      const candidate = candidates.find((c) => {
        return c.id.toString() === inputValue;
      });

      if (candidate) {
        setSelectedCandidate(candidate);
        setConfirmedCandidate(selectedCandidate); // Atualiza confirmedCandidate com o candidato selecionado
        setInputValue("");
      } else {
        setConfirmedCandidate("Votar Nulo?");
        setInputValue("");
      }
    }
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
            {showEnd ? (
              "FIM"
            ) : selectedCandidate ? (
              <>
                <Typography variant="body1" style={{ color: "white" }} gutterBottom>
                  Deseja votar em {selectedCandidate.name}?
                </Typography>
                {selectedCandidate.image && (
                  <img
                    src={selectedCandidate.image}
                    alt={selectedCandidate.name}
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                  />
                )}
              </>
            ) : (
              confirmedCandidate || inputValue
            )}
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, "Branco", 0, "Corrige"].map((number) => (
              <Grid key={number} item xs={4} md={3}>
                <MKButton
                  variant="gradient"
                  color={
                    number === "Corrige"
                      ? "warning"
                      : number === "Branco" || number === "Confirma"
                      ? "light"
                      : "secondary"
                  }
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
                color="success"
                onClick={handleConfirmVote}
              >
                Confirma
              </MKButton>
            </Grid>
          </Grid>
        </MKBox>
      </Grid>
    </Grid>
  );
}

export default Urn;
