import AddTodo from "@/components/AddTodo";
import Disconnect from "@/components/Disconnect";
import TodoItem from "@/components/TodoItem";
import { useContext } from "react";
import { TodoContext } from "@/provider/TodoProvider";

export default function TodoList() {
  const { todos } = useContext(TodoContext);
  return (
    <>
      {todos.map(({ id, title, completed }) => (
        <TodoItem id={id} title={title} isCompletedProp={completed} />
      ))}
      <AddTodo />

      <Disconnect />
    </>
  );
}
