import { useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../..";
import { useAuth } from "../../api/oauth/AuthContext";
import { initCurrencies } from "../../reducers/currencyTypeReducer";
import {
  highlightStash,
  initStashes,
  selectStash,
} from "../../reducers/stashReducer";
import { currencies } from "../../types";
import PickedItems from "./PickedItems";
import PickedTabs from "./PickedTabs";
import StashTabPicker from "./StashTabPicker";

const Wrapper = styled.div`
  width: 75%;
  min-height: 70%;
  background: ${(props) => props.theme.colors.bg};
  box-shadow: 4px 5px 52px rgba(0, 0, 0, 0.8);
  -webkit-box-shadow: 4px 5px 52px rgba(0, 0, 0, 0.8);
  -moz-box-shadow: 4px 5px 52px rgba(0, 0, 0, 0.8);
  padding: 25px;
  margin: 55px 0px 10px 0px;
  border-radius: 15px;
  opacity: 0.9;
  border: 3px solid ${(props) => props.theme.colors.fg2};

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 3fr 4fr 1fr;
  grid-gap: 0px 20px;

  overflow: scroll;
`;
// TODO: style scrolls  in global conf lol

const Header = styled.h2`
  grid-column: 1 / -1;
  text-align: center;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontL};
`;

const MainInterface = () => {
  const { authService } = useAuth();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      initStashes(authService.getAuthTokens().access_token, "expedition")
    );
    dispatch(initCurrencies(currencies));
  }, []);
  return (
    <Wrapper>
      <Header>bulk-selling-tool</Header>
      <StashTabPicker />
      <PickedTabs />
      <PickedItems />
    </Wrapper>
  );
};

export default MainInterface;
