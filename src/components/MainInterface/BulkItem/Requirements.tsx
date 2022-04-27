import React from "react";
import styled from "styled-components";
import { FlexWrap } from "../../baseStyles";
import { Divider } from "./Divider";

export const Requirements = ({ item }: any) => {
  return (
    <>
      <Property>
        <PropertySpan>Item Level</PropertySpan>
        <PropertySpanDefaultColor>{item.ilvl}</PropertySpanDefaultColor>
      </Property>
      {item.requirements && (
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
      )}
      <Divider item={item}></Divider>
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
