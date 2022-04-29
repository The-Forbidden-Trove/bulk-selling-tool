import React from "react";
import styled from "styled-components";
import { FlexWrap } from "../../baseStyles";

export const Affixes = ({ item }: any) => {
  return (
    <>
      {item.affixes &&
        item.affixes.map((affix: any) => {
          return affix.type !== "enchant" && affix.type !== "implicit" ? (
            <ExplicitWrap>
              <ExplicitLeft>
                {affix.affixType === "prefix" ? "P" : ""}
                {affix.affixType === "suffix" ? "S" : ""}
                {affix.tier > 0 ? affix.tier : ""}
                {"    "}
                {affix.modRange}
              </ExplicitLeft>
              {affix.type === "fractured" ? (
                <ExplicitMidFractured>
                  {affix.modFormattedNoParentheses}
                </ExplicitMidFractured>
              ) : affix.type === "crafted" ? (
                <ExplicitMidCrafted>
                  {affix.modFormattedNoParentheses}
                </ExplicitMidCrafted>
              ) : (
                <ExplicitMid>{affix.modFormattedNoParentheses}</ExplicitMid>
              )}
              <ExplicitRight>{affix.modName}</ExplicitRight>
            </ExplicitWrap>
          ) : (
            <></>
          );
        })}
      {item.flags.corrupted && <Corrupted>Corrupted</Corrupted>}
      {item.flags.mirrored && <ExplicitMid>Mirrored</ExplicitMid>}
    </>
  );
};

const ExplicitWrap = styled(FlexWrap)`
  width: 100%;
  justify-content: space-between;
  color: #88f;
`;

const ExplicitLeft = styled(FlexWrap)`
  color: #ec7676;
  width: 20%;
  justify-content: flex-start;
  opacity: 0.8;
`;

const ExplicitMid = styled(FlexWrap)`
  color: #88f;
  width: 60%;
  text-align: center;
`;

const ExplicitMidFractured = styled(FlexWrap)`
  color: #a29162;
  width: 60%;
`;

const ExplicitMidCrafted = styled(FlexWrap)`
  color: #b4b4ff;
  width: 60%;
`;

const Corrupted = styled(FlexWrap)`
  color: #d20000;
  width: 60%;
`;

const ExplicitRight = styled(FlexWrap)`
  color: #ec7676;
  width: 20%;
  opacity: 0.8;
  text-align: right;
  justify-content: flex-end;
`;
