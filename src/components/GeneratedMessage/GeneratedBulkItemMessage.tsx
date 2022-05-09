import styled from "styled-components";
import { useAppSelector } from "../..";
import { FlexWrap } from "../baseStyles";

import BulkItemIcon from "../MainInterface/BulkItemIconUnique";
import { BulkItemHeader } from "../MainInterface/BulkItem/BulkItemHeader";
import { BulkItemNote } from "../MainInterface/BulkItem/BulkItemNote";

import Masonry from "@mui/lab/Masonry";
import chaosOrb from "../../assets/chaosOrb.png";
import exaltedOrb from "../../assets/exaltedOrb.png";
import { useEffect, useState } from "react";

const GeneratedBulkItemMessage = ({ selectedItems, msg }: any) => {
  const [sellEx, setSellEx] = useState(0);
  const [sellChaos, setSellChaos] = useState(0);
  const [sellMirror, setSellMirror] = useState(0);
  const [columns, setColumns] = useState(1);

  const exPrice = useAppSelector((store) => store.exaltedPrice).value || 1;
  const exDefaultPrice =
    useAppSelector((store) => store.exaltedPrice).defaultValue || 1;

  const makeChaosPrice = (askingPrice: number) => {
    const askingPriceChaos = Math.round(
      ((askingPrice * 100) / exPrice / 100 -
        Math.floor((askingPrice * 100) / exPrice / 100)) *
        exPrice,
    );
    return askingPriceChaos;
  };

  const makeExPrice = (askingPrice: number) => {
    const askingPriceEx = Math.floor((askingPrice * 100) / exPrice / 100);

    return askingPriceEx;
  };
  useEffect(() => {
    let totalChaos = 0;
    let totalMirror = 0;
    selectedItems.forEach((item: any) => {
      totalChaos += Number(item.chaosValue);
      totalChaos += Number(item.exValue) * exPrice;
      totalMirror += Number(item.mirrorValue);
    });
    setSellEx(makeExPrice(totalChaos));
    setSellChaos(makeChaosPrice(totalChaos));
    setSellMirror(totalMirror);

    const len = selectedItems.length;
    if (len === 1) setColumns(2);
    if (len === 2) setColumns(2);
    if (len >= 3) setColumns(3);
  }, [selectedItems, exPrice, makeExPrice, makeChaosPrice]);

  const runCallback = (cb: any) => {
    return cb();
  };

  return (
    <Wrapper id="generatedBulkItemMessage">
      <H>Generated with TFT Bulk Selling Tool</H>
      <Header>
        <TotalValue>
          <P>Asking Price</P>

          {sellMirror > 0 && (
            <FlexWrap>
              <Icon
                src={
                  "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lEdXBsaWNhdGUiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/7111e35254/CurrencyDuplicate.png"
                }
              />
              <P>{sellMirror}</P>
            </FlexWrap>
          )}

          {sellEx > 0 && (
            <FlexWrap>
              <Icon src={exaltedOrb} />
              <P>{Math.round(sellEx)}</P>
            </FlexWrap>
          )}

          {sellChaos > 0 && (
            <FlexWrap>
              <Icon src={chaosOrb} />
              <P>{Math.round(sellChaos)}</P>
            </FlexWrap>
          )}
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
      </Header>

      {runCallback(() => {
        return (
          <Masonry columns={columns} spacing={2}>
            {selectedItems.map((x: any) => {
              return (
                <BulkItemWrapper>
                  <BulkItemNote item={x} />
                  <BulkItemIcon item={x.item} />
                  <BulkItemHeader item={x} />
                </BulkItemWrapper>
              );
            })}
          </Masonry>
        );
      })}
      <P>{msg}</P>
    </Wrapper>
  );
};

export default GeneratedBulkItemMessage;

const Header = styled(FlexWrap)`
  padding: 5px 0px;
  width: 100%;
  justify-content: space-between;
`;
const ExPrice = styled(FlexWrap)``;

const Wrapper = styled(FlexWrap)`
  justify-content: flex-start;

  visibility: visible;
  padding: 20px 20px 10px 20px;
  flex-direction: column;
  left: 5000%;
  top: 5000%;
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

const TotalValue = styled(FlexWrap)`
  align-self: flex-end;
`;
const H = styled.h3`
  font-size: 22px;
  color: ${(props) => props.theme.colors.text};
`;

const BulkItemWrapper = styled(FlexWrap)`
  flex-direction: column;
  border: solid 3px #0b1a3a;
  background: #0b1a3a;
  border-radius: 0.5em;
  padding: 0px 1px;
`;
