import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../..";
import { useAuth } from "../../api/oauth/AuthContext";
import { unselectAllCurrencyTypes } from "../../reducers/currencyTypeReducer";
import { initItems } from "../../reducers/itemReducer";
import { initStashItems, selectStash } from "../../reducers/stashReducer";
import { CurrencyType, StashTab } from "../../types";
import { Button, FlexWrap } from "../baseStyles";
import AllTabs from "./AllTabs";
import CurrencyTypePicker from "./CurrencyTypePicker";

const Wrapper = styled(FlexWrap)`
  flex-direction: column;
`;
const ButtonWrap = styled(FlexWrap)`
  align-self: flex-end;
`;
const Input = styled.input`
  border: none;

  color: ${(props) => props.theme.colors.accent2};
  background: none;
  outline: none;
  padding: 10px;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
`;

const Header = styled.h3`
  text-align: center;
  margin: 5px 0px;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontM};
`;
const AddTab = styled(Button)`
  color: ${(props) => props.theme.colors.accent2};
  font-size: ${(props) => props.theme.fontM};
`;
const StashTabPicker = () => {
  const [input, setInput] = useState<string>();

  const { authService } = useAuth();
  const dispatch = useAppDispatch();

  const highlightedStash = useAppSelector((store) =>
    store.stashes.find((stash: StashTab) => {
      return stash.isHighlited === true;
    })
  );

  const selectedStashes: StashTab[] = useAppSelector(
    (store: any) => store.stashes
  ).filter((stash: StashTab) => {
    return stash.isSelected;
  });

  const types = useAppSelector((store) => store.currencyTypes).filter(
    (currencyType: CurrencyType) => {
      return currencyType.isSelected === true;
    }
  );

  const click = () => {
    dispatch(selectStash(types, !!input ? Number(input) : 100));
    dispatch(unselectAllCurrencyTypes());
    dispatch(
      initStashItems(
        authService.getAuthTokens().access_token,
        "expedition",
        highlightedStash,
        !!input ? Number(input) : 100
      )
    );
  };

  useEffect(() => {
    dispatch(initItems(selectedStashes));
  }, selectedStashes);

  return (
    <div style={{ margin: "5px 0px" }}>
      <Header>Tab picker</Header>
      <Wrapper>
        <AllTabs />
        <CurrencyTypePicker />
        <ButtonWrap>
          <Input
            placeholder="Default multiplier 100%"
            value={input}
            onChange={(e) => setInput(e.target.value.replace(/\D/, ""))}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          <AddTab onClick={() => click()}>Select tab</AddTab>
        </ButtonWrap>
      </Wrapper>
    </div>
  );
};

export default StashTabPicker;
