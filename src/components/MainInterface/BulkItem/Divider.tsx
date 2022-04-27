import React from "react";
import styled from "styled-components";
import { FlexWrap } from "../../baseStyles";

export const Divider = ({ item }: any) => {
  return <Separator image={"https://web.poecdn.com/image/item/popup/seperator-"+item.base.rarity.toLowerCase()+".png?1648706966521"}></Separator>;
};

const Separator = styled(FlexWrap)<{ image: string }>`
  height: 7.91075px;
  width: 750px;
  margin: 1px 0px;
  background: url(${props => props.image}) no-repeat center;
`;
