import Swal from "sweetalert2";
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

    async function fetchCandidates(selectedClass) {
      try {
        const db = getFirestore(app);
        let query = collection(db, "candidates");

        // Verifique se uma classe foi selecionada antes de aplicar o filtro
        if (selectedClass) {
          query = query.where("selectedClass", "==", selectedClass);
        }

        const querySnapshot = await getDocs(query);
        const candidates = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCandidates(candidates);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    }

    const showClassSelection = async () => {
      const { value: selectedClass } = await Swal.mixin({
        input: "select",
        inputOptions: {
          "7 (A)": "7 (A)",
          "7 (B)": "7 (B)",
          "8 (A)": "8 (A)",
          "8 (B)": "8 (B)",
          // Adicione outras opções conforme necessário
        },
        inputPlaceholder: "Selecione a Turma",
        confirmButtonText: "Selecionar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
      }).queue([
        {
          title: "Selecione a Turma",
          confirmButtonText: "Selecionar",
          showCancelButton: true,
        },
      ]);

      if (selectedClass) {
        // O usuário selecionou uma turma, utilize o valor de selectedClass aqui
        console.log("Turma selecionada:", selectedClass);
        fetchCandidates(selectedClass);
      } else {
        // Usuário cancelou a seleção
        console.log("Seleção cancelada");
        setCandidates([]);
      }
    };

    // Chame a função para mostrar o SweetAlert
    showClassSelection();
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

  const handleOption = () => {
    setShowEnd(true);
    playSound();
    setConfirmedCandidate(null);
    setSelectedCandidate(null);
    setTimeout(() => setShowEnd(false), 1000);
  };

  const handleBlankVote = () => {
    setSelectedCandidate({ id: 0, name: "Voto Branco" });
    handleVote(); // Votar em branco imediatamente
  };

  const handleConfirmVote = () => {
    setShowEnd(false);
    setInputValue("");
    if (confirmedCandidate === "Votar Branco?") {
      handleOption();
    } else if (confirmedCandidate === "Votar Nulo?") {
      handleOption();
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
