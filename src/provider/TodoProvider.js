import { createContext, useContext, useEffect, useState } from "react";
import { addDoc, collection, db, onSnapshot } from "../Firebase";
import { UserContext } from "./UserProvider";

export const TodoContext = createContext();

export default function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      const ref = collection(db, "users", user.uid, "todos");
      const unsubscribe = onSnapshot(ref, (querySnapshot) => {
        const allTodos = [];
        querySnapshot.forEach((doc) => {
          allTodos.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setTodos(allTodos);
        console.log("todos loeaded");
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  async function handleTodoInput({ title, isCompleted }) {
    const ref = collection(db, "users", user.uid, "todos");
    const docRef = await addDoc(ref, {
      title: title,
      completed: isCompleted,
    });
    console.log({ user });
    console.log({ docRef });
  }

  return (
    <TodoContext.Provider value={{ todos, handleTodoInput }}>
      {children}
    </TodoContext.Provider>
  );
}
