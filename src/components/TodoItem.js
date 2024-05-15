"use client";

import styled from "styled-components";

export default function TodoItem({ id, title, isCompleted }) {
  return (
    <Wrapper>
      <ItemWrapper> {title}</ItemWrapper>
      <ItemWrapper> {isCompleted}</ItemWrapper>
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
`;
