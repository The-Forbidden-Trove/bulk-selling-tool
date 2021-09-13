import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../..";
import { unselectAllCurrencyTypes } from "../../reducers/currencyTypeReducer";
import { selectStash } from "../../reducers/stashReducer";
import { CurrencyType } from "../../types";
import { Button, FlexWrap } from "../baseStyles";
import AllTabs from "./AllTabs";
import CurrencyTypePicker from "./CurrencyTypePicker";

const Wrapper = styled(FlexWrap)`
  flex-direction: column;
`;
const ButtonWrap = styled(FlexWrap)`
  align-self: flex-end;
`;
const AddTab = styled(Button)`
  color: ${(props) => props.theme.colors.accent2};
  font-size: ${(props) => props.theme.fontM};
`;
const StashTabPicker = () => {
  const dispatch = useAppDispatch();
  const types = useAppSelector((store) => store.currencyTypes).filter(
    (currencyType: CurrencyType) => {
      return currencyType.isSelected === true;
    }
  );
  const click = (multiplier: number) => {
    dispatch(selectStash(types, multiplier));
    dispatch(unselectAllCurrencyTypes());
  };
  return (
    <div>
      <h3>Tab picker</h3>
      <Wrapper>
        <AllTabs />
        <CurrencyTypePicker />
        <ButtonWrap>
          <input />
          <AddTab onClick={() => click(100)}>Select tab</AddTab>
        </ButtonWrap>
      </Wrapper>
    </div>
  );
};

export default StashTabPicker;
