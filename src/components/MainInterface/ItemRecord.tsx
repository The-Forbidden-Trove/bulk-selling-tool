import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../..";
import {
  resetChaosValue,
  resetMultiplierValue,
  toggleItemSelect,
  updateChaosValue,
  updateMultiplierValue,
} from "../../reducers/itemReducer";
import { FlexWrap, Input } from "../baseStyles";
import { FaCheck, FaRedo } from "react-icons/fa";
import { Checkbox } from "../Checkbox";

const iconStyle = {
  fill: "#555",
  padding: "0px 5px",
  cursor: "pointer",
};

const ItemRecord = ({ item }: any) => {
  const [multiplier, setMultiplier] = useState(`${item.multiplier}%`);
  const [chaosValue, setChaosValue] = useState(
    `${Math.round((item.sellValue + Number.EPSILON) * 100) / 100}`
  );

  const dispatch = useAppDispatch();

  const handleMultiplierChange = (e: any) => {
    const val = e.target.value;
    if (/^\d*\.?\d*%$/.test(val)) {
      setMultiplier(val);
    }
  };
  const updateMultiplierPrice = () => {
    dispatch(
      updateMultiplierValue(item.name, Number(multiplier.slice(0, -1)) || 0)
    );
    setMultiplier(multiplier);
  };
  const setDefaultMultiplierValue = () => {
    dispatch(resetMultiplierValue(item.name, Number(item.multiplier)));
    setMultiplier(`${item.multiplier}%`);
  };

  const handleChaosChange = (e: any) => {
    const val = e.target.value;
    if (/^\d*\.?\d*$/.test(val)) {
      setChaosValue(val);
    }
  };

  const updateChaosPrice = () => {
    dispatch(updateChaosValue(item.name, Number(chaosValue) || 0));
  };

  const setDefaultChaosPrice = () => {
    dispatch(resetChaosValue(item.name, Number(item.chaosEquivalent)));
    setChaosValue(item.chaosEquivalent);
  };

  const onKeyPress = (event: any) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (!/^[0-9\b.]+$/.test(keyValue)) event.preventDefault();
  };

  const exPrice = useAppSelector((store) => store.exaltedPrice).value || 1;

  useEffect(() => {
    setMultiplier(`${item.multiplier}%`);
    setChaosValue(`${item.sellValue}`);
  }, [item, item.sellValue, item.multiplier]);

  return (
    <ItemRecordWrap isSelected={item.isSelected}>
      <NameWrap onClick={() => dispatch(toggleItemSelect(item.name))}>
        <Checkbox checked={item.isSelected} onChange={() => { }} />
        <Icon
          src={item.icon}
          alt="icon"
          style={{ padding: "0px 5px 0px 10px" }}
        />
        <P>{item.name}</P>
      </NameWrap>
      <StackSizeWrap>
        <P>{item.stackSize}</P>
      </StackSizeWrap>

      <PriceWrap>
        <Icon
          src={
            "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?scale=1&w=1&h=1"
          }
        />
        <ChaosValue
          value={chaosValue}
          onChange={handleChaosChange}
          onKeyPress={onKeyPress}
        />
        <FaCheck style={iconStyle} onClick={(e) => updateChaosPrice()} />
        <FaRedo style={iconStyle} onClick={(e) => setDefaultChaosPrice()} />
      </PriceWrap>

      <PriceWrap style={{ padding: "0px 0px 0px 15px" }}>
        <Multiplier
          value={multiplier}
          onChange={handleMultiplierChange}
          onKeyPress={onKeyPress}
        />

        <FaCheck style={iconStyle} onClick={(e) => updateMultiplierPrice()} />
        <FaRedo
          style={iconStyle}
          onClick={(e) => setDefaultMultiplierValue()}
        />
      </PriceWrap>
      <PriceWrap>
        <Icon
          src={
            "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?scale=1&w=1&h=1"
          }
        />
        <PriceP>
          {Math.round((item.totalValue + Number.EPSILON) * 100) / 100}
        </PriceP>
      </PriceWrap>

      <PriceWrap>
        <Icon
          src={
            "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lNb2RWYWx1ZXMiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/e1a54ff97d/CurrencyModValues.png"
          }
        />
        <PriceP>
          {Math.round(((item.totalValue + Number.EPSILON) * 100) / exPrice) /
            100}
        </PriceP>
      </PriceWrap>
    </ItemRecordWrap>
  );
};

const Multiplier = styled(Input)`
  color: ${(props) => props.theme.colors.text};

  text-align: center;
  width: 80px;
  font-size: 22px;
  margin: 0;

  padding: 2px 2px 2px 5px;
  border-radius: 4px;
`;
const ChaosValue = styled(Input)`
  max-width: 120px;
  font-size: 22px;

  text-align: center;
  color: ${(props) => props.theme.colors.text};
  padding: 2px 2px 2px 5px;
  border-radius: 4px;
`;

const ItemRecordWrap = styled(FlexWrap) <{ isSelected?: boolean }>`
  width: 100%;
  padding: 5px 0px;

  font-family: "Fontin SmallCaps";
  opacity: ${(props) => (props.isSelected ? 1 : 0.4)};
  font-size: ${(props) => props.theme.fontM};
  justify-content: space-between;
`;

const P = styled(FlexWrap)`
  font-size: 22px;
  color: ${(props) => props.theme.colors.text};
`;
const PriceP = styled.p`
  width: 100px;
  font-size: 22px;
  text-align: center;
  color: ${(props) => props.theme.colors.text};
`;

const NameWrap = styled(FlexWrap)`
  width: 25%;
  justify-content: flex-start;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
`;

const Icon = styled.img`
  padding: 0px 5px 0px 0px;
  width: 36px;
  height: 36px;
  object-fit: contain;
`;

const StackSizeWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 15%;
`;

const PriceWrap = styled(FlexWrap)`
  justify-content: center;
  width: 15%;
`;

export default ItemRecord;
