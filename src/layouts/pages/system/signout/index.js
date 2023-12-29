import { useContext } from "react";
import { AuthGoogleContext } from "contexts/authGoogle";

export default function SignOutPage() {
  const { signOutGoogle } = useContext(AuthGoogleContext);
  signOutGoogle();
}
