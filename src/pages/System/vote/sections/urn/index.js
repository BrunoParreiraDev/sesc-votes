import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { getFirestore, updateDoc, doc, getDoc, getDocs, collection } from "firebase/firestore";
import { app } from "services/FirebaseConfig";
import MKButton from "components/MKButton";
import MKBox from "components/MKBox";
import UrnBip from "assets/urna.mp3";

function Urn(input) {
  const [inputValue, setInputValue] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [confirmedCandidate, setConfirmedCandidate] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [showEnd, setShowEnd] = useState(false);

  const fetchCandidates = async () => {
    try {
      const db = getFirestore(app);

      const querySnapshot = await getDocs(collection(db, "candidates"));

      const candidatesData = querySnapshot.docs
        .filter((doc) => doc.data().name)
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      const filteredData = candidatesData.filter((item) => item.class === input.class);

      setCandidates(filteredData);
    } catch (error) {
      console.error("Error fetching candidates: ", error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [input]);

  useEffect(() => {
    const handleConfirmedCandidate = async () => {
      await handleVote();
    };

    handleConfirmedCandidate();
  }, [confirmedCandidate]);

  useState(() => {
    fetchCandidates();
  }, []);

  const playSound = () => {
    const audio = new Audio(UrnBip);
    audio.play();
  };

  const handleNumberClick = (number) => {
    setShowEnd(false);
    setSelectedCandidate(null);
    setConfirmedCandidate(null);
    setInputValue((prevInput) => prevInput + number);
  };

  const handleVote = async () => {
    const db = getFirestore(app);

    if (selectedCandidate) {
      const candidateDocRef = doc(db, "candidates", String(selectedCandidate.id));
      const candidateDoc = await getDoc(candidateDocRef);

      if (candidateDoc.exists()) {
        const currentVotes = parseInt(candidateDoc.data().votes || 0, 10);
        await updateDoc(candidateDocRef, { votes: currentVotes + 1 });
        handleOption();
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

  const handleOption = () => {
    setShowEnd(true);
    playSound();
    setConfirmedCandidate(null);
    setSelectedCandidate(null);
    setTimeout(() => setShowEnd(false), 1000);
  };

  const handleBlankVote = () => {
    setSelectedCandidate({ id: 0, name: "Voto Branco" });
  };

  const handleConfirmVote = () => {
    setShowEnd(false);
    setInputValue("");
    if (confirmedCandidate === "Votar Branco?") {
      handleOption();
    } else if (confirmedCandidate === "Votar Nulo?") {
      handleOption();
    } else {
      console.log(typeof candidates);
      const candidate = candidates.find((c) => {
        return c.id.toString() === inputValue;
      });

      if (candidate) {
        setSelectedCandidate(candidate);
        setConfirmedCandidate(selectedCandidate);
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
              <Grid key={number} item xs={3} lg={4}>
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
                  <Typography
                    variant="h5"
                    style={{
                      color: number === "Branco" ? "dark" : "white",
                    }}
                    gutterBottom
                  >
                    {number}
                  </Typography>
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
                <Typography
                  variant="h5"
                  style={{
                    color: "white",
                  }}
                  gutterBottom
                >
                  Confirma
                </Typography>
              </MKButton>
            </Grid>
          </Grid>
        </MKBox>
      </Grid>
    </Grid>
  );
}

export default Urn;
