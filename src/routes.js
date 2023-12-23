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
import AboutUs from "layouts/pages/docs/about-us";
import Environment from "layouts/pages/docs/environment";
import VoteDocs from "layouts/pages/docs/vote";
import Teacher from "layouts/pages/docs/teacher";
import Register from "layouts/pages/system/register";
import Vote from "layouts/pages/system/vote";
import SignIn from "layouts/pages/authentication/sign-in";

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
            component: <AboutUs />,
          },
          {
            name: "Configurando o Ambiente",
            route: "/docs/environment",
            component: <Environment />,
          },
          {
            name: "Votação",
            route: "/docs/vote",
            component: <VoteDocs />,
          },
          {
            name: "Professor",
            route: "/docs/teacher",
            component: <Teacher />,
          },
        ],
      },
      {
        name: "Perfil",
        collapse: [
          {
            name: "Entrar",
            route: "/sign-in",
            component: <SignIn />,
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
            component: <Vote />,
          },
          {
            name: "Registrar candidato",
            route: "/system/register",
            component: <Register />,
          },
          {
            name: "Resultados",
            route: "/system/results",
            component: <SignIn />,
          },
          {
            name: "Gráficos",
            route: "/system/charts",
            component: <AboutUs />,
          },
        ],
      },
    ],
  },
];

export default routes;
