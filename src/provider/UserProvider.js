import { createContext } from "react";

export const UserContext = createContext;

export default function UserProvider({ children }) {
  return <UserContext.Provider value="">{children}</UserContext.Provider>;
}
