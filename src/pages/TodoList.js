import Disconnect from "@/components/Disconnect";
import TodoItem from "@/components/TodoItem";
import { TodoContext } from "@/provider/TodoProvider";
import { useContext, useEffect, useState } from "react";

export default function TodoList() {
  const [todo, setTodo] = useState({
    title: "",
    isCompleted: false,
  });

  const { todos, handleTodoInput } = useContext(TodoContext);

  function handleTodo(event) {
    const { name, value, checked } = event.target;
    setTodo({
      ...todo,
      [name]: name === "isCompleted" ? checked : value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleTodoInput(todo);
  }

  return (
    <>
      {todos.map(({ id, title, isCompleted }) => (
        <TodoItem id={id} title={title} isCompleted={isCompleted} />
      ))}
      <form>
        <label htmlFor="title">Title:</label>
        <input
          type="title"
          id="title"
          name="title"
          value={todo.title}
          onChange={(event) => handleTodo(event)}
        ></input>
        <label htmlFor="isCompleted">Completed:</label>
        <input
          type="checkbox"
          id="isCompleted"
          name="isCompleted"
          value={todo.isCompleted}
          onChange={(event) => handleTodo(event)}
        ></input>
        <button type="submit" onClick={(event) => handleSubmit(event)}>
          Create
        </button>
      </form>
      <Disconnect />
    </>
  );
}
