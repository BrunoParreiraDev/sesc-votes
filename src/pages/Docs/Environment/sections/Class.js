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

function Class() {
  return (
    <MKBox
      component="section"
      position="relative"
      py={6}
      px={{ xs: 2, lg: 0 }}
      my={3}
      mt={6}
      mx={-2}
    >
      <Container>
        <Grid container>
          <Grid item xs={12} md={8} sx={{ mb: 6 }}>
            <MKTypography variant="h3" color="info">
              Como Organizar a Sala
            </MKTypography>
            <MKTypography variant="body2" color="info" opacity={0.8}>
              Aprenda como a Sala deve ficar organizada durante o periodo de eleição
            </MKTypography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <MKBox
              mb={1}
              component="section"
              color="white"
              p={3}
              variant="gradient"
              borderRadius="10px"
              bgColor="info"
            >
              Para garantir uma eleição organizada e justa, a disposição da sala de aula desempenha
              um papel fundamental. Ao preparar o ambiente para a votação, é essencial designar uma
              área específica, claramente identificada, para a atividade eleitoral. Isso pode
              incluir uma mesa central ou um espaço demarcado com sinais visíveis indicando o local
              de votação.
            </MKBox>
            <MKBox
              mb={1}
              component="section"
              color="white"
              p={3}
              variant="gradient"
              borderRadius="10px"
              bgColor="info"
            >
              Privacidade é importante. Ao organizar o espaço, é crucial criar uma área discreta
              para a votação, permitindo que os alunos exerçam seu voto sem interferências externas.
              O arranjo das cadeiras ou a implementação de divisórias pode garantir um ambiente mais
              privado para a votação.
            </MKBox>
            <MKBox
              mb={1}
              component="section"
              color="white"
              p={3}
              variant="gradient"
              borderRadius="10px"
              bgColor="info"
            >
              Certifique-se de ter todos os materiais necessários disponíveis. Seja para votações
              manuais ou eletrônicas, providencie cédulas, urnas ou acesso aos dispositivos
              eletrônicos de votação. Além disso, instruções claras devem estar visíveis, orientando
              os alunos sobre o procedimento de votação.
            </MKBox>
            <MKBox
              mb={1}
              component="section"
              color="white"
              p={3}
              variant="gradient"
              borderRadius="10px"
              bgColor="info"
            >
              A supervisão adequada é imprescindível. Um professor ou responsável deve estar
              presente durante todo o processo de votação para resolver dúvidas, assegurar a ordem e
              garantir que a votação seja conduzida de maneira justa e transparente.
            </MKBox>
            <MKBox
              mb={1}
              component="section"
              color="white"
              p={3}
              variant="gradient"
              borderRadius="10px"
              bgColor="info"
            >
              Por fim, a segurança dos votos é prioritária. Manter a área de votação sob supervisão
              constante minimiza riscos de fraude, assegurando que o processo eleitoral transcorra
              de forma confiável e confidencial para todos os participantes.
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Class;
