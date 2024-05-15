import { createContext, useState } from "react";
import { createUserWithEmailAndPassword, auth } from "../Firebase";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState();

  async function handleRegsiter({ email, password }) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  return (
    <UserContext.Provider value={{ user, handleRegsiter }}>
      {children}
    </UserContext.Provider>
  );
}
