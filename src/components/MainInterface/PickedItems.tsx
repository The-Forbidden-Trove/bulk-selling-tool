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
        return (
          rows
            .filter((x: any) => {
              return x.name
                .toLocaleLowerCase()
                .includes(filter.toLocaleLowerCase());
            })
            //.sort((item1: any, item2: any) => {
            //return item2.stackSize - item1.stackSize;
            //})

            .sort((item1: any, item2: any) => {
              return item2.totalValue - item1.totalValue;
            })
            .map((item: any) => {
              return <ItemRecord item={item} key={item.id} />;
            })
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 45%;
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
