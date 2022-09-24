import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../..";
import { useAuth } from "../../api/oauth/AuthContext";
import { initCurrencies } from "../../reducers/currencyTypeReducer";
import { changeDefaultLeague } from "../../reducers/leagueReducer";
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
  const [shouldWaitUntillRefresh, setshouldWaitUntillRefresh] = useState(false);
  const [timeToWait, setTimeToWait] = useState(0);

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

  const refreshPrices = () => {

    const previousTime = JSON.parse(localStorage.getItem("refreshTimer") || "{}")
    const currentTime = new Date().getTime();

    if (Number.isInteger(previousTime)) {
      const secs = Math.floor(Math.abs(previousTime - currentTime) / 1000);
      const threshold = 120

      if (secs < threshold) {
        setTimeToWait(threshold - secs);
        setshouldWaitUntillRefresh(true);
        setTimeout(() => {
          setshouldWaitUntillRefresh(false)
        }, 2000)
      } else {
        localStorage.setItem("refreshTimer", JSON.stringify(currentTime))
        dispatch(changeDefaultLeague(league))
        toast.success("Updated Prices!")
      }
    } else {
      localStorage.setItem("refreshTimer", JSON.stringify(currentTime))
      dispatch(changeDefaultLeague(league))
      toast.success("Updated Prices!")
    }

  }

  return (
    <Wrapper>
      {isBulkCurrency && <BulkCurrency />}
      {isBulkItems && <BulkItems />}
      <LeftButtonsWrap>
        <SwapSectionButton
          onClick={() => bulkCurrency()}
          isSelected={isBulkCurrency}
        >
          Bulk Currency
        </SwapSectionButton>

        <SwapSectionButton onClick={() => bulkItems()} isSelected={isBulkItems}>
          Listing Manager
        </SwapSectionButton>
      </LeftButtonsWrap>

      <MidButtonsWrap>
        <MidButton onClick={refreshPrices} shouldWaitUntillRefresh={shouldWaitUntillRefresh}>
          Refresh prices
        </MidButton>

        <MidButtonWarning isVisible={shouldWaitUntillRefresh}>
          Please wait {timeToWait} seconds
        </MidButtonWarning>
      </MidButtonsWrap>
    </Wrapper>
  );
};

export default MainInterface;

const LeftButtonsWrap = styled(FlexWrap)`
  top: 0;
  left: 0;
  margin: 0px 0px 25px 0px;
  position: absolute;
`;

const MidButtonsWrap = styled(FlexWrap)`
  top: 0;
  left: 50%;
  margin: 5px 0px 25px 0px;
  position: absolute;
  flex-direction: column;
`;

const MidButton = styled(Button) <{ shouldWaitUntillRefresh: boolean }>`
  font-size: 16px;
  cursor: pointer;
  position: relative;
  left: -50%;
  color: ${(props) => props.shouldWaitUntillRefresh ? "#b51808" : "#33ACD0"};
`;

const MidButtonWarning = styled("p") <{ isVisible: boolean }>`
  font-size: 12px;
  position: relative;
  color: #b51808;
  opacity: ${(props) => props.isVisible ? 0.6 : 0};
  transition: all 0.3s ease-in-out;
  left: -50%;

  background: none;
  padding: 0px 10px;
  outline: none;
  border: none;
`;

const SwapSectionButton = styled(Button) <{ isSelected: boolean }>`
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

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
    background: none;
  }

  &::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;

    background: none;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
  }
`;

const iconStyle = {
  fill: "#555",
  padding: "0px 5px",
  cursor: "pointer",
};
