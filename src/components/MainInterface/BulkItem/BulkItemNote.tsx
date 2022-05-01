import styled from "styled-components";
import { FlexWrap } from "../../baseStyles";

export const BulkItemNote = ({ item }: any) => {
  return <Wrapper>{item.itemNote && <Price>{item.itemNote}</Price>}</Wrapper>;
};

const Wrapper = styled(FlexWrap)`
  width: 100%;
  justify-content: flex-start;
  padding: 3px 10px;
`;

const Icon = styled.img`
  padding: 0px 5px 0px 0px;
  width: 36px;
  height: 36px;
  object-fit: contain;
`;

const Price = styled(FlexWrap)`
  font-size: 18px;
  color: ${(props) => props.theme.colors.accent2};
  padding: 0px 5px;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
`;
