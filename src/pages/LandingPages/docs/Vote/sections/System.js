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

function System() {
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
              Como Configurar o Sistema
            </MKTypography>
            <MKTypography variant="body2" color="white" opacity={0.8}>
              Aprenda como a Sala deve ficar organizada durante o periodo de eleição
            </MKTypography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <MKBox mb={1} color="white">
              <p>
                Acesso à Urna Eletrônica: Ao se aproximar da urna eletrônica, você encontrará um
                teclado ou interface para digitar o número do participante para o qual deseja votar.
              </p>
              <br />
              <p>
                Digitação do Número do Participante: Utilize o teclado ou a interface disponível
                para inserir o número específico do participante para o qual deseja votar.
                Certifique-se de inserir o número corretamente.
              </p>
              <br />
              <p>
                Confirmação da Escolha: Após digitar o número do participante, uma foto ou
                informações do candidato correspondente devem aparecer na tela. Verifique se as
                informações exibidas são do participante desejado.
              </p>
              <br />
              <p>
                Confirmação ou Cancelamento do Voto: Após revisar as informações do participante
                exibidas na tela, você terá a opção de confirmar ou cancelar o voto. Se estiver
                correto, confirme; caso contrário, cancele e refaça o procedimento.
              </p>
              <br />
              <p>
                Confirmação Final: Após confirmar o voto, aguarde a confirmação final na tela da
                urna eletrônica. Isso indicará que o seu voto foi registrado com sucesso. É
                essencial seguir atentamente as instruções fornecidas na urna eletrônica durante o
                processo de votação. Certifique-se de manusear os controles de maneira correta e
                precisa para garantir a exatidão do seu voto. Em caso de dúvidas ou problemas
                técnicos, procure um responsável pelo sistema de votação para obter assistência
                imediata.
              </p>
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default System;
