"use client";

import { TodoContext } from "@/provider/TodoProvider";
import { useContext, useState } from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TodoItem({ id, title, isCompletedProp }) {
  const [todo, setTodo] = useState({
    title: title,
    isCompleted: isCompletedProp,
    id: id,
  });

  const [isShowingForm, setIsShowingForm] = useState(false);

  const { todos, handleDelete, handleUpdate } = useContext(TodoContext);

  const notify = (message) => toast(`${message}`);

  function handleOnClickDelete() {
    if (!todos.find((item) => item.id === id))
      return notify("Cant't delete this todo");
    handleDelete(id, notify);
  }

  function handleTodo(event) {
    const { name, value, checked } = event.target;
    setTodo({
      ...todo,
      [name]: name === "isCompleted" ? checked : value,
    });
  }

  function handleOnsubmit(event) {
    event.preventDefault();
    if (todo.title === "") {
      return notify("The title can't be empty");
    }
    if (
      todos.find((item) => item.title === todo.title && item.id !== todo.id)
    ) {
      return notify(
        "This todo already exist, this change will not be saved online"
      );
    }
    setIsShowingForm(!isShowingForm);
    handleTodo(event);
    handleUpdate(todo);
  }

  return (
    <Wrapper>
      <ItemWrapper>
        {!isShowingForm ? (
          <div onClick={() => setIsShowingForm(!isShowingForm)}>
            {todo.title}
          </div>
        ) : (
          <>
            <form>
              <label htmlFor="title">Title:</label>
              <input
                type="title"
                id="title"
                name="title"
                value={todo.title}
                onChange={(event) => handleTodo(event)}
              ></input>
              <button type="submit" onClick={(event) => handleOnsubmit(event)}>
                Modify
              </button>
            </form>
            <button onClick={() => setIsShowingForm(!isShowingForm)}>
              Cancel
            </button>
          </>
        )}
        <input
          type="checkbox"
          name="isCompleted"
          id="isCompleted"
          checked={todo.isCompleted}
          onChange={(event) => handleTodo(event)}
        ></input>
        <button onClick={() => handleOnClickDelete()}>Delete</button>
      </ItemWrapper>
      <ToastContainer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ItemWrapper = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`;
