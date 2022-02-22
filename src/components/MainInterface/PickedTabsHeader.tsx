import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../..";
import { FlexWrap, Input } from "../baseStyles";
import { FaCheck, FaRedo } from "react-icons/fa";
import {
  filterByMinStack,
  filterByMinTotalValue,
  filterByMinValue,
} from "../../reducers/itemReducer";
import {
  resetExaltPrice,
  setExaltPrice,
} from "../../reducers/exaltPriceReducer";
import { StashTab } from "../../types";
import PickedTabs from "./PickedTabs";
import {
  selectItemOptionsSet,
  setItemOptionsSearch,
  unselectItemOptionsSet,
} from "../../reducers/itemOptionsReducer";

const PickedTabsHeader = () => {
  const dispatch = useAppDispatch();
  const exPrice = useAppSelector((store) => store.exaltedPrice);
  const itemOptions = useAppSelector((store) => store.itemOptions);

  let selectedTabsCount = 0;

  useAppSelector((store) => store.stashes).forEach((x: StashTab) => {
    if (x.isSelected) {
      selectedTabsCount += 1;
    }
  });

  const [itemFilter, setItemFilter] = useState<string>(
    itemOptions.search || ""
  );
  const [stackSize, setStackSize] = useState(0);
  const [minValue, setMinValue] = useState(0);
  const [minTotalValue, setMinTotalValue] = useState(0);
  const [exaltedPrice, setExaltedPrice] = useState<string>(`${exPrice.value}`);

  const handleStackChange = (e: any) => {
    const val = e.target.value;
    if (val.match(/^\d*$/)) setStackSize(val);
  };

  const filterItemsByStack = () => {
    dispatch(filterByMinStack(stackSize));
  };
  const handleValueChange = (e: any) => {
    const val = e.target.value;
    if (val.match(/^\d*\.?\d*$/)) setMinValue(val);
  };

  const filterItemsByValue = () => {
    dispatch(filterByMinValue(minValue));
  };
  const handleTotalValueChange = (e: any) => {
    const val = e.target.value;
    if (val.match(/^\d*\.?\d*$/)) setMinTotalValue(val);
  };
  const filterItemsByTotalValue = () => {
    dispatch(filterByMinTotalValue(minTotalValue));
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

  const handleFilterChange = (e: any) => {
    const val = e.target.value;
    setItemFilter(val);
    dispatch(setItemOptionsSearch(val));
  };

  const handleExReset = () => {
    dispatch(resetExaltPrice());
    setExaltedPrice(`${exPrice.defaultValue}`);
  };

  const handleSetExalt = () => {
    dispatch(setExaltPrice(Number(exaltedPrice) || 0));
  };

  const handleSetToggle = (name: string) => {
    const set = itemOptions.fragmentSets.find((x: any) => {
      return x.name === name;
    });

    if (set && set.isSelected) {
      dispatch(unselectItemOptionsSet(name));
    } else {
      dispatch(selectItemOptionsSet(name));
    }
  };

  useEffect(() => {
    setExaltedPrice(`${exPrice.value}`);
  }, [dispatch, exPrice]);

  //<Header2 style={{ width: "20%" }}>Picked Tabs</Header2>
  return (
    <Wrap>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "36px",
            padding: "5px 0px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "50%",
            }}
          >
            <Stack>
              <StackText>Min asking price</StackText>
              <StackInput
                value={minValue}
                onChange={handleValueChange}
                onKeyPress={onKeyPress}
              />
              <FaCheck style={iconStyle} onClick={filterItemsByValue} />
            </Stack>
            <Stack>
              <StackText>Min chaos value</StackText>
              <StackInput
                value={minTotalValue}
                onChange={handleTotalValueChange}
                onKeyPress={onKeyPress}
              />
              <FaCheck style={iconStyle} onClick={filterItemsByTotalValue} />
            </Stack>
            <Stack>
              <StackText>Min stack</StackText>
              <StackInput
                value={stackSize}
                onChange={handleStackChange}
                onKeyPress={onKeyPress}
              />
              <FaCheck style={iconStyle} onClick={filterItemsByStack} />
            </Stack>
          </div>

          <div
            style={{
              display: "flex",
              width: "50%",
              justifyContent: "flex-end",
            }}
          >
            {itemOptions.fragmentSets.map((set: any) => {
              return (
                <SetWrapper
                  isSelected={set.isSelected}
                  key={set.name}
                  onClick={() => handleSetToggle(set.name)}
                >
                  <Icon
                    src={set.icon}
                    onClick={() => handleSetToggle(set.name)}
                  />
                </SetWrapper>
              );
            })}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "36px",
            padding: "5px 0px",
          }}
        >
          <Filter
            placeholder="Find items..."
            value={itemFilter}
            onChange={(e: any) => handleFilterChange(e)}
          />
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
      </div>
    </Wrap>
  );
};
export default PickedTabsHeader;

const SetWrapper = styled(FlexWrap)<{ isSelected: boolean }>`
  padding: 0px 3px;
  opacity: ${(props) => (props.isSelected ? 1 : 0.5)};
  cursor: pointer;
`;
const Wrap = styled.div`
  width: 100%;
  height: 13%;
`;

const StackText = styled.h3`
  width: 8em;
  text-align: center;
  padding: 5px 0px;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontS};
`;
const Header2 = styled.h3`
  text-align: center;
  padding: 0px 0px;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontM};
`;

const P = styled(FlexWrap)`
  font-size: 22px;
  color: ${(props) => props.theme.colors.text};
  padding: 0px 5px;
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

const ExaltedValue = styled(Input)`
  color: ${(props) => props.theme.colors.text};
  padding: 0px;
  width: 85px;
  font-size: 22px;
  text-align: center;
  border-bottom: 1px solid #555;
`;

const Filter = styled(Input)`
  font-size: ${(props) => props.theme.fontM};
  height: 12px;
`;

const Stack = styled(FlexWrap)`
  padding: 0px 5px 0px 0px;
`;

const StackInput = styled(Input)`
  font-size: ${(props) => props.theme.fontM};
  height: 12px;

  text-align: center;
  width: 32px;
`;
