import { createContext, useContext, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  db,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "../Firebase";
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

  async function handleDelete(todoId, notify) {
    try {
      const ref = doc(db, "users", user.uid, "todos", todoId);
      await deleteDoc(ref);
    } catch (e) {
      notify(e);
    }
  }

  async function handleUpdate({ title, isCompleted, id }) {
    const ref = doc(db, "users", user.uid, "todos", id);
    await updateDoc(ref, {
      title: title,
      completed: isCompleted,
    });
    console.log({ title }), console.log({ isCompleted });
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        handleTodoInput,
        handleDelete,
        handleUpdate,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
