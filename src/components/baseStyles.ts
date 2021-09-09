import styled from "styled-components";

export const Button = styled.button`
  color: ${(props) => props.theme.colors.accent};
  background: none;
  padding: 0px 10px;
  outline: none;
  border: none;
  cursor: pointer;
`;

export const FlexWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`;
