import styled from "styled-components";
import { FlexWrap } from "../baseStyles";
import { Affixes } from "./BulkItem/Affixes";
import { Defences } from "./BulkItem/Defences";
import { Enchant } from "./BulkItem/Enchant";
import { Implicit } from "./BulkItem/Implicit";
import { ItemIcon } from "./BulkItem/ItemIcon";
import { NameHeader } from "./BulkItem/NameHeader";
import { Note } from "./BulkItem/Note";
import { Offense } from "./BulkItem/Offense";
import { Quality } from "./BulkItem/Quality";
import { Requirements } from "./BulkItem/Requirements";
import { Scourge } from "./BulkItem/Scourge";
import { ScourgeBottom } from "./BulkItem/ScourgeBottom";

const BulkItemIcon = ({ item }: any) => {
  return (
    <Wrapper>
      <NameHeader item={item} />

      <Quality item={item} />

      <Offense item={item} />

      <Defences item={item} />

      <Requirements item={item} />

      <Enchant item={item} />

      <Scourge item={item} />

      <Implicit item={item} />

      <Affixes item={item} />

      <Note item={item} />

      <ScourgeBottom item={item} />

      <ItemIcon item={item} />
    </Wrapper>
  );
};

export default BulkItemIcon;

const Wrapper = styled(FlexWrap)`
  width: 100%;
  font-size: 0.7em;
  background: rgba(0, 0, 0, 0.6);
  justify-content: flex-start;
  flex-direction: column;
`;
