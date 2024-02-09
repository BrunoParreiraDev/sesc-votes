import { getAuth, GoogleAuthProvider, signOut, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { createContext } from "react";
import { app } from "services/FirebaseConfig";
import Swal from "sweetalert2";
import { PropTypes } from "prop-types";

const provider = new GoogleAuthProvider();

export const AuthGoogleContext = createContext({});

export const AuthToUse = ({ children }) => {
  const user = sessionStorage.getItem("@AuthFirebase:user");
  const token = sessionStorage.getItem("@AuthFirebase:token");

  if (!!user && !!token) {
    return children;
  } else {
    Swal.fire({
      icon: "warning",
      title: "Ops!",
      text: "Parece que é necessário fazer login para acessar esta seção. Não se preocupe, estamos aqui para ajudar! Entre na sua conta para desfrutar de todo o conteúdo e experiências incríveis que temos para oferecer.",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Entendi, vou fazer o login!",
      cancelButtonText: "Agora não, obrigado.",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Concluido!",
          text: "Redirecionando para a página de login!",
          icon: "info",
        }).then(() => (window.location = "/system/signin"));
      } else {
        Swal.fire("Entendido!", "Sem problemas, estamos por aqui se precisar!", "info").then(
          () => (document.location = "/")
        );
      }
    });
  }
};

export const AuthGoogleProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);

  const signInGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credential(result);
        const token = credential.accessToken;
        const user = result.user;
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
        sessionStorage.setItem("@AuthFirebase:token", token);
        setUser(user);

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
      .catch(() => {
        Swal.fire(
          "Ops, algo deu errado!",
          `Não se preocupe, estamos cientes do problema e já estamos trabalhando para resolvê-lo. tente novamente mais tarde`,
          "warning"
        );
      });
  };

  const signOutGoogle = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem("@AuthFirebase:user");
        sessionStorage.removeItem("@AuthFirebase:token");
        setUser(null);
        document.location = "/system/signin";
      })
      .catch((error) => {
        console.log("Erro ao desconectar o usuário: ", error);
        Swal.fire(
          "Ops!",
          "Problemas ao desconectar o usuário, tente novamente mais tarde",
          "warning"
        );
      });
  };

  return (
    <AuthGoogleContext.Provider value={{ signInGoogle, signed: !!user, signOutGoogle }}>
      {children}
    </AuthGoogleContext.Provider>
  );
};

AuthGoogleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
