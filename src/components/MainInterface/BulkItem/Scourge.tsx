import React from "react";
import styled from "styled-components";
import { FlexWrap } from "../../baseStyles";
import { Divider } from "./Divider";

export const Scourge = ({ item }: any) => {
  return (
    <>
      {item.affixes &&
        item.affixes.filter((x: any) => x.type === "scourged").length > 0 && (
          <>
            {item.affixes.map((affix: any) => {
              return affix.type === "scourged" ? (
                <ExplicitWrap>
                  <ExplicitLeft>{affix.modRange}</ExplicitLeft>
                  <ExplicitMid>{affix.modFormattedNoParentheses}</ExplicitMid>
                  <ExplicitRight>{affix.modName}</ExplicitRight>
                </ExplicitWrap>
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

const ExplicitWrap = styled(FlexWrap)`
  width: 100%;
  justify-content: space-between;
  color: #ff6e25;
  text-align: center;
`;

const ExplicitLeft = styled(FlexWrap)`
  color: #ff6e25;
  width: 20%;
  justify-content: flex-start;
  opacity: 0.8;
`;

const ExplicitMid = styled(FlexWrap)`
  color: #ff6e25;
  width: 60%;
`;

const ExplicitRight = styled(FlexWrap)`
  color: #ff6e25;
  width: 20%;
  opacity: 0.8;
`;
