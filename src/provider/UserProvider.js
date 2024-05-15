import { createContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  auth,
  signInWithEmailAndPassword,
} from "../Firebase";

export const UserContext = createContext();

export default function UserProvider({ children }, notify) {
  const [user, setUser] = useState();

  async function handleRegsiter({ email, password }, notify) {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        setUser(userCredential.user);
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code === "auth/invalid-email")
          return notify("You need an email to register");
        if (error.code === "auth/missing-password")
          return notify("You need a password to register");
        if (error.code === "auth/weak-password")
          return notify(
            "Your password need at least one Uppercase, one undercase, one special chart and one number, and at least 8 chars in total"
          );
        if (error.code === "auth/email-already-in-use")
          return notify("This account already exist");
        notify("error.message");
      });
  }

  async function handleLogIn({ email, password }, notify) {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        setUser(userCredential.user);
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email")
          return notify("You need an email to register");
        if (error.code === "auth/missing-password")
          return notify("You need a password to register");
        if (error.code === "auth/invalid-credential")
          return notify("Invalid email or password");
        notify("error.message");
      });
  }

  return (
    <UserContext.Provider value={{ user, handleRegsiter, handleLogIn }}>
      {children}
    </UserContext.Provider>
  );
}
