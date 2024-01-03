import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { createContext, useState } from "react";
import { PropTypes } from "prop-types";
import { app } from "services/FirebaseConfig";
import Swal from "sweetalert2";

export const AuthEmailContext = createContext({});

export const AuthEmailProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  const actionCodeSettings = {
    url: "https://sesc.netlify.app/system/signin",
    handleCodeInApp: true,
  };

  const sendEmailSignInLink = (email) => {
    localStorage.setItem("emailForSignIn", email); // Salvar o email antes de enviar o link
    return sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        Swal.fire({
          title: "Enviado!",
          text: `Por favor, verifique seu e-mail e acesse o site do seu provedor de e-mail. Procure pela mensagem que enviamos e clique no link fornecido para verificar seu e-mail.`,
          icon: "success",
          timer: 6000,
          timerProgressBar: true,
          showConfirmButton: true,
        });
      })
      .catch((error) => {
        localStorage.removeItem("emailForSignIn"); // Remover o email se ocorrer um erro no envio
        Swal.fire(
          "Ops, algo deu errado!",
          `Não se preocupe, estamos cientes do problema e já estamos trabalhando para resolvê-lo. ${error}`,
          "warning"
        );
      });
  };

  const completeEmailSignIn = async () => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = localStorage.getItem("emailForSignIn");
      Swal.fire("email", email);
      if (!email) {
        const { value: inputEmail } = await Swal.fire({
          title: "Verificação de E-mail",
          input: "email",
          inputLabel: "Por favor, insira seu e-mail para continuar",
          inputPlaceholder: "Seu e-mail",
          inputAttributes: {
            autocapitalize: "off",
            autocorrect: "off",
          },
        });

        if (inputEmail) {
          email = inputEmail;
          localStorage.setItem("emailForSignIn", email);
        } else {
          return;
        }
      }

      return signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          setUser(result.user);
          Swal.fire({
            title: "Concluído!",
            text: "Agora você tem acesso ao site.",
            icon: "success",
            timer: 6000,
            timerProgressBar: true,
            showConfirmButton: true,
          }).then(() => {
            document.location = "/";
          });
        })
        .catch((error) => {
          console.error("Erro ao fazer login com e-mail link:", error);
          Swal.fire(
            "Ops, algo deu errado!",
            `Parece que o email fornecido não é válido. Por favor, verifique se o email está correto e tente novamente.`,
            "warning"
          );
        });
    }
  };

  return (
    <AuthEmailContext.Provider value={{ sendEmailSignInLink, completeEmailSignIn, signed: !!user }}>
      {children}
    </AuthEmailContext.Provider>
  );
};

AuthEmailProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
