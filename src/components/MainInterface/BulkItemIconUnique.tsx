import { useEffect, useState } from "react";
import styled from "styled-components";
import { FlexWrap } from "../baseStyles";

const BulkItemIcon = ({ item }: any) => {
  return (
    <Wrapper>
      <ItemHeader>
        <P>{item.base.name}</P>
        <P>{item.base.base}</P>
      </ItemHeader>

      <Property>
        <PropertySpan>Quality: </PropertySpan>
        <PropertySpanColor>+{item.quality.value}</PropertySpanColor>
      </Property>

      {item.offense && (
        <>
          <Property>
            {item.offense && item.offense.damage.physical.max > 0 && (
              <>
                <PropertySpan>Physical Damage</PropertySpan>
                <PropertySpanDefaultColor>
                  {item.offense.damage.physical.min} -{" "}
                  {item.offense.damage.physical.max}
                </PropertySpanDefaultColor>
              </>
            )}
          </Property>

          <Property>
            {item.offense && item.offense.damage.lightning.max > 0 && (
              <>
                <PropertySpan>Cold Damage</PropertySpan>
                <PropertySpanDefaultColor>
                  {item.offense.damage.lightning.min} -{" "}
                  {item.offense.damage.lightning.max}
                </PropertySpanDefaultColor>
              </>
            )}
          </Property>

          <Property>
            {item.offense && item.offense.damage.fire.max > 0 && (
              <>
                <PropertySpan>Cold Damage</PropertySpan>
                <PropertySpanDefaultColor>
                  {item.offense.damage.fire.min} -{" "}
                  {item.offense.damage.fire.max}
                </PropertySpanDefaultColor>
              </>
            )}
          </Property>

          <Property>
            {item.offense && item.offense.critChance > 0 && (
              <>
                <PropertySpan>Crit Chance</PropertySpan>
                <PropertySpanDefaultColor>
                  {item.offense.critChance}
                </PropertySpanDefaultColor>
              </>
            )}
          </Property>

          <Property>
            {item.offense && item.offense.range > 0 && (
              <>
                <PropertySpan>Weapon Range</PropertySpan>
                <PropertySpanDefaultColor>
                  {item.offense.range}
                </PropertySpanDefaultColor>
              </>
            )}
          </Property>

          <Property>
            {item.offense.aps && item.offense.damage.cold.max > 0 && (
              <>
                <PropertySpan>Cold Damage</PropertySpan>
                <PropertySpanDefaultColor>
                  {item.offense.damage.cold.min} -{" "}
                  {item.offense.damage.cold.max}
                </PropertySpanDefaultColor>
              </>
            )}
          </Property>
        </>
      )}

      {item.defences && (
        <>
          <Property>
            {item.defences.armour && (
              <>
                <PropertySpan>Armour</PropertySpan>
                <PropertySpanColor>{item.defences.armour}</PropertySpanColor>
              </>
            )}
          </Property>

          <Property>
            {item.defences.evasion && (
              <>
                <PropertySpan>Evasion Rating</PropertySpan>
                <PropertySpanColor>{item.defences.evasion}</PropertySpanColor>
              </>
            )}
          </Property>

          <Property>
            {item.defences.energyShield && (
              <>
                <PropertySpan>Energy Shield</PropertySpan>
                <PropertySpanColor>
                  {item.defences.energyShield}
                </PropertySpanColor>
              </>
            )}
          </Property>

          <Property>
            {item.defences.blockChance > 0 && (
              <>
                <PropertySpan>Block Chance</PropertySpan>
                <PropertySpanColor>
                  {item.defences.blockChance}%
                </PropertySpanColor>
              </>
            )}
          </Property>
        </>
      )}

      <Separator></Separator>
      <Property>
        <PropertySpan>Item Level</PropertySpan>
        <PropertySpanDefaultColor>{item.ilvl}</PropertySpanDefaultColor>
      </Property>

      <Property>
        <PropertySpan>Requires</PropertySpan>
        {item.requirements.level > 0 && (
          <>
            <PropertySpan>Level</PropertySpan>
            <PropertySpanDefaultColor>
              {item.requirements.level}
            </PropertySpanDefaultColor>
          </>
        )}

        {item.requirements.strength > 0 && (
          <>
            <PropertySpan>Str</PropertySpan>
            <PropertySpanDefaultColor>
              {item.requirements.strength}
            </PropertySpanDefaultColor>
          </>
        )}

        {item.requirements.dexterity > 0 && (
          <>
            <PropertySpan>Dex</PropertySpan>
            <PropertySpanDefaultColor>
              {item.requirements.dexterity}
            </PropertySpanDefaultColor>
          </>
        )}

        {item.requirements.inteligence > 0 && (
          <>
            <PropertySpan>Int</PropertySpan>
            <PropertySpanDefaultColor>
              {item.requirements.inteligence}
            </PropertySpanDefaultColor>
          </>
        )}
      </Property>

      <Separator></Separator>

      {item.affixes &&
        item.affixes.map((affix: any) => {
          return (
            <ExplicitWrap>
              <ExplicitLeft>{affix.modRange}</ExplicitLeft>
              <ExplicitMid>{affix.modFormattedNoParentheses}</ExplicitMid>
              <ExplicitRight>{affix.modName}</ExplicitRight>
            </ExplicitWrap>
          );
        })}

      <Separator></Separator>

      {item.note && (
        <>
          <PropertySpan>Note: </PropertySpan>
          <PropertySpanDefaultColor>{item.note}</PropertySpanDefaultColor>
        </>
      )}
    </Wrapper>
  );
};

export default BulkItemIcon;

const Wrapper = styled(FlexWrap)`
  width: 80%;
  height: 100%;
  flex-direction: column;
`;

const Icon = styled.img`
  padding: 0px 5px 0px 0px;
  width: 36px;
  height: 36px;
  object-fit: contain;
`;

const P = styled("div")`
  color: #af6025;
`;
const ItemHeader = styled(FlexWrap)`
  background: url("https://web.poecdn.com/image/item/popup/header-double-unique-left.png?1648706966513")
      top left no-repeat,
    url("https://web.poecdn.com/image/item/popup/header-double-unique-right.png?1648706966517")
      top right no-repeat,
    url("https://web.poecdn.com/image/item/popup/header-double-unique-middle.png?1648706966513")
      top center repeat-x;
  width: 100%;
  height: 53px;
  flex-direction: column;
`;

const Property = styled(FlexWrap)`
  color: #7f7f7f;
  padding: 1px 0px;
`;

const Separator = styled(FlexWrap)`
  background: url("https://web.poecdn.com/image/item/popup/seperator-unique.png?1648706966521")
    center no-repeat;
  height: 7.91075px;
  width: 100%;
  padding: 2px 0px;
`;

const PropertySpan = styled("span")`
  color: #7f7f7f;
  padding: 0px 1px;
`;

const PropertySpanColor = styled("span")`
  color: #88f;
  padding: 0px 1px;
`;

const PropertySpanDefaultColor = styled("span")`
  padding: 0px 1px;
`;

const ExplicitWrap = styled(FlexWrap)`
  width: 100%;
  justify-content: space-between;
  color: #88f;
  text-align: center;
`;

const ExplicitLeft = styled(FlexWrap)`
  color: #ec7676;
  width: 20%;
  justify-content: flex-start;
  opacity: 0.8;
`;

const ExplicitMid = styled(FlexWrap)`
  color: #88f;
  width:60%;
`;

const ExplicitRight = styled(FlexWrap)`
  color: #ec7676;
  justify-content: flex-end;
  width: 20%;
  opacity: 0.8;
`;
