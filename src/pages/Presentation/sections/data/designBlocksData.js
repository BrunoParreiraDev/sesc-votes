/*
=========================================================
* Material Kit 2 React - v2.1.0
========================================================
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

const imagesPrefix = "http://localhost:3000/pages";
export default [
  {
    title: "Votação",
    description: "Este é o lugar onde a magia acontece.",
    items: [
      {
        image: `${imagesPrefix}/about.png`,
        name: "Iniciar Votação",
        route: "/system/vote",
      },
      {
        image: `${imagesPrefix}/about.png`,
        name: "Resultados",
        route: "/system/results",
      },
      {
        image: `${imagesPrefix}/about.png`,
        name: "Graficos",
        route: "/system/charts",
      },
    ],
  },
  {
    title: "Documentação",
    description:
      "Aqui está uma seleção de três páginas que o ajudarão a dominar completamente o uso da plataforma.",
    items: [
      {
        image: `${imagesPrefix}/environment.png`,
        name: "Sala de Aula",
        route: "/docs/environment",
      },
      {
        image: `${imagesPrefix}/vote.png`,
        name: "Votação",
        route: "/docs/vote",
      },
    ],
  },
  {
    title: "BrunoSoft",
    description: "Nossa equipe, suporte, contato e outras curiosidades.",
    items: [
      {
        image: `${imagesPrefix}/about.png`,
        name: "Sobre Nós",
        route: "/dosc/about-us",
      },
    ],
  },
];
