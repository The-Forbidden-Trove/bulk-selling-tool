import styled from "styled-components";
import { FlexWrap } from "../../baseStyles";

export const BulkItemHeader = ({ item }: any) => {
  return (
    <Wrapper>
      {(item.exValue > 0 || item.chaosValue > 0 || item.mirrorValue > 0) &&
        item.isMirrorService && (
          <PriceWrapper>
            <Icon
              src={
                "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lEdXBsaWNhdGUiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/7111e35254/CurrencyDuplicate.png"
              }
            />
          </PriceWrapper>
        )}

      {(item.exValue > 0 || item.chaosValue > 0 || item.mirrorValue > 0) &&
        item.isMirrorService ? (
        <Price>Mirror Fee: </Price>
      ) : (
        <></>
      )}

      {(item.exValue > 0 || item.chaosValue > 0 || item.mirrorValue > 0) &&
        !item.isMirrorService ? (
        <Price>Asking Price</Price>
      ) : (
        <></>
      )}

      {item.mirrorValue > 0 && (
        <PriceWrapper>
          <Icon
            src={
              "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lEdXBsaWNhdGUiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/7111e35254/CurrencyDuplicate.png"
            }
          />
          <Price>{item.mirrorValue}</Price>
        </PriceWrapper>
      )}

      {item.exValue > 0 && (
        <PriceWrapper>
          <Icon
            src={
              "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lNb2RWYWx1ZXMiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/e1a54ff97d/CurrencyModValues.png"
            }
          />
          <Price>{item.exValue}</Price>
        </PriceWrapper>
      )}

      {item.chaosValue > 0 && (
        <PriceWrapper>
          <Icon
            src={
              "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lSZXJvbGxSYXJlIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/d119a0d734/CurrencyRerollRare.png"
            }
          />
          <Price>{item.chaosValue}</Price>
        </PriceWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled(FlexWrap)`
  width: 100%;

  background: transparent;
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
