import { TodoContext } from "@/provider/TodoProvider";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

export default function AddTodo() {
  const [todo, setTodo] = useState({
    title: "",
    isCompleted: false,
  });

  const { todos, handleTodoInput } = useContext(TodoContext);

  const notify = (message) => toast(`${message}`);

  function handleTodo(event) {
    const { name, value, checked } = event.target;
    setTodo({
      ...todo,
      [name]: name === "isCompleted" ? checked : value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (todo.title === "") return notify("todo can't be empty ");
    if (todos.find((item) => item.title === todo.title))
      return notify("this todo already exist");
    if (await handleTodoInput(todo))
      setTodo({
        title: "",
        isCompleted: false,
      });
  }
  return (
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
  );
}
