import styled from "styled-components";
import { FlexWrap } from "../../baseStyles";

export const BulkItemHeader = ({ item }: any) => {
  return (
    <Wrapper>
      {(item.exValue > 0 || item.chaosValue > 0) && item.isMirrorService && (
        <PriceWrapper>
          <Icon
            src={
              "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyDuplicate.png?scale=1&w=1&h=1"
            }
          />
        </PriceWrapper>
      )}

      {(item.exValue > 0 || item.chaosValue > 0) && item.isMirrorService ? (
        <Price>Mirror Fee: </Price>
      ) : (
          <></>
      )}

      {(item.exValue > 0 || item.chaosValue > 0) && !item.isMirrorService ? (
        <Price>Estimated Value</Price>
      ) : (
          <></>
      )}


      {item.chaosValue > 0 && (
        <PriceWrapper>
          <Icon
            src={
              "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?scale=1&w=1&h=1"
            }
          />
          <Price>{item.chaosValue}</Price>
        </PriceWrapper>
      )}

      {item.exValue > 0 && (
        <PriceWrapper>
          <Icon
            src={
              "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyAddModToRare.png?scale=1&w=1&h=1"
            }
          />
          <Price>{item.exValue}</Price>
        </PriceWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled(FlexWrap)`
  width: 100%;
`;

const PriceWrapper = styled(FlexWrap)``;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

const Price = styled(FlexWrap)`
  color: ${(props) => props.theme.colors.accent2};
  padding: 0px 5px;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
`;
