import styled from "styled-components";
import { useAppSelector } from "../..";
import { FlexWrap } from "../baseStyles";
import chaosOrb from "../../assets/chaosOrb.png";
import exaltedOrb from "../../assets/exaltedOrb.png";

const GeneratedMessageItemRecord = ({ item }: any) => {
  const exPrice = useAppSelector((store) => store.exaltedPrice).value || 1;

  return (
    <ItemRecordWrap>
      <NameWrap>
        <Icon src={item.icon} alt="icon" />
        <P>{item.stackSize}</P>
      </NameWrap>

      <P>
        <Icon src={chaosOrb} />
        <ChaosValue>{item.sellValue}</ChaosValue>
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
  margin: 0;
  padding: 0px;
`;

const ItemRecordWrap = styled.div`
  margin: 5px 10px;

  justify-items: start;
  font-size: ${(props) => props.theme.fontM};
  grid-template-columns: 1fr 1fr 1fr 1fr;
  display: grid;
  border: 0.5px solid ${(props) => props.theme.colors.fg2};
`;

const NameWrap = styled(FlexWrap)`
  margin: 0px 5px 0px 0px;
  background: none;
  outline: none;
  border: none;
`;

const Icon = styled.img`
  padding: 0px 5px;
  width: 36px;
  height: 36px;
  object-fit: contain;
`;

const P = styled(FlexWrap)`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text};
`;
