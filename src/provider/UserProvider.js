import { createContext, useState } from "react";
import { createUserWithEmailAndPassword, auth } from "../Firebase";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState();

  async function handleRegsiter({ email, password }) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        setUser(userCredential.user);
      })
      .catch((error) => {
        console.log(error.message);

        // ..
      });
  }

  return (
    <UserContext.Provider value={{ user, handleRegsiter }}>
      {children}
    </UserContext.Provider>
  );
}
