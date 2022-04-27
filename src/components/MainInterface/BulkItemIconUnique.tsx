import { useEffect, useState } from "react";
import styled from "styled-components";
import { FlexWrap } from "../baseStyles";
import { Affixes } from "./BulkItem/Affixes";
import { Defences } from "./BulkItem/Defences";
import { Divider } from "./BulkItem/Divider";
import { Enchant } from "./BulkItem/Enchant";
import { Implicit } from "./BulkItem/Implicit";
import { ItemIcon } from "./BulkItem/ItemIcon";
import { NameHeader } from "./BulkItem/NameHeader";
import { Note } from "./BulkItem/Note";
import { Offense } from "./BulkItem/Offense";
import { Quality } from "./BulkItem/Quality";
import { Requirements } from "./BulkItem/Requirements";

const BulkItemIcon = ({ item }: any) => {
  return (
    <Wrapper>
      <NameHeader item={item} />

      <Quality item={item} />

      <Offense item={item} />

      <Defences item={item} />

      <Requirements item={item} />

      <Enchant item={item} />

      <Implicit item={item} />

      <Affixes item={item} />

      <Note item={item} />

      <ItemIcon item={item} />
    </Wrapper>
  );
};

export default BulkItemIcon;

const Wrapper = styled(FlexWrap)`
  width: 80%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  flex-direction: column;
`;

const IconBase = styled.img``;

const Separator = styled(FlexWrap)`
  background: url("https://web.poecdn.com/image/item/popup/seperator-unique.png?1648706966521")
    center no-repeat;
  height: 7.91075px;
  width: 100%;
  padding: 2px 0px;
`;
