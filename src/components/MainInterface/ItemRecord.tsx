import { useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../..";
import { toggleItemSelect, updateItemProps } from "../../reducers/itemReducer";
import { FlexWrap, Input } from "../baseStyles";

const ItemRecord = ({ item }: any) => {
  const [multiplier, setMultiplier] = useState(`${item.sellMultiplier}%`);
  const [chaosValue, setChaosValue] = useState(
    Math.round((item.sellValue + Number.EPSILON) * 100) / 100
  );

  const dispatch = useAppDispatch();

  const handleMultiplierChange = (e: any) => {
    const val = e.target.value;
    if (/^\d*\.?\d*%$/.test(val)) {
      setMultiplier(val);
      dispatch(
        updateItemProps(
          item.name,
          Number(val.substr(0, val.length - 1)) || 0,
          Number(chaosValue) || 0
        )
      );
    }
  };
  const handleChaosChange = (e: any) => {
    const val = e.target.value;
    if (/^\d*\.?\d*$/.test(val)) {
      setChaosValue(val);
      dispatch(
        updateItemProps(
          item.name,
          Number(multiplier.substr(0, multiplier.length - 1)) || 0,
          Number(val) || 0
        )
      );
    }
  };

  const onKeyPress = (event: any) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (!/^[0-9\b.]+$/.test(keyValue)) event.preventDefault();
  };

  const exPrice = useAppSelector((store) => store.exaltedPrice).value || 1;

  return (
    <ItemRecordWrap isSelected={item.isSelected}>
      <NameWrap onClick={() => dispatch(toggleItemSelect(item.name))}>
        <Icon src={item.icon} alt="icon" />
        <P>{item.name}</P>
      </NameWrap>
      <P>{item.stackSize}</P>
      <P>
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
      </P>
      <P>
        <Multiplier
          value={multiplier}
          onChange={handleMultiplierChange}
          onKeyPress={onKeyPress}
        />
      </P>
      <P>
        <Icon
          src={
            "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?scale=1&w=1&h=1"
          }
        />
        {Math.round((item.totalValue + Number.EPSILON) * 100) / 100}
      </P>

      <P>
        <Icon
          src={
            "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyAddModToRare.png?scale=1&w=1&h=1"
          }
        />
        {Math.round(((item.totalValue + Number.EPSILON) * 100) / exPrice) / 100}
      </P>
    </ItemRecordWrap>
  );
};

const Multiplier = styled(Input)`
  color: ${(props) => props.theme.colors.text};

  padding: 0px;
  width: 60px;
  font-size: 22px;
  margin: 0;
`;
const ChaosValue = styled(Input)`
  width: 100%;
  font-size: 22px;
  color: ${(props) => props.theme.colors.text};
  margin: 0;
  padding: 0px;
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
`;

const NameWrap = styled(FlexWrap)`
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
`;
const Icon = styled.img`
  padding: 0px 10px 0px 0px;
  width: 36px;
  height: 36px;
  object-fit: contain;
`;
export default ItemRecord;
