import { useEffect, useState } from "react";

import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../..";
import { useAuth } from "../../api/oauth/AuthContext";
import { initCurrencies } from "../../reducers/currencyTypeReducer";
import { initStashes } from "../../reducers/stashReducer";
import { currencies } from "../../types";
import PickedItems from "./PickedItems";
import PickedTabs from "./PickedTabs";
import StashTabPicker from "./StashTabPicker";
import { FlexWrap, Input } from "../baseStyles";
import TotalValue from "./TotalValue";
import {
  resetExaltPrice,
  setExaltPrice,
} from "../../reducers/exaltPriceReducer";
import GeneratedMessage from "../GeneratedMessage/GeneratedMessage";

const MainInterface = () => {
  const league = useAppSelector((store) => store.leagues).defaultLeague;
  const exPrice = useAppSelector((store) => store.exaltedPrice).value;

  const [itemFilter, setItemFilter] = useState<string>("");
  const { authService } = useAuth();
  const dispatch = useAppDispatch();

  const onKeyPress = (event: any) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (!/^[0-9\b.]+$/.test(keyValue)) event.preventDefault();
  };

  const handleExaltedChange = (e: any) => {
    const val = e.target.value;
    if (/^\d*\.?\d*$/.test(val)) {
      dispatch(setExaltPrice(Number(val) || 1));
    }
  };

  const handleExReset = () => {
    dispatch(resetExaltPrice());
  };

  useEffect(() => {
    dispatch(initStashes(authService.getAuthTokens().access_token, league));

    dispatch(initCurrencies(currencies));
  }, [league]);

  return (
    <>
      <Wrapper>
        <Header>TFT Bulk Selling Tool</Header>
        <StashTabPicker />
        <PickedTabs />
        <Wrap>
          <Header2>Picked Items</Header2>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Filter
              placeholder="Filter items..."
              value={itemFilter}
              onChange={(e) => setItemFilter(e.target.value)}
            />

            <ExWrap>
              <P onClick={handleExReset}>
                <Icon
                  src={
                    "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?scale=1&w=1&h=1"
                  }
                />
                <p>/</p>

                <Icon
                  src={
                    "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyAddModToRare.png?scale=1&w=1&h=1"
                  }
                />
              </P>
              <ExaltedValue
                value={exPrice}
                onKeyPress={onKeyPress}
                onChange={handleExaltedChange}
              />
            </ExWrap>
          </div>
          <ItemRecordWrap isSelected={true}>
            <Label>Name</Label>
            <Label>Stack size</Label>
            <Label>Item value</Label>
            <Label>Multiplier</Label>
            <Label>Chaos value</Label>
            <Label>Exalt value</Label>
          </ItemRecordWrap>
        </Wrap>
        <PickedItems filter={itemFilter} />
        <TotalValue />

        <GeneratedMessage />
      </Wrapper>
    </>
  );
};

export default MainInterface;

const Wrap = styled.div`
  grid-column: 1 / -1;

  margin: 0px 5px 0px 5px;
  padding: 0px 25px;
`;

const Wrapper = styled.div`
  width: 75%;
  height: 75%;
  background: ${(props) => props.theme.colors.bg};
  box-shadow: 4px 5px 52px rgba(0, 0, 0, 0.8);
  -webkit-box-shadow: 4px 5px 52px rgba(0, 0, 0, 0.8);
  -moz-box-shadow: 4px 5px 52px rgba(0, 0, 0, 0.8);
  padding: 25px;
  margin: 55px 0px 10px 0px;
  border-radius: 15px;
  opacity: 0.9;
  border: 3px solid ${(props) => props.theme.colors.fg2};

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 3fr 0.5fr 4fr 1fr;
  grid-gap: 0px 20px;

  overflow: hidden;
`;

const Header = styled.h2`
  margin: 5px 0px;
  grid-column: 1 / -1;
  text-align: center;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontL};
`;

const Header2 = styled.h3`
  text-align: center;
  margin: 5px 0px;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontM};
`;
const ItemRecordWrap = styled.div<{ isSelected?: boolean }>`
  display: grid;
  opacity: ${(props) => (props.isSelected ? 1 : 0.4)};
  justify-items: start;
  grid-row-gap: 20px;
  font-size: ${(props) => props.theme.fontM};
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  grid-auto-columns: min-content;
  grid-auto-rows: min-content;
`;

const P = styled(FlexWrap)`
  font-size: 22px;
  color: ${(props) => props.theme.colors.text};
  margin: 0px 5px;
`;

const Label = styled(FlexWrap)`
  font-size: ${(props) => props.theme.fontL};
  color: ${(props) => props.theme.colors.accent};
  margin: 15px 0px;
`;
const Filter = styled(Input)`
  font-size: ${(props) => props.theme.fontM};
`;

const ExaltedValue = styled(Input)`
  color: ${(props) => props.theme.colors.text};
  padding: 0px;
  width: 80px;
  font-size: 22px;
  margin: 0px 15px 0px 0px;
`;
const ExWrap = styled(FlexWrap)`
  cursor: pointer;
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
  margin: 0px 5px;
`;
