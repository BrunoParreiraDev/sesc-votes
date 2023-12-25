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
import SignIn from "layouts/pages/system/signin";
import SignOut from "layouts/pages/system/signout";
import Vote from "layouts/pages/system/vote";

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
            component: <AboutUs />,
          },
          {
            name: "Gráficos",
            route: "/system/charts",
            component: <AboutUs />,
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
            component: sessionStorage.getItem("@AuthFirebase:user") ? <SignOut /> : <SignIn />,
          },
        ],
      },
    ],
  },
];

export default routes;
