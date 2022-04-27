import React from "react";
import styled from "styled-components";
import { FlexWrap } from "../../baseStyles";
import { Divider } from "./Divider";

export const Enchant = ({ item }: any) => {
  return (
    <>
      {item.affixes &&
        item.affixes.filter((x: any) => x.type === "enchant").length > 0 && (
          <>
            {item.affixes.map((affix: any) => {
              return affix.type === "enchant" ? (
                <EnchantWrap>
                  <EnchantLeft>{affix.modRange}</EnchantLeft>
                  <EnchantMid>{affix.modFormattedNoParentheses}</EnchantMid>
                  <EnchantRight>{affix.modName}</EnchantRight>
                </EnchantWrap>
              ) : (
                <></>
              );
            })}
            <Divider item={item}></Divider>
          </>
        )}
    </>
  );
};

const EnchantWrap = styled(FlexWrap)`
  width: 100%;
  justify-content: space-between;
  color: #88f;
  text-align: center;
`;

const EnchantLeft = styled(FlexWrap)`
  color: #b4b4ff;
  width: 20%;
  justify-content: flex-start;
  opacity: 0.8;
`;

const EnchantMid = styled(FlexWrap)`
  color: #b4b4ff;
  width: 60%;
`;

const EnchantRight = styled(FlexWrap)`
  color: #b4b4ff;
  width: 20%;
  opacity: 0.8;
`;
