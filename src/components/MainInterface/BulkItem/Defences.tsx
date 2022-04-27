import React from "react";
import styled from "styled-components";
import { FlexWrap } from "../../baseStyles";
import { Divider } from "./Divider";

export const Defences = ({ item }: any) => {
  return (
    <>
      {item.defences && (
        <>
            {item.defences.armour && (
          <Property>
                <PropertySpan>Armour</PropertySpan>
                <PropertySpanColor>{item.defences.armour}</PropertySpanColor>
          </Property>
            )}

            {item.defences.evasion && (
          <Property>
                <PropertySpan>Evasion Rating</PropertySpan>
                <PropertySpanColor>{item.defences.evasion}</PropertySpanColor>
          </Property>
            )}

            {item.defences.energyShield && (
          <Property>
                <PropertySpan>Energy Shield</PropertySpan>
                <PropertySpanColor>
                  {item.defences.energyShield}
                </PropertySpanColor>
          </Property>
            )}

            {item.defences.blockChance > 0 && (
          <Property>
                <PropertySpan>Block Chance</PropertySpan>
                <PropertySpanColor>
                  {item.defences.blockChance}%
                </PropertySpanColor>
          </Property>
            )}
          <Divider item={item}></Divider>
        </>
      )}
    </>
  );
};

const Property = styled(FlexWrap)`
  color: #7f7f7f;
  padding: 1px 0px;
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
