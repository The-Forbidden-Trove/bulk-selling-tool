import { useEffect, useState } from "react";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../..";
import { useAuth } from "../../api/oauth/AuthContext";
import { initCurrencies } from "../../reducers/currencyTypeReducer";
import { initStashes } from "../../reducers/stashReducer";
import { currencies, StashTab } from "../../types";
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
import { FaCheck, FaRedo } from "react-icons/fa";
import { Checkbox } from "../Checkbox";
import {
  filterByMinStack,
  selectAllItems,
  unselectAllItems,
} from "../../reducers/itemReducer";

const MainInterface = () => {
  const league = useAppSelector((store) => store.leagues).defaultLeague;
  const exPrice = useAppSelector((store) => store.exaltedPrice);
  const items = useAppSelector((store) => store.items);
  const [selectAll, setSelectAll] = useState(true);

  let selectedTabsCount = 0;

  useAppSelector((store) => store.stashes).forEach((x: StashTab) => {
    if (x.isSelected) {
      selectedTabsCount += 1;
    }
  });

  const [itemFilter, setItemFilter] = useState<string>("");
  const [stackSize, setStackSize] = useState(0);
  const { authService } = useAuth();
  const dispatch = useAppDispatch();

  const [exaltedPrice, setExaltedPrice] = useState<string>(`${exPrice.value}`);

  const handleStackChange = (e: any) => {
    const val = e.target.value;
    if (val.match(/^\d*$/)) setStackSize(val);
  };

  const filterItemsByStack = () => {
    dispatch(filterByMinStack(stackSize));
  };

  const handleSelectAll = () => {
    if (selectAll) {
      console.log(selectAll);
      dispatch(unselectAllItems());
      setSelectAll(false);
    } else {
      console.log(selectAll);
      dispatch(selectAllItems());
      setSelectAll(true);
    }
  };
  const onKeyPress = (event: any) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (!/^[0-9\b.]+$/.test(keyValue)) event.preventDefault();
  };

  const handleExaltedChange = (e: any) => {
    const val = e.target.value;
    if (/^\d*\.?\d*$/.test(val)) {
      setExaltedPrice(val);
    }
  };

  const handleExReset = () => {
    dispatch(resetExaltPrice());
    setExaltedPrice(`${exPrice.defaultValue}`);
  };

  const handleSetExalt = () => {
    dispatch(setExaltPrice(Number(exaltedPrice) || 0));
  };

  useEffect(() => {
    dispatch(initStashes(authService.getAuthTokens().access_token, league));
    dispatch(initCurrencies(currencies));
  }, [league]);

  useEffect(() => {
    setExaltedPrice(`${exPrice.value}`);
  }, [dispatch, exPrice]);

  useEffect(() => {
    setSelectAll(
      Object.values(items)
        .flat()
        .every((x: any) => {
          return x.isSelected;
        })
    );
  }, [items]);

  return (
    <Wrapper>
      <StashTabPicker />
      <Wrap>
        <Header2>Picked Tabs</Header2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "36px",
            padding: "5px 0px",
          }}
        >
          <div style={{ display: "flex" }}>
            <Filter
              placeholder="Find items..."
              value={itemFilter}
              onChange={(e) => setItemFilter(e.target.value)}
            />
            <MinStack>
              <StackText>Min stack</StackText>
              <StackInput
                value={stackSize}
                onChange={handleStackChange}
                onKeyPress={onKeyPress}
              />
              <FaCheck style={iconStyle} onClick={filterItemsByStack} />
            </MinStack>
          </div>
          {selectedTabsCount === 0 ? (
            <Placeholder>Here will be your selected tabs...</Placeholder>
          ) : (
            <PickedTabs />
          )}
          <ExWrap>
            <P>
              <P style={{ width: "90px" }}>Ex Price</P>
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
              value={exaltedPrice}
              onKeyPress={onKeyPress}
              onChange={handleExaltedChange}
            />

            <FaCheck style={iconStyle} onClick={(e) => handleSetExalt()} />
            <FaRedo style={iconStyle} onClick={(e) => handleExReset()} />
          </ExWrap>
        </div>

        <ItemRecordWrap isSelected={true}>
          <NameWrap onClick={handleSelectAll}>
            <Checkbox
              checked={selectAll}
              onChange={() => {}}
              style={selectAll ? { opacity: 1 } : { opacity: 0.5 }}
            />
            <p
              style={{
                fontSize: "24px",
                color: "#33ACD0",
                padding: "0px 0px 0px 10px",
              }}
            >
              Name
            </p>
          </NameWrap>
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
  );
};

export default MainInterface;

const Wrap = styled.div`
  width: 100%;
  height: 15%;
`;

const Wrapper = styled(FlexWrap)`
  flex-direction: column;
  width: 83vw;
  height: 83vh;
  background: ${(props) => props.theme.colors.bg};
  box-shadow: 4px 5px 52px rgba(0, 0, 0, 0.8);
  -webkit-box-shadow: 4px 5px 52px rgba(0, 0, 0, 0.8);
  -moz-box-shadow: 4px 5px 52px rgba(0, 0, 0, 0.8);
  padding: 15px 35px;
  margin: 20px 0px 10px 0px;
  border-radius: 15px;
  opacity: 0.9;
  border: 3px solid ${(props) => props.theme.colors.fg2};

  overflow: hidden;
`;

const StackText = styled.h3`
  width: 64px;
  text-align: center;
  padding: 5px 0px;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontS};
`;
const Header2 = styled.h3`
  text-align: center;
  padding: 5px 0px;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontM};
`;
const ItemRecordWrap = styled(FlexWrap)<{ isSelected?: boolean }>`
  width: 100%;
  opacity: ${(props) => (props.isSelected ? 1 : 0.4)};
  justify-items: flex-start;
  font-size: ${(props) => props.theme.fontM};
`;

const P = styled(FlexWrap)`
  font-size: 22px;
  color: ${(props) => props.theme.colors.text};
  padding: 0px 5px;
`;

const Label = styled(FlexWrap)`
  justify-content: center;
  font-size: ${(props) => props.theme.fontL};
  color: ${(props) => props.theme.colors.accent};
  padding: 0px 0px 5px 0px;
  width: 15%;
`;
const Filter = styled(Input)`
  font-size: ${(props) => props.theme.fontM};
  height: 12px;
`;

const MinStack = styled(FlexWrap)``;

const StackInput = styled(Input)`
  font-size: ${(props) => props.theme.fontM};
  height: 12px;
  width: 32px;
`;
const ExaltedValue = styled(Input)`
  color: ${(props) => props.theme.colors.text};
  padding: 0px;
  width: 85px;
  font-size: 22px;
  text-align: center;
  border-bottom: 1px solid #555;
`;
const ExWrap = styled(FlexWrap)`
  width: 35%;
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
  padding: 0px 5px;
`;

const Placeholder = styled.div`
  font-size: ${(props) => props.theme.fontM};
  color: ${(props) => props.theme.colors.text};
  opacity: 0.5;
  height: 36px;
  width: 100%;
  padding: 7px 0px 0px 50px;
  text-align: center;
`;

const iconStyle = {
  fill: "#555",
  padding: "0px 5px",
  cursor: "pointer",
};

const NameWrap = styled(FlexWrap)`
  width: 25%;
  justify-content: flex-start;
  outline: none;
  border: none;
  cursor: pointer;
`;
