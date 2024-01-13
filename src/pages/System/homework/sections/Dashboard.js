import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import MKAlert from "components/MKAlert";
import MKTypography from "components/MKTypography";
import MKBox from "components/MKBox";
import DefaultCounterCard from "layouts/utils/Cards/CounterCards/DefaultCounterCard";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";

import { app } from "services/FirebaseConfig";

function Dashboard() {
  const [homeworkActivities, setHomeworkActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeworkActivities = async () => {
      setLoading(true);
      try {
        const db = getFirestore(app);
        const homeworkActivitiesCollectionRef = collection(db, "homework");
        const homeworkActivitiesSnapshot = await getDocs(homeworkActivitiesCollectionRef);

        if (homeworkActivitiesSnapshot.size > 0) {
          const activities = [];
          homeworkActivitiesSnapshot.forEach((doc) => {
            const data = doc.data();
            // Exclude the "counter" document
            if (doc.id !== "counter") {
              activities.push({
                teacher: data.teacher || "",
                title: data.title || "",
                description: data.description || "",
                class: data.class || "",
              });
            }
          });
          setHomeworkActivities(activities);
        }
      } catch (error) {
        console.error("Error fetching homework activities: ", error);
      }
      setLoading(false);
    };

    fetchHomeworkActivities();
  }, []);

  if (loading) {
    return (
      <DefaultCounterCard
        count={100}
        time={20}
        suffix="%"
        title="Gerando..."
        description="Imagens e Cards Personalizados"
      />
    );
  }

  return (
    <>
      <MKBox>
        {homeworkActivities.length > 0 ? (
          <Grid container spacing={2}>
            {homeworkActivities.map((activity, index) => (
              <Grid item xs={12} key={index}>
                <MKBox
                  variant="gradient"
                  borderRadius="10px"
                  bgColor="secondary"
                  p={10}
                  sx={{
                    margin: "0 auto 20px",
                  }}
                >
                  <Container>
                    <Grid container spacing={2}>
                      <Grid item xs={12} lg={12}>
                        <MKTypography color="light" variant="h4">
                          {activity.title}
                        </MKTypography>
                        <MKTypography color="light" variant="subtitle1">
                          Professor: {activity.teacher}
                        </MKTypography>
                        <MKTypography color="light" variant="subtitle1">
                          Descrição: {activity.description}
                        </MKTypography>
                      </Grid>
                    </Grid>
                  </Container>
                </MKBox>
              </Grid>
            ))}
          </Grid>
        ) : (
          <MKAlert color="danger" variant="subtitle1">
            Nenhuma atividade de casa encontrada.
          </MKAlert>
        )}
      </MKBox>
    </>
  );
}

export default Dashboard;
