import styled from "styled-components";
import { FlexWrap } from "../baseStyles";
import AllTabs from "./AllTabs";
import CurrencyTypePicker from "./CurrencyTypePicker";

const StashTabPicker = () => {
  return (
    <Wrapper>
      <AllTabs />
      <CurrencyTypePicker />
    </Wrapper>
  );
};

export default StashTabPicker;

const Wrapper = styled(FlexWrap)`
  width: 100%;
  height: 34%;
`;
