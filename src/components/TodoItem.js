"use client";

import { TodoContext } from "@/provider/TodoProvider";
import { useContext } from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TodoItem({ id, title, isCompleted }) {
  const { todos, handleDelete } = useContext(TodoContext);

  const notify = (message) => toast(`${message}`);

  function handleOnClickDelete() {
    if (!todos.find((item) => item.id === id))
      return notify("Cant't delete this todo");
    handleDelete(id, notify);
  }

  return (
    <Wrapper>
      <ItemWrapper>
        {title}
        <input type="checkbox" checked={isCompleted}></input>
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
