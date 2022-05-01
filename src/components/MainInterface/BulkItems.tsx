import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button, FlexWrap, Input } from "../baseStyles";
import { addBulkItem } from "../../reducers/bulkItemReducer";
import { useAppDispatch, useAppSelector } from "../..";
import BulkItemSavedRecord from "./BulkItemSavedRecord";
import BulkItemIcon from "./BulkItemIconUnique";

import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { BulkItemHeader } from "./BulkItem/BulkItemHeader";
import { BulkItemNote } from "./BulkItem/BulkItemNote";

const BulkItems = () => {
  const dispatch = useAppDispatch();
  const bulkItems = useAppSelector((store) => store.bulkItems) || [];
  const [textValue, setTextValue] = useState(`Item Class: Bows
Rarity: Rare
Tempest Horn
Synthesised Ivory Bow
--------
Bow
Quality: +30% (augmented)
Physical Damage: 29-86
Elemental Damage: 8-14 (augmented)
Critical Strike Chance: 8.71% (augmented)
Attacks per Second: 1.71 (augmented)
--------
Requirements:
Level: 64
Dex: 152
--------
Sockets: W-W-W-R-G-G
--------
Item Level: 82
--------
Quality does not increase Physical Damage (enchant)
1% increased Attack Speed per 8% Quality (enchant)
--------
{ Implicit Modifier — Gem }
+1 to Level of Socketed Gems (implicit)
{ Implicit Modifier — Damage, Elemental, Fire, Attack }
Adds 8(4-8) to 14(9-15) Fire Damage (implicit)
--------
{ Prefix Modifier "Subterranean" (Tier: 1) — Damage, Caster, Gem }
Socketed Skills deal 20% more Spell Damage — Unscalable Value
{ Prefix Modifier "Paragon's" (Tier: 1) — Gem }
+1 to Level of Socketed Gems
{ Master Crafted Prefix Modifier "Catarina's" — Gem }
+2 to Level of Socketed Support Gems (crafted)
{ Suffix Modifier "of Acclaim" (Tier: 2) — Attack, Speed }
19(17-19)% increased Attack Speed
{ Suffix Modifier "of Destruction" (Tier: 1) — Damage, Critical }
+38(35-38)% to Global Critical Strike Multiplier
{ Suffix Modifier "of Penetrating" (Tier: 2) — Attack, Critical }
34(30-34)% increased Critical Strike Chance
--------
Synthesised Item
--------
Note: ~b/o 1 mirror`);
  const [nameValue, setNameValue] = useState("");
  const [chaosValue, setChaosValue] = useState("");
  const [noteValue, setNoteValue] = useState("");
  const [exValue, setExValue] = useState("");
  const [isMirrorService, setIsMirrorService] = useState(false);
  const [allItems, setAllItems] = useLocalStorage("bulkItems", []);
  const [selectedItems, setSelectedItems] = useState([]);

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
        isMirrorService,
        noteValue,
      ),
    );

    setTextValue("");
    setNameValue("");
    setChaosValue("");
    setExValue("");
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

  const onKeyPress = (event: any) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (!/^[0-9\b.]+$/.test(keyValue)) event.preventDefault();
  };

  return (
    <Wrapper>
      <Left>
        <TopLeft>
          <TextArea value={textValue} onChange={handleTextChange} />
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
                placeholder="Chaos Value..."
                onKeyPress={onKeyPress}
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
                onKeyPress={onKeyPress}
              />
            </InputWrapper>
            <InputWrapper>
              <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M511.1 63.1v287.1c0 35.25-28.75 63.1-64 63.1h-144l-124.9 93.68c-7.875 5.75-19.12 .0497-19.12-9.7v-83.98h-96c-35.25 0-64-28.75-64-63.1V63.1c0-35.25 28.75-63.1 64-63.1h384C483.2 0 511.1 28.75 511.1 63.1z" />
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
            bulkItems.map((bulkItem) => {
              return <BulkItemSavedRecord item={bulkItem} />;
            })}
        </ItemListWrap>
      </Left>
      <Right>
        <Header style={{ justifyContent: "center" }}>Selected items</Header>
        <Box
          sx={{
            width: "100%",
            height: "95%",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          <Masonry
            columns={1}
            spacing={2}
            style={{ margin: "0px 40px", width: "100%" }}
          >
            {selectedItems.map((x: any) => {
              return (
                <BulkItemWrapper>
                  <BulkItemHeader item={x} />
                  <BulkItemIcon item={x.item} />
                  <BulkItemNote item={x} />
                </BulkItemWrapper>
              );
            })}
          </Masonry>
        </Box>
      </Right>
    </Wrapper>
  );
};

export default BulkItems;

const BulkItemWrapper = styled(FlexWrap)`
  flex-direction: column;
`;

const ItemListWrap = styled(FlexWrap)`
  height: 60%;
  width: 100%;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;
  align-items: flex-start;
  justify-content: flex-start;
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
  height: 95%;
  flex-direction: column;
`;

const TextArea = styled("textarea")`
  width: 60%;
  height: 90%;
  outline: none;
  resize: none;
  color: ${(props) => props.theme.colors.text};
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
