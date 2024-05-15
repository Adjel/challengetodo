import { createContext } from "react";

export const TodoContext = createContext;

export default function TodoProvider({ children }) {
  return <TodoContext.Provider value="">{children}</TodoContext.Provider>;
}
