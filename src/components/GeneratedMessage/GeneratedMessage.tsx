import styled from "styled-components";
import { useAppSelector } from "../..";
import { FlexWrap } from "../baseStyles";
import { CurrencyType, Item, StashTab } from "../../types";
import GeneratedMessageItemRecord from "./GeneratedMessageItemRecord";

const GeneratedMessage = () => {
  let sum = 0;
  const items = useAppSelector((store) => store.items);
  const selectedTypes = useAppSelector((store) => store.stashes)
    .filter((stash: StashTab) => {
      return stash.isSelected;
    })
    .flatMap((stash: StashTab) => {
      return stash.assignedTypes;
    })
    .filter(
      (thing: CurrencyType, index: number, self: any) =>
        index ===
        self.findIndex(
          (t: CurrencyType) => t.type === thing.type && t.icon === thing.icon
        )
    );

  const exPrice = useAppSelector((store) => store.exaltedPrice).value || 1;

  for (const [key, value] of Object.entries(items)) {
    if (items[key].isSelected) {
      sum += items[key].totalValue;
    }
  }

  const runCallback = (cb: any) => {
    return cb();
  };

  return (
    <Wrapper id="generatedMessage">
      <H>Generated with tft-bulk-selling-tool</H>
      <Header>
        <CurrencyTypes>
          <P>Currency types</P>
          {selectedTypes.map((x: Partial<CurrencyType>) => {
            return <Icon src={x.icon} />;
          })}
        </CurrencyTypes>
        <ExPrice>
          <P>
            <Icon
              src={
                "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?scale=1&w=1&h=1"
              }
            />
            <p>/</p>

            <Icon
              src={
                "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyAddModToRare.png?scale=1&w=1&h=1"
              }
            />
          </P>
          <P> {exPrice}</P>
        </ExPrice>
      </Header>

      <Header>
        <TotalValue>
          <P>Total value </P>

          <FlexWrap>
            <Icon
              src={
                "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?scale=1&w=1&h=1"
              }
            />
            <P>{Math.round((sum + Number.EPSILON) * 100) / 100}</P>
          </FlexWrap>

          <FlexWrap>
            <Icon
              src={
                "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyAddModToRare.png?scale=1&w=1&h=1"
              }
            />
            <P>{Math.round(((sum + Number.EPSILON) * 100) / exPrice) / 100}</P>
          </FlexWrap>
        </TotalValue>
      </Header>

      <ItemsWrapper>
        <ItemRecordWrap>
          <P2>Currency</P2>
          <P2>Price per unit</P2>
          <P2>Total chaos</P2>
          <P2>Total exalted</P2>
        </ItemRecordWrap>

        <ItemRecordWrap>
          <P2>Currency</P2>
          <P2>Price per unit</P2>
          <P2>Total chaos</P2>
          <P2>Total exalted</P2>
        </ItemRecordWrap>

        <ItemRecordWrap>
          <P2>Currency</P2>
          <P2>Price per unit</P2>
          <P2>Total chaos</P2>
          <P2>Total exalted</P2>
        </ItemRecordWrap>
        {runCallback(() => {
          const rows: Item[] = [];

          for (const [key, value] of Object.entries(items)) {
            rows.push(value as Item);
          }
          return rows
            .filter((x: any) => {
              return x.isSelected;
            })
            .sort((item1: any, item2: any) => {
              return item2.stackSize - item1.stackSize;
            })
            .map((item: any) => {
              return <GeneratedMessageItemRecord item={item} />;
            });
        })}
      </ItemsWrapper>
    </Wrapper>
  );
};

export default GeneratedMessage;

const P2 = styled(FlexWrap)`
  font-size: 16px;
  color: ${(props) => props.theme.colors.accent2};
`;
const Header = styled(FlexWrap)`
  margin: 5px 0px;
  width: 100%;
  justify-content: space-between;

  background: ${(props) => props.theme.colors.bg};
`;
const CurrencyTypes = styled(FlexWrap)``;
const ExPrice = styled(FlexWrap)``;
const Wrapper = styled(FlexWrap)`
  justify-content: flex-start;
  visibility: visible;
  padding: 20px 20px 10px 20px;
  flex-direction: column;
  left: -500%;
  position: absolute;

  background: ${(props) => props.theme.colors.bg};
  min-height: 80vh;
  min-width: 80vw;
  box-shadow: 4px 5px 52px rgba(0, 0, 0, 0.8);
  -webkit-box-shadow: 4px 5px 52px rgba(0, 0, 0, 0.8);
  -moz-box-shadow: 4px 5px 52px rgba(0, 0, 0, 0.8);
  border-radius: 15px;
  border: 10px solid ${(props) => props.theme.colors.fg};
`;

const Icon = styled.img`
  padding: 0px 5px;
  width: 42px;
  height: 42px;
  object-fit: contain;
`;

const P = styled(FlexWrap)`
  font-size: 26px;
  color: ${(props) => props.theme.colors.text};
  margin: 0px 5px;
`;
const TotalValue = styled(FlexWrap)`
  align-self: flex-end;
`;
const H = styled.h3`
  font-size: 22px;
  color: ${(props) => props.theme.colors.text};
`;

const ItemsWrapper = styled.div`
  background: ${(props) => props.theme.colors.bg};
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-columns: min-content;
  grid-auto-rows: min-content;
`;

const ItemRecordWrap = styled.div`
  margin: 5px 10px;

  justify-items: start;
  font-size: ${(props) => props.theme.fontM};
  grid-template-columns: 1fr 1fr 1fr 1fr;
  display: grid;
`;
