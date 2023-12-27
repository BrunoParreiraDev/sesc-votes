import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useState } from "react";
import { createContext } from "react";
import { app } from "services/FirebaseConfig";
import Swal from "sweetalert2";
import { PropTypes } from "prop-types";

const provider = new GoogleAuthProvider();

export const AuthGoogleContext = createContext({});

export const AuthGoogleProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);

  const signInGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        console.log(token);
        Swal.fire("Sucesso!", `Olá, ${user.displayName}!`);
        setUser(user);
        sessionStorage.setItem("@AuthFirebase:token", token);
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
        setTimeout(() => {
          document.location = "/";
        }, 2000);
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
