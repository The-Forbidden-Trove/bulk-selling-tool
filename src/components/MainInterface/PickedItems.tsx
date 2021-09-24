import styled from "styled-components";
import { useAppSelector } from "../..";
import { Item } from "../../types";
import ItemRecord from "./ItemRecord";

const PickedItems = ({ filter }: any) => {
  const items = useAppSelector((store) => store.items);

  const runCallback = (cb: any) => {
    return cb();
  };

  return (
    <Wrapper>
      {runCallback(() => {
        const rows: Item[] = [];
        for (const [key, value] of Object.entries(items)) {
          rows.push(value as Item);
        }
        return rows
          .filter((x: any) => {
            return x.name
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase());
          })
          .sort((item1: any, item2: any) => {
            return item2.stackSize - item1.stackSize;
          })
          .map((item: any) => {
            return <ItemRecord item={item} />;
          });
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0px 5px 0px 5px;
  padding: 0px 25px;
  overflow-y: scroll;

  grid-column: 1 / -1;
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
    background: none;
  }

  &::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;

    background: none;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
  }
`;

export default PickedItems;
