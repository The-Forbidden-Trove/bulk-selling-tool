import styled from "styled-components";
import { Checkbox } from "../Checkbox";
import { useAppDispatch, useAppSelector } from "../..";
import { Item } from "../../types";
import { FlexWrap } from "../baseStyles";
import ItemRecord from "./ItemRecord";
import { selectAllItems, unselectAllItems } from "../../reducers/itemReducer";
import { useEffect, useState } from "react";

const PickedItems = () => {
  const items = useAppSelector((store) => store.items);
  const filter = useAppSelector((store) => store.itemOptions).search || "";
  const sorters = useAppSelector((store) => store.itemOptions).sorters;

  const dispatch = useAppDispatch();
  const [selectAll, setSelectAll] = useState(true);
  const runCallback = (cb: any) => {
    return cb();
  };

  const handleSelectAll = () => {
    if (selectAll) {
      dispatch(unselectAllItems());
      setSelectAll(false);
    } else {
      dispatch(selectAllItems());
      setSelectAll(true);
    }
  };

  useEffect(() => {
    setSelectAll(
      Object.values(items)
        .flat()
        .every((x: any) => {
          return x.isSelected;
        })
    );
  }, [items]);

  return (
    <>
      <ItemRecordWrap isSelected={true}>
        <NameWrap onClick={handleSelectAll}>
          <Checkbox
            checked={selectAll}
            onChange={() => { }}
            style={selectAll ? { opacity: 1 } : { opacity: 0.5 }}
          />
          <p
            style={{
              fontSize: "24px",
              color: "#33ACD0",
              padding: "0px 0px 0px 10px",
            }}
          >
            Name
          </p>
        </NameWrap>
        <Label>Stack size</Label>
        <Label>Asking price</Label>
        <Label>Multiplier</Label>
        <Label>Chaos value</Label>
        <Label>Divine value</Label>
      </ItemRecordWrap>
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
            .sortByMultiple(...sorters)
            .map((item: any) => {
              return <ItemRecord item={item} key={item.id} />;
            });
        })}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 40%;
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

const ItemRecordWrap = styled(FlexWrap) <{ isSelected?: boolean }>`
  width: 100%;
  opacity: ${(props) => (props.isSelected ? 1 : 0.4)};
  justify-items: flex-start;
  font-size: ${(props) => props.theme.fontM};
`;

const Label = styled(FlexWrap)`
  justify-content: center;
  font-size: ${(props) => props.theme.fontL};
  color: ${(props) => props.theme.colors.accent};
  padding: 0px 0px 5px 0px;
  width: 15%;
`;

const NameWrap = styled(FlexWrap)`
  width: 25%;
  justify-content: flex-start;
  outline: none;
  border: none;
  cursor: pointer;
`;
