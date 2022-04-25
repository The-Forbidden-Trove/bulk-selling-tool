import { useState } from "react";
import styled from "styled-components";
import { Button, FlexWrap, Input } from "../baseStyles";
import { addBulkItem } from "../../reducers/bulkItemReducer";
import { Checkbox } from "../Checkbox";
import { useAppDispatch, useAppSelector } from "../..";
import BulkItemSavedRecord from "./BulkItemSavedRecord";
import BulkItemIcon from "./BulkItemIconUnique";

const BulkItems = () => {
  const dispatch = useAppDispatch();
  const bulkItems = useAppSelector((store) => store.bulkItems);
  const [textValue, setTextValue] = useState(`Item Class: Body Armours
Rarity: Rare
Onslaught Shell
Golden Mantle
--------
Quality: +30% (augmented)
Armour: 75
Evasion Rating: 75
Energy Shield: 17
--------
Requirements:
Level: 76
--------
Sockets: R-W-W-W-W-W
--------
Item Level: 100
--------
Quality does not increase Defences (enchant)
(Armour, Evasion Rating and Energy Shield are the standard Defences) (enchant)
Grants +1 to Maximum Life per 2% Quality (enchant)
--------
{ Implicit Modifier — Elemental, Resistance }
+25(15-25)% to all Elemental Resistances (implicit)
--------
{ Prefix Modifier "Elevated Crusader's" — Damage, Physical }
12(8-12)% increased Area of Effect
Enemies you Kill Explode, dealing 5% of their Life as Physical Damage
{ Prefix Modifier "Prime" (Tier: 1) — Life }
+129(120-129) to maximum Life
{ Prefix Modifier "Hunter's" (Tier: 1) — Caster, Curse }
You can apply an additional Curse
{ Suffix Modifier "of the Elevated Hunt" — Attack, Critical }
Attacks have +2(1.6-2)% to Critical Strike Chance
{ Suffix Modifier "of the Elevated Hunt" — Caster, Critical }
+2(1.6-2)% to Spell Critical Strike Chance
{ Suffix Modifier "of the Crusade" (Tier: 1) — Critical }
15% chance to gain a Power Charge on Critical Strike
--------
Crusader Item
Hunter Item
--------
Has Atziri's Splendour Skin. You can reclaim this by shift-clicking this item.
--------
Note: ~price 1 mirror`);
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
        {bulkItems &&
          bulkItems.map((bulkItem) => {
            return bulkItem.isSelected ? (
              <BulkItemIcon item={bulkItem.item} />
            ) : (
              <></>
            );
          })}
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
  flex-direction: column;
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
