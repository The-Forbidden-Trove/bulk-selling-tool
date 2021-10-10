import { useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../..";
import { useAuth } from "../../api/oauth/AuthContext";
import { initCurrencies } from "../../reducers/currencyTypeReducer";
import { initStashes } from "../../reducers/stashReducer";
import { currencies } from "../../types";
import PickedItems from "./PickedItems";
import StashTabPicker from "./StashTabPicker";
import { FlexWrap } from "../baseStyles";
import TotalValue from "./TotalValue";
import GeneratedMessage from "../GeneratedMessage/GeneratedMessage";
import { FaCog } from "react-icons/fa";
import PickedTabsHeader from "./PickedTabsHeader";

//<FaCog
//style={{ ...iconStyle, position: "absolute", top: "1%", right: "0.5%" }}
///>
const MainInterface = () => {
  const league = useAppSelector((store) => store.leagues).defaultLeague;

  const { authService } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initStashes(authService.getAuthTokens().access_token, league));
    dispatch(initCurrencies(currencies));
  }, [league]);

  return (
    <Wrapper>
      <StashTabPicker />
      <PickedTabsHeader />
      <PickedItems />
      <TotalValue />

      <GeneratedMessage />
    </Wrapper>
  );
};

export default MainInterface;

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
