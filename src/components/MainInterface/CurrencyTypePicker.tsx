import { useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../..";
import { currencies, CurrencyType } from "../../types";
import { toggleSelectCurrency } from "../../reducers/currencyTypeReducer";
import { FlexWrap, Button } from "../baseStyles";

const Wrapper = styled.div`
  color: ${(props) => props.theme.colors.accent};
  display: flex;
  flex-wrap: wrap;
`;
const TypeWrap = styled(FlexWrap)<{ isSelected?: boolean }>`
  cursor: pointer;
  max-height: 42px;
  margin: 0px 5px;
  > p {
    color: ${(props) =>
      props.isSelected ? props.theme.colors.accent : props.theme.colors.text};
    font-size: ${(props) => props.theme.fontM};
    padding: 0px 5px;
  }
  > img {
    width: 42px;
    height: 42px;
    object-fit: contain;
  }
`;
const CurrencyTypePicker = () => {
  const currencyTypes = useAppSelector((store) => store.currencyTypes);
  // "#33ACD0"
  // color change instead of a checkbox
  const dispatch = useAppDispatch();

  return (
    <Wrapper>
      {currencyTypes.map((currencyType: CurrencyType) => {
        return (
          <TypeWrap
            isSelected={currencyType.isSelected}
            onClick={() => dispatch(toggleSelectCurrency(currencyType.type))}
          >
            <img src={currencyType.icon} alt="icon" />
            <p>{currencyType.type}</p>
          </TypeWrap>
        );
      })}
    </Wrapper>
  );
};

export default CurrencyTypePicker;
