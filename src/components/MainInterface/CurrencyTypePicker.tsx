import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../..";
import { CurrencyType } from "../../types";
import { toggleSelectCurrency } from "../../reducers/currencyTypeReducer";
import { FlexWrap } from "../baseStyles";

const Wrapper = styled.div`
  color: ${(props) => props.theme.colors.accent};
  display: flex;
  flex-wrap: wrap;
`;

const TypeWrap = styled(FlexWrap)<{ isSelected?: boolean }>`
  cursor: pointer;
  max-height: 42px;
  margin: 0px 5px;
  > p {
    color: ${(props) =>
      props.isSelected ? props.theme.colors.accent : props.theme.colors.text};
    font-size: ${(props) => props.theme.fontM};
    padding: 0px 5px;
  }
`;

const Icon = styled.img`
  padding: 0px 5px 0px 0px;
  width: 36px;
  height: 36px;
  object-fit: contain;
`;
const CurrencyTypePicker = () => {
  const currencyTypes = useAppSelector((store) => store.currencyTypes);
  const dispatch = useAppDispatch();

  return (
    <Wrapper>
      {currencyTypes.map((currencyType: CurrencyType) => {
        return (
          <TypeWrap
            isSelected={currencyType.isSelected}
            onClick={() => dispatch(toggleSelectCurrency(currencyType.type))}
          >
            <Icon src={currencyType.icon} alt="icon" />
            <p>{currencyType.type}</p>
          </TypeWrap>
        );
      })}
    </Wrapper>
  );
};

export default CurrencyTypePicker;
