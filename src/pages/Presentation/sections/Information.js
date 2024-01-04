/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React layouts/utils
import RotatingCard from "layouts/utils/Cards/RotatingCard";
import RotatingCardFront from "layouts/utils/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "layouts/utils/Cards/RotatingCard/RotatingCardBack";
import DefaultInfoCard from "layouts/utils/Cards/InfoCards/DefaultInfoCard";

// Images
import bgFront from "assets/images/rotating-card-bg-front.jpeg";
import bgBack from "assets/images/rotating-card-bg-back.jpeg";

function Information() {
  return (
    <MKBox component="section" py={6} my={2}>
      <Container>
        <Grid container item xs={11} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
          <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
            <RotatingCard>
              <RotatingCardFront
                image={bgFront}
                icon="touch_app"
                title="Novidades"
                description="Com esta plataforma totalmente gratuita, você pode realizar coisas absolutamente inimagináveis."
              />
              <RotatingCardBack
                image={bgBack}
                title="Nova Seção!"
                description="Planejamos criar uma nova seção na qual você terá acesso aos horários das aulas, os tópicos abordados em cada uma delas, e também poderá visualizar as tarefas de casa."
                action={{
                  type: "internal",
                  route: "https://brunin12.netlify.app",
                  label: "Apoiar esta seção",
                }}
              />
            </RotatingCard>
          </Grid>
          <Grid item xs={12} lg={7} sx={{ ml: "auto" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="people_alt"
                  title="Controle de Votação"
                  description="Diminua o Peso de ter que fazer todo o trabalho pesado da votação e deixe esta parte conosco!"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="poll"
                  title="Visualização Grafica"
                  description="Vamos apreciar a beleza dos gráficos do SESC Votes e deixar de lado a leitura de números monótonos."
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mt: { xs: 0, md: 6 } }}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="menu_book"
                  title="Dever de Casa"
                  description="Agora, não há mais desculpas para esquecer as tarefas de casa; tudo está na palma da sua mão."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="devices"
                  title="Facil de Aplicar"
                  description="Não há desculpas para não utilizar este site, afinal, é grátis!"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
