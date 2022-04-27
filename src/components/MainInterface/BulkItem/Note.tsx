import React from "react";
import styled from "styled-components";
import { FlexWrap } from "../../baseStyles";
import { Divider } from "./Divider";

export const Note = ({ item }: any) => {
  return (
    <>
      {item.note && (
        <>
          <Divider item={item}></Divider>
          <Property>
            <PropertySpanDefaultColor>{item.note}</PropertySpanDefaultColor>
          </Property>
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
  color: #aa9e82;
  padding: 0px 1px;
`;
