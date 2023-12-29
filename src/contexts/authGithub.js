import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { createContext, useState } from "react";
import { PropTypes } from "prop-types";
import { app } from "services/FirebaseConfig";
import Swal from "sweetalert2";

const provider = new GithubAuthProvider();
provider.addScope("repo");
provider.setCustomParameters({
  allow_signup: "false",
});

export const AuthGithubContext = createContext({});

export const AuthGithubProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);

  const signInGithub = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUser(user);
        sessionStorage.setItem("@AuthFirebase:token", token);
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
        Swal.fire({
          title: "Concluído!",
          text: `Agora você tem acesso ao site.`,
          icon: "success",
          timer: 6000,
          timerProgressBar: true,
          showConfirmButton: true,
        }).then(() => {
          document.location = "/";
        });
      })
      .catch((error) => {
        Swal.fire(
          "Ops, algo deu errado!",
          `Não se preocupe, estamos cientes do problema e já estamos trabalhando para resolvê-lo. ${error.message}`,
          "warning"
        );
      });
  };
  return (
    <AuthGithubContext.Provider value={{ signInGithub, signed: !!user }}>
      {children}
    </AuthGithubContext.Provider>
  );
};

AuthGithubProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
