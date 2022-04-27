import React from "react";
import styled from "styled-components";
import { FlexWrap } from "../../baseStyles";

export const Quality = ({ item }: any) => {
  return (
    <>
      {item.quality && (
        <Property>
          <PropertySpan>
            {item.quality.catalyst
              ? `Quality (${item.quality.catalyst}): `
              : `Quality: `}
          </PropertySpan>
          {item.quality.catalyst && <PropertySpan></PropertySpan>}
          <PropertySpanColor>+{item.quality.value}%</PropertySpanColor>
        </Property>
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
