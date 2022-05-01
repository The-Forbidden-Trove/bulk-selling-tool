import { useEffect, useState } from "react";
import { Checkbox } from "../Checkbox";
import styled from "styled-components";
import { Button, FlexWrap, Input } from "../baseStyles";
import { useAppDispatch } from "../..";
import {
  updateBulkItemChaosValue,
  updateBulkItemExValue,
  updateBulkItemIsMirrorService,
  updateBulkItemName,
  updateBulkItemNote,
  updateBulkItemSelect,
} from "../../reducers/bulkItemReducer";

const BulkItemSavedRecord = ({ item }: any) => {
  const dispatch = useAppDispatch();
  const [nameValue, setNameValue] = useState("");
  const [chaosValue, setChaosValue] = useState("");
  const [exValue, setExValue] = useState("");
  const [itemNote, setItemNote] = useState("");
  const [isMirrorService, setIsMirrorService] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isDetails, setIsDetails] = useState(false);

  const handleNameChange = (e: any) => {
    setNameValue(e.target.value);
    dispatch(updateBulkItemName(item.id, e.target.value));
  };

  const handleChaosChange = (e: any) => {
    const val = e.target.value;
    if (/^\d*.?\d*/.test(val)) {
      setChaosValue(e.target.value);
      dispatch(updateBulkItemChaosValue(item.id, e.target.value));
    }
  };

  const handleExChange = (e: any) => {
    const val = e.target.value;
    if (/^\d*.?\d*/.test(val)) {
      setExValue(e.target.value);
      dispatch(updateBulkItemExValue(item.id, e.target.value));
    }
  };

  const handleIsMirrorChange = () => {
    setIsMirrorService(!isMirrorService);
    dispatch(updateBulkItemIsMirrorService(item.id, !isMirrorService));
  };

  const handleSelect = () => {
    setIsSelected(!isSelected);
    dispatch(updateBulkItemSelect(item.id, !isSelected));
  };

  const handleNoteChange = (e: any) => {
    const val = e.target.value;
    setItemNote(val);
    dispatch(updateBulkItemNote(item.id, val));
  };

  useEffect(() => {
    setNameValue(item.name);
    setChaosValue(item.chaosValue);
    setExValue(item.exValue);
    setIsMirrorService(item.isMirrorService);
    setIsSelected(item.isSelected);
    setItemNote(item.itemNote);
  }, [
    item.chaosValue,
    item.exValue,
    item.isMirrorService,
    item.isSelected,
    item.name,
    item.itemNote,
  ]);

  const onKeyPress = (event: any) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (!/^[0-9\b.]+$/.test(keyValue)) event.preventDefault();
  };

  return (
    <Wrapper>
      <Header>
        <Left onClick={() => setIsDetails(!isDetails)}>
          <FoldButton>
            {!isDetails ? (
              <ArrowIcon
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
              </ArrowIcon>
            ) : (
              <ArrowIcon
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z" />
              </ArrowIcon>
            )}
          </FoldButton>
          <InputWrapper
            onClick={() => setIsDetails(!isDetails)}
            style={{
              width: "95%",
              display: "fles",
              justifyContent: "flex-start",
            }}
          >
            <ItemName
              value={nameValue}
              placeholder="Item name..."
              style={{
                width: "100%",
              }}
              readOnly={true}
            />
          </InputWrapper>
        </Left>
        <Right onClick={handleSelect}>
          <Checkbox checked={isSelected} />
        </Right>
      </Header>
      {isDetails && (
        <Details>
          <Mirror
            isMirrorService={isMirrorService}
            onClick={handleIsMirrorChange}
            src={
              "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyDuplicate.png?scale=1&w=1&h=1"
            }
          />
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
            <PriceField
              value={chaosValue}
              onChange={handleChaosChange}
              onKeyPress={onKeyPress}
              placeholder="Chaos Value..."
            />
          </InputWrapper>
          <InputWrapper>
            <Icon
              src={
                "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyAddModToRare.png?scale=1&w=1&h=1"
              }
            />
            <PriceField
              value={exValue}
              onChange={handleExChange}
              onKeyPress={onKeyPress}
              placeholder="Exalted Value..."
            />
          </InputWrapper>

          <InputWrapper>
            <NameField
              value={itemNote}
              onChange={handleNoteChange}
              placeholder="Item note..."
            />
          </InputWrapper>
        </Details>
      )}
    </Wrapper>
  );
};

export default BulkItemSavedRecord;

const Header = styled(FlexWrap)`
  background: rgb(0, 0, 0, 0.6);
  cursor: pointer;
  width: 100%;
  padding: 0px 10px;
  justify-content: space-between;
`;
const Details = styled(FlexWrap)`
  background: rgb(0, 0, 0, 0.2);
  width: 90%;
  justify-content: flex-end;
`;
const iconStyle = {
  fill: "#555",
  padding: "0px 5px",
  cursor: "pointer",
};

const InputWrapper = styled(FlexWrap)`
  padding: 10px;
`;

const Wrapper = styled(FlexWrap)`
  flex-direction: column;
  width: 100%;
`;

const NameField = styled(Input)``;

const PriceField = styled(Input)`
  text-align: center;
  width: 14px;
`;

const Icon = styled.img`
  padding: 0px 5px 0px 0px;
  width: 36px;
  height: 36px;
  object-fit: contain;
`;

const SvgIcon = styled.svg`
  height: 12px;
  width: 12px;
  vertical-align: middle;
`;

const ArrowIcon = styled(SvgIcon)`
  fill: white;
  div:hover > button > & {
    transform: scale(1.2);
  }
`;

const FoldButton = styled(Button)`
  padding: 0;
  width: 2%;
`;

const ItemName = styled(Input)`
  cursor: pointer;
  border: none;
`;

const Left = styled(FlexWrap)`
  width: 95%;
  justify-content: flex-start;
  padding: 0px 10px;
`;
const Right = styled(FlexWrap)`
  width: 5%;
  padding: 0px 10px;
`;
const Mirror = styled.img<{ isMirrorService: boolean }>`
  padding: 0px 5px 0px 0px;
  cursor: pointer;
  opacity: ${(props) => (props.isMirrorService ? 1 : 0.6)};
  filter: ${(props) =>
    props.isMirrorService
      ? ""
      : "hue-rotate(90deg) brightness(60%) grayscale(60%)"};
  width: 36px;
  height: 36px;
  object-fit: contain;
  &:hover {
    opacity: 1;
  }
`;
