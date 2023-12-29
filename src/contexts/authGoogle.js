import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  signOut,
  sendSignInLinkToEmail,
} from "firebase/auth";
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
          icon: "success",
        }).then(() => (window.location = "/system/signin"));
      } else {
        Swal.fire("Entendido!", "Sem problemas, estamos por aqui se precisar!", "info").then(
          () => (window.location = "/")
        );
      }
    });
  }
};

export const AuthGoogleProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const actionCodeSettings = {
    url: "https://sesc.netlify.app/system/signin",
    handleCodeInApp: true,
  };

  const signInEmail = (email) => {
    // Verificar se o usuário já está autenticado
    const currentUser = auth.currentUser;
    if (currentUser) {
      // Se já estiver autenticado, redirecione para a página principal ou dashboard
      document.location = "/";
      return;
    }

    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        console.log(email);
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(email));
        // Redirecione para a página inicial após o login
        document.location = "/";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire("Ops!", `${errorMessage} - (${errorCode})`, "error");
      });
  };

  const signInGoogle = () => {
    signInWithRedirect(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
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
        console.log("Erro: ", error);
        Swal.fire(
          "Ops, algo deu errado!",
          `Não se preocupe, estamos cientes do problema e já estamos trabalhando para resolvê-lo. ${error}`,
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
        document.location = "/";
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
    <AuthGoogleContext.Provider
      value={{ signInGoogle, signed: !!user, signOutGoogle, signInEmail }}
    >
      {children}
    </AuthGoogleContext.Provider>
  );
};

AuthGoogleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
