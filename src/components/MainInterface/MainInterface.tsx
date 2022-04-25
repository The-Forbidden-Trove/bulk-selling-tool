import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../..";
import { useAuth } from "../../api/oauth/AuthContext";
import { initCurrencies } from "../../reducers/currencyTypeReducer";
import { initStashes } from "../../reducers/stashReducer";
import { currencies } from "../../types";
import { FlexWrap } from "../baseStyles";
import BulkCurrency from "./BulkCurrency";

import StashTabL from "../../assets/StashTabL.png";
import StashTabM from "../../assets/StashTabM.png";
import StashTabR from "../../assets/StashTabR.png";
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
        <TabWrap
          onClick={() => bulkCurrency()}
          scale={isBulkCurrency ? 1.1 : 1}
          z={isBulkCurrency ? 99 : 1}
        >
          <LeftPart />
          <MidPart isSelected={isBulkCurrency}>
            <p>Bulk Currency</p>
          </MidPart>
          <RightPart />
        </TabWrap>

        <TabWrap
          onClick={() => bulkItems()}
          scale={isBulkItems ? 1.1 : 1}
          z={isBulkItems ? 99 : 1}
        >
          <LeftPart />
          <MidPart isSelected={isBulkItems}>
            <p>Bulk Items</p>
          </MidPart>
          <RightPart />
        </TabWrap>
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

const TabWrap = styled(FlexWrap)<{ scale: number; z: number }>`
  height: 26px;
  padding: 0px 0px;
  cursor: pointer;
  transform: scale(${({ scale }) => scale});
  transition: all ease 0.2s;

  z-index: ${({ z }) => z};

  z-index: 999;
  outline: none;
  border: none;
`;

const LeftPart = styled.div`
  background-image: url(${StashTabL});
  height: 26px;
  width: 19px;
  color: rgb(255, 192, 119);
`;
const MidPart = styled.div<{ isSelected: boolean }>`
  background-image: url(${StashTabM});
  height: 26px;
  color: rgb(255, 192, 119);
  > p {
    color: ${(props) =>
      props.isSelected ? props.theme.colors.text : props.theme.colors.bg};
    text-align: center;
    vertical-align: middle;
    padding: 2px 0px 0px 0px;
  }
`;
const RightPart = styled.div`
  background-image: url(${StashTabR});
  color: rgb(255, 192, 119);
  height: 26px;
  width: 19px;
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
