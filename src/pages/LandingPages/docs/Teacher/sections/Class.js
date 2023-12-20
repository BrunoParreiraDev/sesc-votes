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
            <MKTypography variant="h3" color="dark">
              Como Usar a Plataforma
            </MKTypography>
            <MKTypography variant="body2" color="dark" opacity={0.8}>
              Funcionalidades e Boas Praticas
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
              bgColor="dark"
            >
              <h3>1. Acesso à Plataforma</h3>
              <p>
                Para iniciar, como líder da escola, acesse a plataforma de votação utilizando as
                credenciais fornecidas pela administração escolar. Certifique-se de ter permissões
                adequadas para gerenciar as votações.
              </p>
            </MKBox>

            <MKBox
              mb={1}
              component="section"
              color="white"
              p={3}
              variant="gradient"
              borderRadius="10px"
              bgColor="dark"
            >
              <h3>2. Configuração de Eleições</h3>
              <p>
                Ao acessar, você encontrará opções para configurar eleições. Adicione os cargos em
                votação, defina prazos e instruções claras para os votantes.
              </p>
            </MKBox>

            <MKBox
              mb={1}
              component="section"
              color="white"
              p={3}
              variant="gradient"
              borderRadius="10px"
              bgColor="dark"
            >
              <h3>3. Divulgação e Engajamento</h3>
              <p>
                É crucial divulgar as eleições de forma abrangente. Utilize os recursos da
                plataforma para enviar comunicados, explicar as candidaturas e motivar a
                participação dos estudantes.
              </p>
            </MKBox>

            <MKBox
              mb={1}
              component="section"
              color="white"
              p={3}
              variant="gradient"
              borderRadius="10px"
              bgColor="dark"
            >
              <h3>4. Acompanhamento e Contagem de Votos</h3>
              <p>
                Durante o período de votação, monitore a participação e esteja pronto para responder
                a dúvidas dos eleitores. Ao término, utilize a plataforma para contar os votos de
                forma transparente e segura.
              </p>
            </MKBox>

            <MKBox
              mb={1}
              component="section"
              color="white"
              p={3}
              variant="gradient"
              borderRadius="10px"
              bgColor="dark"
            >
              <h3>5. Anúncio dos Resultados</h3>
              <p>
                Após a contagem, anuncie os resultados de maneira oficial. Certifique-se de ser
                transparente e reconheça os vencedores, respeitando o processo democrático.
              </p>
            </MKBox>
            <MKBox
              mb={1}
              component="section"
              color="white"
              p={3}
              variant="gradient"
              borderRadius="10px"
              bgColor="dark"
            >
              <h3>6. Adicionar Tarefas de Casa</h3>
              <p>
                Utilize a plataforma para adicionar as tarefas de casa regularmente. Seja claro ao
                fornecer as instruções, prazos e detalhes necessários para cada tarefa.
              </p>
            </MKBox>

            <MKBox
              mb={1}
              component="section"
              color="white"
              p={3}
              variant="gradient"
              borderRadius="10px"
              bgColor="dark"
            >
              <h3>7. Notificações e Lembretes</h3>
              <p>
                Aproveite as funcionalidades de notificação da plataforma para lembrar os alunos
                sobre as tarefas pendentes, prazos próximos e eventuais atualizações.
              </p>
            </MKBox>

            <MKBox
              mb={1}
              component="section"
              color="white"
              p={3}
              variant="gradient"
              borderRadius="10px"
              bgColor="dark"
            >
              <h3>8. Esclarecimento de Dúvidas</h3>
              <p>
                Permita que os alunos possam esclarecer dúvidas sobre as tarefas de casa diretamente
                na plataforma, facilitando a comunicação professor-aluno fora do horário de aula.
              </p>
            </MKBox>

            <MKBox
              mb={1}
              component="section"
              color="white"
              p={3}
              variant="gradient"
              borderRadius="10px"
              bgColor="dark"
            >
              <h3>9. Monitoramento do Progresso</h3>
              <p>
                Acompanhe o progresso dos alunos em relação às tarefas atribuídas. Utilize a
                plataforma para avaliar o status das entregas e oferecer suporte, se necessário.
              </p>
            </MKBox>

            <MKBox
              mb={1}
              component="section"
              color="white"
              p={3}
              variant="gradient"
              borderRadius="10px"
              bgColor="dark"
            >
              <h3>10. Feedback e Avaliação</h3>
              <p>
                Utilize a plataforma para fornecer feedback às tarefas entregues, oferecendo
                insights construtivos e auxiliando no desenvolvimento acadêmico dos alunos.
              </p>
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Class;
