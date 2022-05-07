import { useEffect, useState } from "react";
import { Checkbox } from "../Checkbox";
import styled from "styled-components";
import { Button, CheckboxContainer, FlexWrap, Input } from "../baseStyles";
import { useAppDispatch } from "../..";
import {
  removeBulkItem,
  updateBulkItemChaosValue,
  updateBulkItemExValue,
  updateBulkItemIsMirrorService,
  updateBulkItemMirrorValue,
  updateBulkItemName,
  updateBulkItemNote,
  updateBulkItemSelect,
} from "../../reducers/bulkItemReducer";

const BulkItemSavedRecord = ({ item }: any) => {
  const dispatch = useAppDispatch();
  const [nameValue, setNameValue] = useState("");
  const [chaosValue, setChaosValue] = useState("");
  const [exValue, setExValue] = useState("");
  const [mirrorValue, setMirrorValue] = useState("");
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

  const handleMirrorChange = (e: any) => {
    const val = e.target.value;
    if (/^\d*.?\d*/.test(val)) {
      setMirrorValue(e.target.value);
      dispatch(updateBulkItemMirrorValue(item.id, e.target.value));
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

  const handleDeleteItem = (e: any) => {
    dispatch(removeBulkItem(item.id));
  };

  useEffect(() => {
    setNameValue(item.name);
    setChaosValue(item.chaosValue);
    setExValue(item.exValue);
    setMirrorValue(item.mirrorValue);
    setIsMirrorService(item.isMirrorService);
    setIsSelected(item.isSelected);
    setItemNote(item.itemNote);
  }, [
    item.chaosValue,
    item.exValue,
    item.mirrorValue,
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
        <Right>
          <SelectWrap onClick={handleSelect}>
            <Checkbox checked={isSelected} />
          </SelectWrap>

          <ArrowIcon
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            style={{
              width: "16px",
              height: "16px",
              paddingBottom: "3px",
            }}
            onClick={handleDeleteItem}
          >
            <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z" />
          </ArrowIcon>
        </Right>
      </Header>
      {isDetails && (
        <Details>
        <DetailSection>
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
            <NameField
              value={itemNote}
              onChange={handleNoteChange}
              placeholder="Item note..."
            />
          </InputWrapper>
          </DetailSection>

        <DetailSection>
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
              placeholder="Chaos Price..."
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
              placeholder="Exalted Price..."
            />
          </InputWrapper>

          <InputWrapper>
            <Icon
              src={
              "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyDuplicate.png?scale=1&w=1&h=1"
              }
            />
            <PriceField
              value={mirrorValue}
              onChange={handleMirrorChange}
              onKeyPress={onKeyPress}
              placeholder="Mirror Price..."
            />
          </InputWrapper>
        </DetailSection>
        </Details>
      )}
    </Wrapper>
  );
};

export default BulkItemSavedRecord;

const SelectWrap = styled(FlexWrap)`
  padding: 10px 12px;
`;

const DetailSection = styled(FlexWrap)`
`;

const Header = styled(FlexWrap)`
  background: #0b1a3a;
  cursor: pointer;
  width: 100%;
  padding: 0px 10px;
  justify-content: space-between;
`;
const Details = styled(FlexWrap)`
  background: rgb(0, 0, 0, 0.2);
  align-items: flex-end;
  width: 100%;
  flex-direction: column;
`;

const InputWrapper = styled(FlexWrap)`
  padding: 10px;
`;

const Wrapper = styled(FlexWrap)`
  margin: 5px 0px;
  flex-direction: column;
  width: 100%;
`;

const NameField = styled(Input)`
  width: 165px;
`;

const PriceField = styled(Input)`
  text-align: center;
  width: 28px;
`;

const Icon = styled.img`
  width: 36px;
  padding: 0px 5px 0px 0px;
  height: 36px;
  object-fit: contain;
`;

const SvgIcon = styled.svg`
  height: 12px;
  width: 12px;
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
  width: 88%;
  justify-content: flex-start;
  padding: 0px 10px;
`;
const Right = styled(FlexWrap)`
  width: 12%;
  height: 100%;
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
