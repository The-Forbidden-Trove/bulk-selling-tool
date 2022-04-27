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
                {affix.type}
                {affix.tier ? affix.tier : ""}
                {affix.modRange}
              </ExplicitLeft>
              {affix.type === "fractured" ? (
                <ExplicitMidFractured>
                  {affix.modFormattedNoParentheses}
                </ExplicitMidFractured>
              ) : (
                <ExplicitMid>{affix.modFormattedNoParentheses}</ExplicitMid>
              )}
              <ExplicitRight>{affix.modName}</ExplicitRight>
            </ExplicitWrap>
          ) : (
            <></>
          );
        })}
      {item.flags.corrupted && <Corrupted></Corrupted>}
    </>
  );
};

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
  width: 60%;
`;

const ExplicitMidFractured = styled(FlexWrap)`
  color: #a29162;
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
`;
