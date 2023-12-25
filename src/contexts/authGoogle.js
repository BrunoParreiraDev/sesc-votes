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
        Swal.fire("Usuário", `Bem vindo de volta ${user.displayName}!`);
        setUser(user);
        sessionStorage.setItem("@AuthFirebase:token", token);
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
      })
      .catch((error) => {
        console.log("Erro: ", error);
      });
  };

  const signOutGoogle = () => {
    signOut(auth)
      .then(() => {
        // Limpar informações de usuário ao sair
        sessionStorage.removeItem("@AuthFirebase:user");
        sessionStorage.removeItem("@AuthFirebase:token");
        setUser(null); // ou qualquer lógica necessária para limpar o estado de usuário
        Swal.fire("Sucesso!", "Até a proxima!");
        setTimeout(() => {
          document.location = "/";
        }, 2000);
      })
      .catch((error) => {
        console.log("Erro ao desconectar o usuário: ", error);
      });
  };

  return (
    <AuthGoogleContext.Provider value={{ signInGoogle, signOutGoogle, signed: !!user }}>
      {children}
    </AuthGoogleContext.Provider>
  );
};

AuthGoogleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
