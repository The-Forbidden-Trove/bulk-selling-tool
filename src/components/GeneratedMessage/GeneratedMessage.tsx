import styled from "styled-components";
import CryptoJS from "crypto-js";
import { useAppSelector } from "../..";
import { FlexWrap } from "../baseStyles";
import { CurrencyType, Item, StashTab } from "../../types";
import GeneratedMessageItemRecord from "./GeneratedMessageItemRecord";
// for some reason I couldn't get these to render on the generated message
// even tho I added cors and tainted canvas to html2canvas
import chaosOrb from "../../assets/chaosOrb.png";
import exaltedOrb from "../../assets/divineOrb.png";
import { useEffect, useState } from "react";

const GeneratedMessage = () => {
  let sellSum = 0;
  let ninjaSum = 0;
  const items = useAppSelector((store) => store.items);
  const [ninjaTimestamp, setNinjaTimestamp] = useState("");
  const [name, setName] = useState("");

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
          (t: CurrencyType) => t.type === thing.type && t.icon === thing.icon,
        ),
    );

  const exPrice = useAppSelector((store) => store.exaltedPrice).value || 1;
  const exDefaultPrice =
    useAppSelector((store) => store.exaltedPrice).defaultValue || 1;

  const contracts = Object.values(items)
    .filter((x: any) => x.isSelected)
    .filter((x: any) => x.name.includes("Contract"));
  const sextants = Object.values(items)
    .filter((x: any) => x.isSelected)
    .filter((x: any) => x.name.match(/Sextant (\w\s*)*\(\d*\s*uses\)/));

  for (const [key, value] of Object.entries(items)) {
    if (items[key].isSelected) {
      sellSum += items[key].totalValue;
      ninjaSum += items[key].chaosEquivalent * items[key].stackSize;
    }
  }

  const runCallback = (cb: any) => {
    return cb();
  };

  function utf8_to_b64(str: string) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  function b64_to_utf8(str: string) {
    return decodeURIComponent(escape(window.atob(str)));
  }

  useEffect(() => {
    const time = JSON.parse(window.localStorage.getItem("ninjaFetch") || "{}");
    const name = JSON.parse(window.localStorage.getItem("auth") || "{}");

    if (typeof time === "number") {
      var theDate = new Date(time);
      setNinjaTimestamp(theDate.toUTCString());
    }

    if (typeof name !== undefined) {
      if (name.user) {
        var encodedString = utf8_to_b64(name.user);
        // var decodedString = b64_to_utf8(encodedString);
        // console.log(decodedString)
        // console.log(encodedString)
        setName(encodedString);
      }
    }
  }, [localStorage.getItem("ninjaFetch")]);

  return (
    <Wrapper id="generatedMessage">
      <FloatTop>
        <H
          style={{
            display: "flex",
            justifyItems: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Generated with TFT Bulk Selling Tool&nbsp;
          <H3> - https://bulk.tftrove.com</H3>
        </H>
        <H
          style={{
            display: "flex",
            justifyItems: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Sell Fast, Stay Safe at TFT&nbsp;
          <H3> - discord.gg/tftrove</H3>
        </H>
      </FloatTop>
      <Header>
        <TotalValue>
          <P>Ninja price</P>
          <FlexWrap>
            <Icon src={chaosOrb} />
            <P>{Math.round((ninjaSum + Number.EPSILON) * 100) / 100}</P>
          </FlexWrap>

          <FlexWrap>
            <Icon src={exaltedOrb} />
            <P>
              {Math.round(
                ((ninjaSum + Number.EPSILON) * 100) / exDefaultPrice,
              ) / 100}
            </P>
          </FlexWrap>
        </TotalValue>
        <ExPrice>
          <P>
            <p>Ninja rate</p>
            <Icon src={chaosOrb} />
            <p>/</p>
            <Icon src={exaltedOrb} />
            <P> {exDefaultPrice}</P>
          </P>
          {exDefaultPrice !== exPrice && <P>|</P>}
          {exDefaultPrice !== exPrice && (
            <P>
              <p style={{ color: "#e49a05" }}>Asking rate</p>
              <Icon src={chaosOrb} />
              <p>/</p>
              <Icon src={exaltedOrb} />
              <P style={{ color: "#e49a05" }}> {exPrice}</P>
            </P>
          )}
        </ExPrice>

        {ninjaTimestamp && (
          <FloatBottomRight>
            Poe.ninja gathered at: {ninjaTimestamp}
          </FloatBottomRight>
        )}

        {name && <FloatBottomLeft>ID: {name}</FloatBottomLeft>}
      </Header>

      <Header>
        <TotalValue>
          <R>Asking price</R>
          <FlexWrap>
            <Icon src={chaosOrb} />
            <R>{Math.round((sellSum + Number.EPSILON) * 100) / 100}</R>
          </FlexWrap>

          <FlexWrap>
            <Icon src={exaltedOrb} />
            <R>
              {Math.round(((sellSum + Number.EPSILON) * 100) / exPrice) / 100}
            </R>
          </FlexWrap>
          <FlexWrap>
            <R>({Math.round((sellSum / ninjaSum) * 100)}% Ninja price)</R>
          </FlexWrap>

          <Excluded>
            {contracts.length > 0 || sextants.length > 0
              ? "( excluding: " +
                (contracts.length > 0 ? "contracts " : "") +
                (sextants.length > 0 ? "sextants " : "") +
                ")"
              : ""}
          </Excluded>
        </TotalValue>
        <CurrencyTypes>
          <P>Currency types</P>
          {selectedTypes.map((x: Partial<CurrencyType>) => {
            if (x.type === "Currency") {
              return <Icon src={chaosOrb} key={x.type} />;
            }
            return <Icon src={x.icon} key={x.type} />;
          })}
        </CurrencyTypes>
      </Header>

      <ItemsWrapper>
        <ItemRecordWrap>
          <div></div>
          <P2>Currency</P2>
          <P2>Ninja price</P2>
          <P2>Asking price</P2>
          <P2>Total chaos</P2>
          <P2>Total divine</P2>
        </ItemRecordWrap>

        <ItemRecordWrap>
          <div></div>
          <P2 style={{ padding: "0px 0px 0px 35px" }}>Currency</P2>
          <P2>Ninja price</P2>
          <P2>Asking price</P2>
          <P2>Total chaos</P2>
          <P2>Total divine</P2>
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
              return item2.totalValue - item1.totalValue;
            })
            .map((item: any) => {
              return <GeneratedMessageItemRecord item={item} key={item.id} />;
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
  padding: 0px 0px;
  width: 100%;
  justify-content: space-between;
`;

const FloatBottomLeft = styled(FlexWrap)`
  bottom: 0%;
  left: 0%;
  padding: 5px 0px;
  margin: 5px 0px 0px 5px;
  position: absolute;
  opacity: 0.2;
`;

const FloatBottomRight = styled(FlexWrap)`
  bottom: 0%;
  right: 0%;
  padding: 5px 0px;
  margin: 5px 0px 0px 5px;
  position: absolute;
  opacity: 0.2;
`;

const FloatTop = styled(FlexWrap)`
  top: 0%;
  position: absolute;
  opacity: 0.8;
  flex-direction: column;
`;

const CurrencyTypes = styled(FlexWrap)``;
const ExPrice = styled(FlexWrap)``;
const Wrapper = styled(FlexWrap)`
  justify-content: flex-start;

  visibility: visible;
  padding: 20px 20px 10px 20px;
  flex-direction: column;
  left: -5000%;
  top: -5000%;
  position: absolute;

  background: ${(props) => props.theme.colors.bg};
  min-height: 50vh;
  min-width: 80%;
  box-shadow: 4px 5px 52px rgba(0, 0, 0, 0.8);
  -webkit-box-shadow: 4px 5px 52px rgba(0, 0, 0, 0.8);
  -moz-box-shadow: 4px 5px 52px rgba(0, 0, 0, 0.8);
  border-radius: 15px;
  border: 10px solid ${(props) => props.theme.colors.fg};
`;

const Icon = styled.img`
  padding: 0px 3px;
  width: 42px;
  height: 42px;
  object-fit: contain;
`;

const P = styled(FlexWrap)`
  font-size: 24px;
  color: ${(props) => props.theme.colors.text};
  padding: 0px 5px;
`;

const Excluded = styled(FlexWrap)`
  font-size: 16px;
  height: 100%;
  text-align: center;
  align-items: center;
  color: ${(props) => props.theme.colors.text};
  opacity: 0.5;
  padding: 0px 5px;
`;

const R = styled(FlexWrap)`
  font-size: 26px;
  color: ${(props) => props.theme.colors.accent2};
  padding: 0px 5px;
`;
const TotalValue = styled(FlexWrap)`
  align-self: flex-end;
`;
const H = styled.h3`
  font-size: 22px;
  color: ${(props) => props.theme.colors.text};
`;

const H3 = styled.h3`
  font-size: 18px;
  color: ${(props) => props.theme.colors.accent2};
`;

const ItemsWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-column-gap: 20px;
  grid-auto-columns: min-content;
  grid-auto-rows: min-content;
`;

const ItemRecordWrap = styled.div`
  padding: 0px 0px;

  justify-items: start;
  font-size: ${(props) => props.theme.fontM};
  grid-template-columns: minmax(12px, 20px) minmax(0px, 1fr) 100px 160px 100px 100px;
  display: grid;
`;
