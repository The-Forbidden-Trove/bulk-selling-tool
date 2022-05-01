import styled from "styled-components";
import { Button, FlexWrap } from "../baseStyles";
import { useAuth } from "../../api/oauth/AuthContext";
import Select from "react-select";
import { useAppDispatch, useAppSelector } from "../..";
import { changeDefaultLeague } from "../../reducers/leagueReducer";

import { isFirefox, isSafari } from "react-device-detect";
import ChromeStore from "../../assets/chrome-web-store.png";
import FirefoxStore from "../../assets/firefox-web-store.png";

const Img = styled.img`
  width: 64px;
  height: 64px;
  object-fit: contain;
  padding: 5px;
`;

const Navbar = () => {
  const dispatch = useAppDispatch();
  const leagues = useAppSelector((store) => store.leagues);
  const redirectExtension = () => {
    const link =
      "https://chrome.google.com/webstore/detail/tft-trade-extension/bikeebdigkompjnpcljicocidefgbhgl?hl=en";
    window.open(link);
  };

  const redirectExtensionFirefox = () => {
    const link =
      "https://addons.mozilla.org/en-US/firefox/addon/tft-trade-extension/";
    window.open(link);
  };
  const redirectDiscord = () => {
    const link = "https://discord.com/invite/zBpfweq";
    window.open(link);
  };
  const { authService } = useAuth();

  const login = async () => {
    authService.authorize();
  };
  const logout = async () => {
    authService.logout();
  };
  const handleChange = (newLeague: any) => {
    dispatch(changeDefaultLeague(newLeague.label));
  };

  return (
    <Wrapper>
      <Left>
        <Img
          src={"https://avatars.githubusercontent.com/u/74618880?s=200&v=4"}
        />
        <p>TheForbiddenTrove</p>
        <Button onClick={redirectDiscord}>join our discord!</Button>

        {isFirefox ? (
          <Button onClick={redirectExtensionFirefox} onAuxClick={redirectExtensionFirefox}>
            <TextIcon>
              <Img
                src={FirefoxStore}
                style={{ height: "24px", width: "24px" }}
              />
              <p>TFT Browser extension</p>
            </TextIcon>
          </Button>
        ) : (
          <Button onClick={redirectExtension} onAuxClick={redirectExtensionFirefox}>
            <TextIcon>
              <Img
                src={ChromeStore}
                style={{ height: "24px", width: "24px" }}
              />
              <p>TFT Browser extension</p>
            </TextIcon>
          </Button>
        )}
      </Left>

      <Middle>TFT Bulk Selling Tool</Middle>

      <Right>
        <div style={{ width: "150px", padding: "0px 20px 0px 0px" }}>
          {!leagues.hasOwnProperty("defaultLeague") && (
            <SelectExtend
              options={[{ label: "", value: "" }]}
              defaultValue={{
                label: "",
              }}
              styles={customStyles}
              isSearchable={false}
            />
          )}
          {leagues.hasOwnProperty("defaultLeague") && (
            <SelectExtend
              options={leagues.allLeagues.map((x: any) => {
                return { label: x.id, value: x.id };
              })}
              defaultValue={{
                label: leagues.defaultLeague,
                value: leagues.defaultLeague,
              }}
              onChange={handleChange}
              styles={customStyles}
              isSearchable={false}
            />
          )}
        </div>
        {authService.isAuthenticated() ? (
          <>
            <p>{authService.getAuthTokens().user} You are logged in!</p>
            <Button onClick={logout}>Log out</Button>
          </>
        ) : (
          <>
            <Button onClick={login}>Log in</Button>
          </>
        )}
      </Right>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled(FlexWrap)`
  width: 100%;
  max-height: 3vh;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.text};
  background: ${(props) => props.theme.colors.fg};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  font-size: ${(props) => props.theme.fontL};
  padding: 15px 0px;
  opacity: 0.8;
  z-index: 99;
`;

const Left = styled(FlexWrap)`
  width: 33%;
  padding: 0px 0px 0px 10px;
  justify-content: flex-start;
  color: ${(props) => props.theme.colors.text};
  > p {
    font-size: ${(props) => props.theme.fontL};
  }
`;
const Middle = styled(FlexWrap)`
  color: ${(props) => props.theme.colors.text};

  width: 33%;
  font-size: 32px;
`;
const TextIcon = styled(FlexWrap)`
  > p {
    color: ${(props) => props.theme.colors.accent};
    background: none;
  }
`;
const Right = styled(FlexWrap)`
  width: 33%;
  justify-content: flex-end;
  color: ${(props) => props.theme.colors.text};
  padding: 0px 10px 0px 0px;
  > p {
    font-size: ${(props) => props.theme.fontM};
  }
`;

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    fontWeight: state.isSelected ? "bold" : "normal",
    color: state.isSelected ? "#33ACD0" : "#f8f5ff",
    backgroundColor: "#25262A",
    fontSize: "16px",
    opacity: "1",
  }),
  singleValue: (provided: any, state: any) => ({
    ...provided,
    color: "#f8f5ff",
    background: "none",
    fontSize: "16px",
    opacity: "1",
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    color: "red",
    backgroundColor: "#050710",
    padding: "0px 2px",
    opacity: "1",
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    background: "none",
    border: "1px solid #f8f5ff",

    opacity: "1",
    cursor: "pointer",
  }),
};

const SelectExtend = styled(Select).attrs((props) => ({}))`
  && {
    [class*="MenuList"] {
      ::-webkit-scrollbar {
        width: 5px;
      }
      ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background-color: #f5f5f5;
        background: none;
      }
      ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #555;
      }
      &:hover::-webkit-scrollbar-thumb {
        -webkit-border-radius: 4px;
        border-radius: 4px;
      }
    }
  }
`;
