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
function Voting() {
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
            <MKTypography variant="h3" color="success">
              Como Votar
            </MKTypography>
            <MKTypography variant="body2" color="success" opacity={0.8}>
              Um tutorial rápido para exercer seu voto com sucesso
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
              bgColor="success"
            >
              <p>
                1. Aproxime-se da urna eletrônica e encontre o teclado ou interface disponível.
                Insira o número do participante desejado para votar.
              </p>
            </MKBox>
            <MKBox
              mb={1}
              component="section"
              color="white"
              p={3}
              variant="gradient"
              borderRadius="10px"
              bgColor="success"
            >
              <p>
                2. Após inserir o número, confira se as informações e a foto do candidato
                correspondente aparecem corretamente na tela.
              </p>
            </MKBox>
            <MKBox
              mb={1}
              component="section"
              color="white"
              p={3}
              variant="gradient"
              borderRadius="10px"
              bgColor="success"
            >
              <p>
                3. Confirme seu voto se estiver correto. Caso contrário, cancele e refaça o
                procedimento.
              </p>
            </MKBox>
            <MKBox
              mb={1}
              component="section"
              color="white"
              p={3}
              variant="gradient"
              borderRadius="10px"
              bgColor="success"
            >
              <p>
                4. Aguarde a confirmação final na tela da urna eletrônica, indicando que seu voto
                foi registrado com sucesso.
              </p>
            </MKBox>
            <MKBox
              mb={1}
              component="section"
              color="white"
              p={3}
              variant="gradient"
              borderRadius="10px"
              bgColor="success"
            >
              <p>
                5. Siga atentamente as instruções fornecidas na urna para garantir a precisão e
                correta execução do seu voto.
              </p>
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Voting;
