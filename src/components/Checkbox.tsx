import styled from "styled-components";
import {
  CheckboxContainer,
  StyledCheckbox,
  HiddenCheckbox,
} from "./baseStyles";

const Icon = styled.svg<{ checked: boolean }>`
  fill: none;
  stroke: white;
  stroke-width: 2px;

  visibility: ${(props) => (props.checked ? "visible" : "hidden")};
`;

export const Checkbox = ({ checked, ...props }: any) => (
  <CheckboxContainer>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24" checked={checked}>
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);
