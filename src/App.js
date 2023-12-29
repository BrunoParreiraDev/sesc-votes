/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import DefaultNavbar from "layouts/utils/Navbars/DefaultNavbar";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";
import routes from "routes";
import { AuthGoogleProvider } from "contexts/authGoogle";
import { AuthGithubProvider } from "contexts/authGithub";

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <AuthGithubProvider>
      <AuthGoogleProvider>
        <ThemeProvider theme={theme}>
          <DefaultNavbar
            routes={routes}
            action={
              !sessionStorage.getItem("@AuthFirebase:user") && {
                type: "internal",
                route: "system/signin",
                label: "Entrar",
                color: "info",
              }
            }
            dark
          />
          <CssBaseline />
          <Routes>
            {getRoutes(routes)}
            <Route path="/presentation" element={<Presentation />} />
            <Route path="*" element={<Navigate to="/presentation" />} />
          </Routes>
        </ThemeProvider>
      </AuthGoogleProvider>
    </AuthGithubProvider>
  );
}
