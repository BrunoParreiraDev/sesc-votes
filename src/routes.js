/**
 * Material Kit 2 React - v2.1.0
 * Product Page: https://www.creative-tim.com/product/material-kit-react
 * Copyright 2023 Creative Tim (https://www.creative-tim.com)
 * Coded by www.creative-tim.com
 */

// @mui material components
import Icon from "@mui/material/Icon";

// Pages
import AboutUsPage from "layouts/pages/docs/about-us";
import EnvironmentPage from "layouts/pages/docs/environment";
import VoteDocsPage from "layouts/pages/docs/vote";
import TeacherPage from "layouts/pages/docs/teacher";
import RegisterPage from "layouts/pages/system/register";
import SignInPage from "layouts/pages/system/signin";
import SignOutPage from "layouts/pages/system/signout";
import VotePage from "layouts/pages/system/vote";
import ResultsPage from "layouts/pages/system/results";
import ChartsPage from "layouts/pages/system/charts";
import RegisterHomeworkPage from "layouts/pages/system/registerHomework";

const user = JSON.parse(sessionStorage.getItem("@AuthFirebase:user"));

const allowedUsers = JSON.parse(process.env.REACT_APP_ADMINS_UID || "[]");

export const routes = [
  {
    name: "Páginas",
    icon: <Icon>dashboard</Icon>,
    columns: 1,
    rowsPerColumn: 2,
    collapse: [
      {
        name: "Documentação",
        collapse: [
          {
            name: "Sobre Nós",
            route: "/docs/about-us",
            component: <AboutUsPage />,
          },
          {
            name: "Configurando o Ambiente",
            route: "/docs/environment",
            component: <EnvironmentPage />,
          },
          {
            name: "Votação",
            route: "/docs/vote",
            component: <VoteDocsPage />,
          },
          {
            name: "Professor",
            route: "/docs/teacher",
            component: <TeacherPage />,
          },
        ],
      },
      {
        name: "Perfil",
        collapse: [
          {
            name: user ? "Sair" : "Entrar",
            route: user ? "/system/signout" : "/system/signin",
            component: user ? <SignOutPage /> : <SignInPage />,
          },
        ],
      },
    ],
  },
  {
    name: "Sistema",
    icon: <Icon>storage</Icon>,
    columns: 1,
    rowsPerColumn: 2,
    collapse: [
      {
        name: user && allowedUsers.includes(user.uid) ? "Ferramentas Admin" : "Sem Permissão",
        collapse:
          user && allowedUsers.includes(user.uid)
            ? [
                {
                  name: "Votar",
                  route: "/system/vote",
                  component: <VotePage />,
                },
                {
                  name: "Registrar Atividade para Casa",
                  route: "/system/register/homework",
                  component: <RegisterHomeworkPage />,
                },
                {
                  name: "Registrar candidato",
                  route: "/system/register",
                  component: <RegisterPage />,
                },
                {
                  name: "Resultados",
                  route: "/system/results",
                  component: <ResultsPage />,
                },
                {
                  name: "Gráficos",
                  route: "/system/charts",
                  component: <ChartsPage />,
                },
              ]
            : [
                user
                  ? {
                      name: "sair",
                      route: "/system/signout",
                      component: <SignOutPage />,
                    }
                  : {
                      name: "entrar",
                      route: "/system/signin",
                      component: <SignInPage />,
                    },
              ],
      },
    ],
  },
];
