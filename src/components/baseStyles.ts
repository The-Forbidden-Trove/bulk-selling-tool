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

export const Input = styled.input`
  border: none;

  color: ${(props) => props.theme.colors.accent2};
  background: none;
  outline: none;
  padding: 10px;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
`;
