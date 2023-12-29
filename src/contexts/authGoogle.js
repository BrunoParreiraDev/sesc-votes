import {
  getAuth,
  GoogleAuthProvider,
  signOut,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithPopup,
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

  const signInEmail = () => {
    // Verifica se o link de login por email está presente na URL
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Recupera o email do sessionStorage ou pede ao usuário para fornecê-lo
      let email = sessionStorage.getItem("email");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }

      // Envia o link de login para o email fornecido
      sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => {
          // Define o email no sessionStorage e exibe um alerta de sucesso
          sessionStorage.setItem("email", email);
          Swal.fire({
            title: "Concluído!",
            text: `Agora acesse o seu email e siga os passos.`,
            icon: "success",
            timer: 6000,
            timerProgressBar: true,
            showConfirmButton: true,
          });
        })
        .catch((error) => {
          // Em caso de erro, exibe um alerta com a mensagem de erro
          const errorCode = error.code;
          const errorMessage = error.message;
          Swal.fire("Ops!", `${errorMessage} - (${errorCode})`, "error");
        });
    }
  };

  const signInGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credential(result);
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
