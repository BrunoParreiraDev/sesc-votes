// @mui icons
import InstagramIcon from "@mui/icons-material/InstagramIcon";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedInIcon";

import Link from "@mui/material/Link";

// Material Kit 2 React components
import MKTypography from "components/MKTypography";

const { href, name } = "BrunoSoft";

const year = new Date().getFullYear();

export default {
  company: { href: "https://brunin12.netlify.app/", name: "BrunoSoft" },
  links: [
    { href: "https://brunin12.netlify.app/", name: "Empresa" },
    { href: "https://brunin12.netlify.app/about", name: "Sobre Nós" },
    { href: "https://brunin12.netlify.app/", name: "Equipe" },
    { href: "https://brunin12.netlify.app/", name: "Produtos" },
    { href: "https://brunin12.netlify.app/", name: "Blog" },
    { href: "https://www.creative-tim.com/license", name: "Licença" },
  ],
  socials: [
    {
      icon: <InstagramIcon fontSize="small" />,
      link: "https://www.instagram.com/brunin.br1/",
    },
    {
      icon: <LinkedInIcon fontSize="small" />,
      link: "https://linkedin.com/brunoparreira-12/",
    },
    { icon: <GitHubIcon fontSize="small" />, link: "https://github.com/brunin12" },
  ],
  light: false,
  copyright: (
    <MKTypography variant="body2" color="white">
      Copyright &copy;, Todos os direitos reservados, Criado por{" "}
      <MKTypography
        component={Link}
        href={href}
        target="_blank"
        rel="noreferrer"
        variant="body2"
        color="white"
      >
        {name} {year}
      </MKTypography>
      .
    </MKTypography>
  ),
};
