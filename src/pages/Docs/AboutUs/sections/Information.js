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
import DefaultInfoCard from "layouts/utils/Cards/InfoCards/DefaultInfoCard";
import CenteredBlogCard from "layouts/utils/Cards/BlogCards/CenteredBlogCard";

function Information() {
  return (
    <MKBox component="section" py={12}>
      <Container>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} lg={6}>
            <Grid container justifyContent="flex-start">
              <Grid item xs={12} md={6}>
                <MKBox mb={5}>
                  <DefaultInfoCard
                    icon="public"
                    title="Site Público"
                    description="Pelo fato de ser um site público você tem acesso a informações de forma ampla e aberta a todos os interessados, promovendo transparência e acessibilidade."
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={5}>
                  <DefaultInfoCard
                    icon="payments"
                    title="Totalmente Grátis"
                    description="Você pode desfrutar de todos os recursos e benefícios da plataforma sem nenhum custo, oferecendo acesso livre e sem barreiras financeiras."
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={{ xs: 5, md: 0 }}>
                  <DefaultInfoCard
                    icon="apps"
                    title="Suporte ao Professor"
                    description="Fornecemos ferramentas e assistência direcionadas para professores, facilitando o uso e aproveitamento da plataforma em sala de aula."
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={{ xs: 5, md: 0 }}>
                  <DefaultInfoCard
                    icon="3p"
                    title="Plataforma para Alunos e Professores"
                    description="Um ambiente de aprendizado completo para alunos e professores, oferecendo suporte e funcionalidades adaptadas a ambos os públicos."
                  />
                </MKBox>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4} sx={{ ml: "auto", mt: { xs: 3, lg: 0 } }}>
            <CenteredBlogCard
              image="https://images.unsplash.com/photo-1544717302-de2939b7ef71?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              title="Atualização de Tarefas"
              description="Quando um professor passa uma tarefa para a turma a aba Tarefas atualiza instataneamente."
              action={{
                type: "internal",
                route: "homework",
                color: "info",
                label: "Tarefas",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
