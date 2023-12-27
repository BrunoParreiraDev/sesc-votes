import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Avatar from "@mui/material/Avatar";
import { app } from "services/FirebaseConfig";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import MKTypography from "components/MKTypography";
import MKBox from "components/MKBox";
import MKAlert from "components/MKAlert";
import DefaultCounterCard from "layouts/utils/Cards/CounterCards/DefaultCounterCard";

function Candidates(input) {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching candidates: ", error);
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [input]);

  if (loading) {
    return (
      <DefaultCounterCard count={100} suffix="%" title="Carregando..." description="candidatos" />
    );
  }

  if (candidates.length === 0) {
    return (
      <Link to="/system/register" type="internal">
        <MKAlert variant="gradient" color="info">
          Sem candidatos. Clique aqui para registrar um novo candidato.
        </MKAlert>
      </Link>
    );
  }

  return (
    <Grid container spacing={3}>
      {candidates.map((candidate) => (
        <Grid key={candidate.id} item xs={12} lg={6}>
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
                    {candidate.name}
                  </MKTypography>
                  <MKTypography color="light" variant="subtitle1">
                    Número: {candidate.id}
                  </MKTypography>
                  <MKTypography color="light" variant="subtitle1">
                    Turma: {candidate.class}
                  </MKTypography>
                  <MKTypography color="light" variant="subtitle2">
                    Slogan: {candidate.slogan}
                  </MKTypography>
                </Grid>
                <Grid item xs={12} lg={3}>
                  <Avatar
                    id="preview-avatar"
                    sx={{ width: 120, height: 120, margin: "0 auto 20px", cursor: "pointer" }}
                    alt="Candidate Photo"
                    src={candidate.image}
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

export default Candidates;
