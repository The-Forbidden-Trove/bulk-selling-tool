import { useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../..";
import { useAuth } from "../../api/oauth/AuthContext";
import { selectStash } from "../../reducers/stashReducer";
import { NinjaItem } from "../../types";
import { Button, FlexWrap, Input } from "../baseStyles";
import AllTabs from "./AllTabs";
import CurrencyTypePicker from "./CurrencyTypePicker";

const StashTabPicker = () => {
  const league = useAppSelector((store) => store.leagues).defaultLeague;

  const [input, setInput] = useState<string>("100%");

  const { authService } = useAuth();
  const dispatch = useAppDispatch();

  const ninjaItems: Record<string, NinjaItem> = JSON.parse(
    window.localStorage.getItem("ninjaItems") || "{}"
  );

  const click = () => {
    dispatch(
      selectStash(
        authService.getAuthTokens().access_token,
        league,
        Number(input.substr(0, input.length - 1)) || 0,
        ninjaItems
      )
    );
    setInput("100%");
  };

  const handleMultiplierChange = (e: any) => {
    const val = e.target.value;
    if (/^\d*\.?\d*%$/.test(val)) {
      setInput(val);
    }
  };
  const onKeyPress = (event: any) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (!/^[0-9\b.]+$/.test(keyValue)) event.preventDefault();
  };
  return (
    <div style={{ margin: "5px 0px", height: "35%" }}>
      <Header>Tab picker</Header>
      <Wrapper>
        <AllTabs />
        <CurrencyTypePicker />
        <ButtonWrap>
          <FlexWrap>
            <P>Item multiplier</P>
            <Multiplier
              placeholder="Default multiplier 100%"
              value={input}
              onChange={handleMultiplierChange}
              onKeyPress={onKeyPress}
            />
          </FlexWrap>
          <AddTab onClick={() => click()}>Select tab</AddTab>
        </ButtonWrap>
      </Wrapper>
    </div>
  );
};

export default StashTabPicker;

const Wrapper = styled(FlexWrap)`
  flex-direction: column;
`;
const ButtonWrap = styled(FlexWrap)`
  padding: 10px 0px;
  align-self: flex-end;
`;
const Multiplier = styled(Input)`
  width: 60px;
  color: ${(props) => props.theme.colors.accent2};
  font-size: ${(props) => props.theme.fontM};
`;
const P = styled.p`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontM};
  padding: 0px 5px 0px 0px;
`;

const Header = styled.h3`
  text-align: center;
  margin: 5px 0px;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontM};
`;
const AddTab = styled(Button)`
  color: ${(props) => props.theme.colors.accent};
  font-size: ${(props) => props.theme.fontM};
`;
