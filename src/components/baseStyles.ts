import styled from "styled-components";

export const Button = styled.button`
  color: ${(props) => props.theme.colors.accent};
  background: none;
  padding: 0px 10px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: 0.3s ease;
  &:hover {
    opacity: 0.8;
  }
`;

export const FlexWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

export const Input = styled.input`
  border: none;

  border-bottom: 1px solid ${(props) => props.theme.colors.accentDark};
  color: ${(props) => props.theme.colors.accent2};
  background: none;
  outline: none;
  padding: 10px;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);

  transition: 0.3s ease;
  &:hover,focus {
    opacity: 0.8;
  }
`;

export const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  white-space: nowrap;
  width: 1px;

  visibility: hidden;
  border-radius: 3px;
`;

export const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${(props) => (props.checked ? "#555" : "papayawhip")};
  border-radius: 3px;
  transition: all 150ms;
`;

export const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;
