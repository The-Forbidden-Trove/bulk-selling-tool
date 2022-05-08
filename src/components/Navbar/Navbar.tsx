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

  const redirectMirrorShop = () => {
    const link = "http://forbiddentrove.com/";
    window.open(link);
  };

  const redirectBlacklistTool = () => {
    const link = "https://github.com/The-Forbidden-Trove/blacklist-tool";
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
        <p>TFT Bulk Selling Tool</p>
        <Button onClick={redirectDiscord}>join our discord!</Button>
      </Left>

      <Middle>
        {isFirefox ? (
          <Button
            onClick={redirectExtensionFirefox}
            onAuxClick={redirectExtensionFirefox}
          >
            <TextIcon>
              <Img
                src={FirefoxStore}
                style={{ height: "24px", width: "24px" }}
              />
              <Text>
                <p>TFT Browser extension</p>
                <Red>New version out!</Red>
              </Text>
            </TextIcon>
          </Button>
        ) : (
          <Button onClick={redirectExtension} onAuxClick={redirectExtension}>
            <TextIcon>
              <Img
                src={ChromeStore}
                style={{ height: "24px", width: "24px" }}
              />
              <Text>
                <p>TFT Browser extension</p>
                <Red>New version out!</Red>
              </Text>
            </TextIcon>
          </Button>
        )}

        <Button onClick={redirectMirrorShop} onAuxClick={redirectMirrorShop}>
          <TextIcon>
            <Img
              src={
                "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyDuplicate.png?scale=1&w=1&h=1"
              }
              style={{ height: "26px", width: "26px" }}
            />
            <p>TFT Mirror Shop</p>
          </TextIcon>
        </Button>

        <Button
          onClick={redirectBlacklistTool}
          onAuxClick={redirectBlacklistTool}
        >
          <TextIcon>
            <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM99.5 144.8C77.15 176.1 64 214.5 64 256C64 362 149.1 448 256 448C297.5 448 335.9 434.9 367.2 412.5L99.5 144.8zM448 256C448 149.1 362 64 256 64C214.5 64 176.1 77.15 144.8 99.5L412.5 367.2C434.9 335.9 448 297.5 448 256V256z" />
            </SvgIcon>
            <p>TFT Blacklist Tool</p>
          </TextIcon>
        </Button>
      </Middle>

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

const Red = styled(FlexWrap)`
  width: 100%;
  text-align: left;
  color: ${(props) => props.theme.colors.accent2};
  font-size: ${(props) => props.theme.fontS};
`;

const Text = styled(FlexWrap)`
  flex-direction: column;
  justify-content: flex-start;
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

const SvgIcon = styled.svg`
  fill: #b51808;
  padding: 0px 5px 0px 0px;
  height: 26px;
  width: 26px;
`;
