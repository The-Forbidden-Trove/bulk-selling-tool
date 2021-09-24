import styled from "styled-components";
import { useAppSelector } from "../..";
import { StashTab } from "../../types";
import { FlexWrap } from "../baseStyles";

const Wrapper = styled.div`
  margin: 10px 5px 0px 5px;
  grid-column: 1 / -1;
`;

const ItemRecordWrap = styled.div`
  display: grid;
  justify-items: start;
  grid-row-gap: 15px;
  grid-template-columns: 3fr 2fr 2fr 1fr 2fr;
  grid-auto-columns: min-content;
  grid-auto-rows: min-content;
`;
const P = styled(FlexWrap)`
  color: ${(props) => props.theme.colors.text};
`;
const NameWrap = styled(FlexWrap)``;
const AllItems = () => {
  const runCallback = (cb: any) => {
    return cb();
  };

  const selectedStashes: StashTab[] = useAppSelector(
    (store) => store.stashes
  ).filter((stash: StashTab) => {
    return stash.isSelected;
  });

  return (
    <Wrapper>
      <ItemRecordWrap>
        {runCallback(() => {
          const row: any = [];
          let items: Record<string, any> = [];

          selectedStashes.map((stash) => {
            if (stash.filteredItems)
              for (const [key, value] of Object.entries(stash.filteredItems)) {
                if (items[key]) {
                  items[key].stackSize += value.stackSize;
                }
                items[key] = value;
              }
          });
          for (const [key, value] of Object.entries(items)) {
            const item = {
              name: value.name,
              icon: value.icon,
              stackSize: value.stackSize,
              multiplier: value.multiplier,
              chaosEquivalent: value.chaosEquivalent,
            };
            row.push(item);
          }
          return row
            .sort((x: any, y: any) => {
              return y.stackSize - x.stackSize;
            })
            .map((x: any) => {
              return (
                <>
                  <NameWrap>
                    <p>x</p>
                    <img src={x.icon} alt="icon" />
                    <P>{x.name}</P>
                  </NameWrap>
                  <P>{x.stackSize}</P>
                  <P>
                    <img
                      src={
                        "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?scale=1&w=1&h=1"
                      }
                    />
                    {Math.round((x.chaosEquivalent + Number.EPSILON) * 100) /
                      100}
                  </P>
                  <P>{x.multiplier}</P>

                  <P>T</P>
                </>
              );
            });
        })}
      </ItemRecordWrap>
    </Wrapper>
  );
};

export default AllItems;
