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
import { useEffect } from "react";
// Material Kit 2 React pages
import Teacher from "pages/Docs/Teacher";

export default function TeacherPage() {
  useEffect(() => {
    document.title = "Sesc Votes - Documentação";
  }, []);
  return <Teacher />;
}
