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
import MKTypography from "components/MKTypography";

// Material Kit 2 React layouts/utils
import HorizontalTeamCard from "layouts/utils/Cards/TeamCards/HorizontalTeamCard";

// Images
import team1 from "assets/images/bruno.jpeg";

function Team() {
  const year = new Date().getFullYear();
  return (
    <MKBox
      component="section"
      variant="gradient"
      bgColor="dark"
      position="relative"
      py={6}
      px={{ xs: 2, lg: 0 }}
      mx={-2}
    >
      <Container>
        <Grid container>
          <Grid item xs={12} md={8} sx={{ mb: 6 }}>
            <MKTypography variant="h3" color="white">
              Nossa Equipe
            </MKTypography>
            <MKTypography variant="body2" color="white" opacity={0.8}>
              Veja a equipe que dá vida a todos estes projetos.
            </MKTypography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <MKBox mb={1}>
              <HorizontalTeamCard
                image={team1}
                name="Bruno Parreira"
                position={{ color: "info", label: "Full Stack, Chefe, Pleno" }}
                description={
                  "Eu tenho atualmente " +
                  (year - 2010) +
                  " anos de idade e decidi criar este site por conta própria. Com um investimento de apenas 500 reais em um computador, dediquei meu tempo e esforço para desenvolver esta plataforma do zero. Desde o planejamento até a implementação, cada aspecto deste site foi cuidadosamente elaborado por mim. Esta jornada solitária me ensinou não apenas habilidades técnicas, mas também a importância da persistência e do aprendizado contínuo. Portanto, sim, você leu corretamente: a equipe por trás deste projeto ambicioso sou eu mesmo."
                }
              />
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Team;
