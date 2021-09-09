import { useState } from "react";
import styled from "styled-components";
import { CurrencyType } from "../../types";
import { FlexWrap } from "../baseStyles";

const Wrapper = styled.div`
  color: ${(props) => props.theme.colors.accent};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
const TypeWrap = styled(FlexWrap)`
  margin: 5px;
  > p {
    color: ${(props) => props.theme.colors.text};
    font-size: ${(props) => props.theme.fontM};
    padding: 0px 5px;
  }
  > img {
    width: 36px;
    height: 36px;
    object-fit: contain;
  }
`;
const CurrencyTypePicker = () => {
  const [currencyTypes, setCurrencyTypes] = useState<CurrencyType[]>([]);

  return (
    <Wrapper>
      {currencyTypes.map((currencyType: CurrencyType) => {
        return <TypeWrap>{currencyType.type}</TypeWrap>;
      })}
    </Wrapper>
  );
};

export default CurrencyTypePicker;
