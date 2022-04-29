import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button, FlexWrap, Input } from "../baseStyles";
import { addBulkItem } from "../../reducers/bulkItemReducer";
import { Checkbox } from "../Checkbox";
import { useAppDispatch, useAppSelector } from "../..";
import BulkItemSavedRecord from "./BulkItemSavedRecord";
import BulkItemIcon from "./BulkItemIconUnique";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";

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
  const [exValue, setExValue] = useState("");
  const [isMirrorService, setIsMirrorService] = useState(false);

  const handleTextChange = (e: any) => {
    setTextValue(e.target.value);
  };

  const handleNameChange = (e: any) => {
    setNameValue(e.target.value);
  };

  const handleChaosChange = (e: any) => {
    setChaosValue(e.target.value);
  };

  const handleExChange = (e: any) => {
    setExValue(e.target.value);
  };

  const handleAddItem = () => {
    dispatch(
      addBulkItem(
        textValue,
        nameValue,
        Number(chaosValue),
        Number(exValue),
        isMirrorService,
      ),
    );

    setTextValue("");
    setNameValue("");
    setChaosValue("");
    setExValue("");
    setIsMirrorService(false);
  };

  const heights = [
    150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80,
  ];

  const Item = styled("div")<{ height: number }>`
background: white;
    width: ${(props) => props.height};
    height: ${(props) => props.height};
  `;

  return (
    <Wrapper>
      <Left>
        <TopLeft>
          <TextArea value={textValue} onChange={handleTextChange} />
          <Options>
            <Checkbox checked={isMirrorService} onChange={setIsMirrorService} />
            <InputWrapper>
              Item Name
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
              Chaos Value
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
              Ex Value
              <NameField
                value={exValue}
                onChange={handleExChange}
                placeholder="Exalted Value..."
              />
            </InputWrapper>
          </Options>
          <ConfirmButton onClick={handleAddItem}>Add Item</ConfirmButton>
        </TopLeft>
        <ItemListWrap>
          {bulkItems &&
            bulkItems.map((bulkItem) => {
              return <BulkItemSavedRecord item={bulkItem} />;
            })}
        </ItemListWrap>
      </Left>
      <Right>
        <Box sx={{ width: 500, minHeight: 393 }}>
          <Masonry columns={5} spacing={2}>
            {heights.map((height, index) => {
              return <Item height={height}>{index + 1}</Item>;
            })}
          </Masonry>
        </Box>
      </Right>
    </Wrapper>
  );
};

export default BulkItems;

const ItemListWrap = styled(FlexWrap)`
  height: 50%;
  width: 100%;
  overflow-y: scroll;
`;

const InputWrapper = styled(FlexWrap)`
  width: 100%;
  padding: 10px;
`;

const NameField = styled(Input)``;

const ConfirmButton = styled(Button)`
  cursor: pointer;
  font-size: 18px;
`;

const Wrapper = styled(FlexWrap)`
  width: 100%;
  height: 100%;
`;

const Options = styled(FlexWrap)`
  flex-wrap: wrap;
`;

const Left = styled(FlexWrap)`
  flex-direction: column;
  width: 40%;
  height: 100%;
`;

const TopLeft = styled(FlexWrap)`
  flex-direction: column;
  width: 100%;
  height: 45%;
`;

const Right = styled(FlexWrap)`
  overflow-y: scroll;
  padding: 10px 0px;
  width: 60%;
  height: 100%;
`;

const TextArea = styled("textarea")`
  width: 50%;
  height: 35%;
  outline: none;
  resize: none;
  color: ${(props) => props.theme.colors.text};
`;

const Icon = styled.img`
  padding: 0px 5px 0px 0px;
  width: 36px;
  height: 36px;
  object-fit: contain;
`;
