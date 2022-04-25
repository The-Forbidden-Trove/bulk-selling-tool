import { useEffect, useState } from "react";
import { Checkbox } from "../Checkbox";
import styled from "styled-components";
import { FlexWrap, Input } from "../baseStyles";
import { useAppDispatch } from "../..";
import { FaCheck } from "react-icons/fa";
import { updateBulkItemName } from "../../reducers/bulkItemReducer";

const BulkItemSavedRecord = ({ item }: any) => {
  const dispatch = useAppDispatch();
  const [nameValue, setNameValue] = useState("");
  const [chaosValue, setChaosValue] = useState("");
  const [exValue, setExValue] = useState("");
  const [isMirrorService, setIsMirrorService] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const handleNameChange = (e: any) => {
    setNameValue(e.target.value);
  };

  const handleChaosChange = (e: any) => {
    setChaosValue(e.target.value);
  };

  const handleExChange = (e: any) => {
    setExValue(e.target.value);
  };

  useEffect(() => {
    setNameValue(item.name);
    setChaosValue(item.chaosValue);
    setExValue(item.exValue);
    setIsMirrorService(item.isMirrorService);
    setIsSelected(item.isSelected);
  }, [
    item.chaosValue,
    item.exValue,
    item.isMirrorService,
    item.isSelected,
    item.name,
  ]);

  const updateItem = () => {
    dispatch(updateBulkItemName("ewe", nameValue));
  };

  return (
    <Wrapper>
      <Checkbox checked={isSelected} onChange={setIsSelected} />
      <Checkbox checked={isMirrorService} onChange={setIsMirrorService} />
      <InputWrapper>
        <NameField
          value={nameValue}
          onChange={handleNameChange}
          placeholder="Item name..."
        />
      </InputWrapper>

      <InputWrapper>
        <Icon
          src={
            "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?scale=1&w=1&h=1"
          }
        />
        <NameField
          value={chaosValue}
          onChange={handleChaosChange}
          placeholder="Chaos Value..."
        />
      </InputWrapper>

      <InputWrapper>
        <Icon
          src={
            "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyAddModToRare.png?scale=1&w=1&h=1"
          }
        />
        <NameField
          value={exValue}
          onChange={handleExChange}
          placeholder="Exalted Value..."
        />
      </InputWrapper>
      <FaCheck style={iconStyle} onClick={updateItem} />
    </Wrapper>
  );
};

export default BulkItemSavedRecord;

const iconStyle = {
  fill: "#555",
  padding: "0px 5px",
  cursor: "pointer",
};

const InputWrapper = styled(FlexWrap)`
  padding: 10px;
`;

const Wrapper = styled(FlexWrap)`
  width: 100%;
`;

const NameField = styled(Input)``;

const Icon = styled.img`
  padding: 0px 5px 0px 0px;
  width: 36px;
  height: 36px;
  object-fit: contain;
`;
