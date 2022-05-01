import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../..";
import { useAuth } from "../../api/oauth/AuthContext";
import { initCurrencies } from "../../reducers/currencyTypeReducer";
import { initStashes } from "../../reducers/stashReducer";
import { currencies } from "../../types";
import { Button, FlexWrap } from "../baseStyles";
import BulkCurrency from "./BulkCurrency";

import BulkItems from "./BulkItems";

//<FaCog
//style={{ ...iconStyle, position: "absolute", top: "1%", right: "0.5%" }}
///>
const MainInterface = () => {
  const league = useAppSelector((store) => store.leagues).defaultLeague;
  const [isBulkCurrency, setIsBulkCurrency] = useState(true);
  const [isBulkItems, setIsBulkItems] = useState(false);

  const { authService } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initStashes(authService.getAuthTokens().access_token, league));
    dispatch(initCurrencies(currencies));
  }, [league, authService, dispatch]);

  const bulkCurrency = () => {
    setIsBulkCurrency(true);
    setIsBulkItems(false);
  };

  const bulkItems = () => {
    setIsBulkCurrency(false);
    setIsBulkItems(true);
  };

  return (
    <Wrapper>
      {isBulkCurrency && <BulkCurrency />}
      {isBulkItems && <BulkItems />}
      <SelectionWrap>
        <SwapSectionButton
          onClick={() => bulkCurrency()}
          isSelected={isBulkCurrency}
        >
          Bulk Currency
        </SwapSectionButton>

        <SwapSectionButton onClick={() => bulkItems()} isSelected={isBulkItems}>
          Bulk Items
        </SwapSectionButton>
      </SelectionWrap>
    </Wrapper>
  );
};

export default MainInterface;

const SelectionWrap = styled(FlexWrap)`
  top: 0;
  left: 0;
  margin: 0px 0px 25px 0px;
  position: absolute;
`;

const SwapSectionButton = styled(Button)<{ isSelected: boolean }>`
  border-bottom: ${(props) =>
    props.isSelected ? "solid 2px rgb(214, 197, 255)" : ""};
  font-size: 16px;
  margin: 5px;
  height: 26px;
  cursor: pointer;
`;

const Wrapper = styled(FlexWrap)`
  position: relative;
  flex-direction: column;
  width: 83vw;
  height: 83vh;
  background: ${(props) => props.theme.colors.bg};
  box-shadow: 4px 5px 52px rgba(0, 0, 0, 0.8);
  -webkit-box-shadow: 4px 5px 52px rgba(0, 0, 0, 0.8);
  -moz-box-shadow: 4px 5px 52px rgba(0, 0, 0, 0.8);
  padding: 15px 35px;
  margin: 20px 0px 10px 0px;
  border-radius: 15px;
  opacity: 0.9;
  border: 3px solid ${(props) => props.theme.colors.fg2};

  overflow: hidden;
`;

const iconStyle = {
  fill: "#555",
  padding: "0px 5px",
  cursor: "pointer",
};
