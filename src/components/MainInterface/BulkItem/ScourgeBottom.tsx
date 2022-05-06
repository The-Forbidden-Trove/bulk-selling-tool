import React from "react";
import styled from "styled-components";
import { FlexWrap } from "../../baseStyles";
import { Divider } from "./Divider";

export const ScourgeBottom = ({ item }: any) => {
  return (
    <>
      {item.flags.scourged && (
        <>
          <Divider item={item}></Divider>
          <Property>
            <PropertySpanDefaultColor>Scourged</PropertySpanDefaultColor>
          </Property>
        </>
      )}
    </>
  );
};

const Property = styled(FlexWrap)`
  color: #ff6e25;
  padding: 1px 0px;
`;

const PropertySpan = styled("span")`
  color: #ff6e25;
  padding: 0px 1px;
`;

const PropertySpanColor = styled("span")`
  color: #ff6e25;
  padding: 0px 1px;
`;

const PropertySpanDefaultColor = styled("span")`
  color: #ff6e25;
  padding: 0px 1px;
`;
