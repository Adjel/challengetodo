"use client";

import TodoProvider from "./TodoProvider";
import UserProvider from "./UserProvider";

function Providers({ children }) {
  return (
    <UserProvider>
      <TodoProvider>{children}</TodoProvider>
    </UserProvider>
  );
}

export default Providers;
