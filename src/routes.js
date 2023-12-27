/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================
**/

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
import ChartsPagePage from "layouts/pages/system/charts";

const routes = [
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
    ],
  },
  {
    name: "Sistema",
    icon: <Icon>storage</Icon>,
    columns: 1,
    rowsPerColumn: 2,
    collapse: [
      {
        name: "Votar",
        collapse: [
          {
            name: "Votar",
            route: "/system/vote",
            component: <VotePage />,
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
            component: <ChartsPagePage />,
          },
        ],
      },
      {
        name: "Perfil",
        collapse: [
          {
            name: sessionStorage.getItem("@AuthFirebase:user") ? "Sair" : "Entrar",
            route: sessionStorage.getItem("@AuthFirebase:user")
              ? "/system/signout"
              : "/system/signin",
            component: sessionStorage.getItem("@AuthFirebase:user") ? (
              <SignOutPage />
            ) : (
              <SignInPage />
            ),
          },
        ],
      },
    ],
  },
];

export default routes;
