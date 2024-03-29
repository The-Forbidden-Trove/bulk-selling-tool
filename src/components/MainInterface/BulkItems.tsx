import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button, FlexWrap, Input } from "../baseStyles";
import { addBulkItem, appendBulkItem } from "../../reducers/bulkItemReducer";
import { useAppDispatch, useAppSelector } from "../..";
import BulkItemSavedRecord from "./BulkItemSavedRecord";
import BulkItemIcon from "./BulkItemIconUnique";

import Masonry from "@mui/lab/Masonry";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { BulkItemHeader } from "./BulkItem/BulkItemHeader";
import { BulkItemNote } from "./BulkItem/BulkItemNote";
import GenerateBulkItemMessage from "./GenerateBulkItemMessage";
import GeneratedBulkItemMessage from "../GeneratedMessage/GeneratedBulkItemMessage";

const BulkItems = () => {
  const dispatch = useAppDispatch();
  const bulkItems = useAppSelector((store) => store.bulkItems) || [];
  const [textValue, setTextValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [chaosValue, setChaosValue] = useState("");
  const [noteValue, setNoteValue] = useState("");
  const [exValue, setExValue] = useState("");
  const [mirrorValue, setMirrorValue] = useState("");
  const [isMirrorService, setIsMirrorService] = useState(false);
  const [allItems, setAllItems] = useLocalStorage("bulkItems", []);
  const [selectedItems, setSelectedItems] = useState([]);
  const [columns, setColumns] = useState(2);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let newColumns = 1;
    const win = window.innerWidth;

    if (win > 1500) newColumns = 2;
    if (win > 2000) newColumns = 3;
    if (win > 2500) newColumns = 4;

    setColumns(newColumns);
    window.addEventListener(
      "resize",
      () => {
        let newColumns = 1;
        const win = window.innerWidth;

        if (win > 1500) newColumns = 2;
        if (win > 2000) newColumns = 3;
        if (win > 2500) newColumns = 4;

        setColumns(newColumns);
      },
      false,
    );
  }, []);

  const handleTextChange = (e: any) => {
    setTextValue(e.target.value);
  };

  const handleNameChange = (e: any) => {
    setNameValue(e.target.value);
  };

  const handleChaosChange = (e: any) => {
    const val = e.target.value;
    if (/^\d*.?\d*/.test(val)) {
      setChaosValue(val);
    }
  };

  const handleExChange = (e: any) => {
    const val = e.target.value;
    if (/^\d*.?\d*/.test(val)) {
      setExValue(val);
    }
  };

  const handleMirrorChange = (e: any) => {
    const val = e.target.value;
    if (/^\d*.?\d*/.test(val)) {
      setMirrorValue(val);
    }
  };

  const handleIsMirrorChange = () => {
    setIsMirrorService(!isMirrorService);
  };

  const handleNoteChange = (e: any) => {
    setNoteValue(e.target.value);
  };

  const handleAddItem = () => {
    dispatch(
      addBulkItem(
        textValue,
        nameValue,
        Number(chaosValue),
        Number(exValue),
        Number(mirrorValue),
        isMirrorService,
        noteValue,
      ),
    );

    setTextValue("");
    setNameValue("");
    setChaosValue("");
    setExValue("");
    setMirrorValue("");
    setIsMirrorService(false);
    setNoteValue("");
  };

  useEffect(() => {
    const newSelectedItems: any = [];
    bulkItems.forEach((bulkItem: any) => {
      if (bulkItem.isSelected) newSelectedItems.push(bulkItem);
    });
    setSelectedItems(newSelectedItems);
  }, [dispatch, bulkItems]);

  useEffect(() => {
    if (allItems.length > 0) {
      allItems.forEach((item) => {
        dispatch(appendBulkItem(item));
      });
    }
  }, []);

  const onKeyPress = (event: any) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (!/^[0-9\b.]+$/.test(keyValue)) event.preventDefault();
  };

  return (
    <Wrapper>
      <FlexWrap
        style={{
          flexDirection: "column",
          width: "100%",
          height: "100%",
          justifyContent: "flex-start",
        }}
      >
        <FlexWrap style={{ width: "100%", height: "95%" }}>
          <Left>
            <TopLeft>
              <TextArea
                value={textValue}
                onChange={handleTextChange}
                placeholder={"ALT+CTRL+C Item text..."}
              />
              <Options>
                <InputWrapper
                  onClick={handleIsMirrorChange}
                  style={{ cursor: "pointer" }}
                >
                  <Mirror
                    isMirrorService={isMirrorService}
                    src={
                      "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyDuplicate.png?scale=1&w=1&h=1"
                    }
                  />
                  <NameField
                    style={{ border: "none", cursor: "pointer" }}
                    value={"Mirror service?"}
                    readOnly={true}
                  />
                </InputWrapper>
                <InputWrapper>
                  <Icon
                    src={
                      "https://web.poecdn.com/image/Art/2DItems/Amulets/AgateAmuletUnique.png?scale=1&w=1&h=1"
                    }
                  />
                  <NameField
                    value={nameValue}
                    onChange={handleNameChange}
                    placeholder="Item alias..."
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
                    placeholder="Chaos Price..."
                    onKeyPress={onKeyPress}
                  />
                </InputWrapper>
                <InputWrapper>
                  <Icon
                    src={
                      "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lNb2RWYWx1ZXMiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/e1a54ff97d/CurrencyModValues.png"
                    }
                  />
                  <NameField
                    value={exValue}
                    onChange={handleExChange}
                    placeholder="Divine Price..."
                    onKeyPress={onKeyPress}
                  />
                </InputWrapper>
                <InputWrapper>
                  <Icon
                    src={
                      "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyDuplicate.png?scale=1&w=1&h=1"
                    }
                  />
                  <NameField
                    value={mirrorValue}
                    onChange={handleMirrorChange}
                    placeholder="Mirror Price..."
                    onKeyPress={onKeyPress}
                  />
                </InputWrapper>
                <InputWrapper>
                  <SvgIcon
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M400 32h-352C21.49 32 0 53.49 0 80v352C0 458.5 21.49 480 48 480h245.5c16.97 0 33.25-6.744 45.26-18.75l90.51-90.51C441.3 358.7 448 342.5 448 325.5V80C448 53.49 426.5 32 400 32zM64 96h320l-.001 224H320c-17.67 0-32 14.33-32 32v64H64V96z" />
                  </SvgIcon>
                  <NameField
                    value={noteValue}
                    onChange={handleNoteChange}
                    placeholder="Item note..."
                  />
                </InputWrapper>
                <ConfirmButton onClick={handleAddItem}>Add Item</ConfirmButton>
              </Options>
            </TopLeft>
            <Header>Saved items</Header>
            <ItemListWrap>
              {bulkItems &&
                bulkItems.map((bulkItem: any) => {
                  return <BulkItemSavedRecord item={bulkItem} />;
                })}
            </ItemListWrap>
          </Left>
          <Right>
            <Header style={{ justifyContent: "center" }}>Selected items</Header>
            <Box style={{}}>
              <Masonry columns={columns} spacing={2}>
                {selectedItems.map((x: any) => {
                  return (
                    <BulkItemWrapper>
                      <BulkItemNote item={x} />
                      <BulkItemIcon item={x.item} />
                      <BulkItemHeader item={x} />
                    </BulkItemWrapper>
                  );
                })}
              </Masonry>
            </Box>
          </Right>
        </FlexWrap>

        <FlexWrap style={{ width: "100%", height: "5%" }}>
          <GenerateBulkItemMessage
            selectedItems={selectedItems}
            msg={msg}
            setMsg={setMsg}
          />
        </FlexWrap>
      </FlexWrap>

      <GeneratedBulkItemMessage selectedItems={selectedItems} msg={msg} />
    </Wrapper>
  );
};

export default BulkItems;

const Box = styled(FlexWrap)`
  width: 96%;
  height: 90%;
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
    background: none;
  }

  &::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;

    background: none;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
  }
`;
const BulkItemWrapper = styled(FlexWrap)`
  flex-direction: column;
  background: #0b1a3a;
  padding: 5px 5px;
  border-radius: 0.5em;
`;

const ItemListWrap = styled(FlexWrap)`
  height: 60%;
  width: 100%;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;
  align-items: flex-start;
  justify-content: flex-start;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
    background: none;
  }

  &::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;

    background: none;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
  }
`;

const InputWrapper = styled(FlexWrap)`
  width: 100%;
  padding: 10px;
`;

const NameField = styled(Input)``;

const ConfirmButton = styled(Button)`
  margin-top: 5px;
  padding: 10px 0px;
  cursor: pointer;
  font-size: 20px;
`;

const Wrapper = styled(FlexWrap)`
  width: 100%;
  height: 100%;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
    background: none;
  }

  &::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;

    background: none;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
  }
`;

const Left = styled(FlexWrap)`
  flex-direction: column;
  width: 40%;
  height: 100%;
`;

const TopLeft = styled(FlexWrap)`
  width: 95%;
  height: 45%;
  padding: 18px 20px 5px 20px;
  justify-content: space-between;
`;

const Right = styled(FlexWrap)`
  width: 60%;
  height: 100%;
  flex-direction: column;
`;

const TextArea = styled("textarea")`
  width: 60%;
  height: 90%;
  padding: 5px;
  outline: none;
  resize: none;
  border: solid 2px #0b1a3a;
  color: #f8f5ff;
  background: #25262a;
  opacity: 0.9;
`;

const Options = styled(FlexWrap)`
  flex-direction: column;
  width: 35%;
  height: 100%;
`;

const Icon = styled.img`
  padding: 0px 5px 0px 0px;
  width: 36px;
  height: 36px;
  object-fit: contain;
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
const Header = styled(FlexWrap)`
  justify-content: flex-start;
  background: rgb(0, 0, 0, 0.1);
  font-size: 26px;
  padding: 10px 5px;
  width: 100%;
`;
const SvgIcon = styled.svg`
  padding: 0px 5px 0px 0px;
  width: 34px;
  height: 34px;
  fill: #89bdc5;
`;
