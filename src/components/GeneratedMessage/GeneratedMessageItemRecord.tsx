import styled from "styled-components";
import { useAppSelector } from "../..";
import { FlexWrap } from "../baseStyles";
import chaosOrb from "../../assets/chaosOrb.png";
import exaltedOrb from "../../assets/divineOrb.png";

import { FaTimes } from "react-icons/fa";

const iconStyle = {
  fill: "#555",
  padding: "0px 0px",
  cursor: "pointer",
  width: "12px",
  height: "12px",
};

const GeneratedMessageItemRecord = ({ item }: any) => {
  const exPrice = useAppSelector((store) => store.exaltedPrice).value || 1;
  // console.log(item);
  let name = `/icons/${item.name.replace(/\s+/g, "_")}.png`;
  // console.log(name);

  if (item.name.includes("Contract")) {
    name = "/icons/Contract.png";
  } else if (
    item.icon ===
    "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvTmVjcm9wb2xpcy9OZWNyb3BvbGlzQ29mZmluRmlsbGVkIiwidyI6MiwiaCI6MSwic2NhbGUiOjF9XQ/5b4214a420/NecropolisCoffinFilled.png"
  ) {
    name = "/icons/Coffin.png";
  }

  return (
    <ItemRecordWrap>
      <Stack>{item.stackSize}</Stack>
      <NameWrap>
        <span
          style={{
            color: "#9c9c9c",
            fontSize: "12px",
          }}
        >
          x
        </span>

        <Icon src={name} alt={item.name} crossOrigin="anonymous" />
        <P2>{item.shortName}</P2>
      </NameWrap>

      <P>
        <Icon src={chaosOrb} />
        <ChaosValue>{item.chaosEquivalent}</ChaosValue>
      </P>

      <P>
        <Icon src={chaosOrb} />
        <SellValue>{item.sellValue}</SellValue>
        <P>{item.sellMultiplier}%</P>
      </P>

      <P>
        <Icon src={chaosOrb} />
        {Math.round((item.totalValue + Number.EPSILON) * 100) / 100}
      </P>

      <P>
        <Icon src={exaltedOrb} />
        {Math.round(((item.totalValue + Number.EPSILON) * 100) / exPrice) / 100}
      </P>
    </ItemRecordWrap>
  );
};
export default GeneratedMessageItemRecord;

const ChaosValue = styled.p`
  width: 55px;
  font-size: 16px;
  color: ${(props) => props.theme.colors.text};
  margin: 0px;
  padding: 0px;
`;
const SellValue = styled.p`
  width: 55px;
  font-size: 16px;
  color: ${(props) => props.theme.colors.accent};
  margin: 0px;
  padding: 0px;
`;

const ItemRecordWrap = styled.div`
  margin: 0px 0px;
  padding: 0px 0px 0px 4px;

  justify-items: start;
  font-size: ${(props) => props.theme.fontM};
  grid-template-columns: minmax(12px, 20px) minmax(
      0px,
      1fr
    ) 100px 160px 100px 100px;
  display: grid;
  border: 0.5px solid ${(props) => props.theme.colors.fg2};
`;

const NameWrap = styled(FlexWrap)`
  padding: 0px 0px 0px 1px;
  background: none;
  outline: none;
  border: none;
`;

const Icon = styled.img`
  padding: 0px 0px;
  width: 32px;
  height: 32px;
  object-fit: contain;
`;

const P = styled(FlexWrap)`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text};
`;

const P2 = styled(FlexWrap)`
  font-size: 16px;
  padding: 0px 2px 0px 2px;
  color: ${(props) => props.theme.colors.text};
`;

const Stack = styled(FlexWrap)`
  font-size: 14px;
  margin: 0px 1px 0px 0px;
  width: 100%;
  color: ${(props) => props.theme.colors.text};
  align-items: center;
  text-align: right;
  justify-content: flex-end;
  align-content: center;
`;
