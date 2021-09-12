import { useState } from "react";
import styled from "styled-components";
import { Button, FlexWrap } from "../baseStyles";
import { SiDiscord } from "react-icons/si";
import { useAuth } from "../../api/oauth/AuthContext";

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
  width: 30%;
  margin: 0px 0px 0px 10px;
  justify-content: flex-start;
  color: ${(props) => props.theme.colors.text};
  > p {
    font-size: ${(props) => props.theme.fontL};
  }
`;
const Middle = styled(FlexWrap)`
  padding-top: 3em;
  > img {
    width: 175px;
    height: 175px;
  }
`;
const Right = styled(FlexWrap)`
  width: 30%;
  justify-content: flex-end;
  color: ${(props) => props.theme.colors.text};
  margin: 0px 10px 0px 0px;
  > p {
    font-size: ${(props) => props.theme.fontM};
  }
`;

const Navbar = () => {
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

  return (
    <Wrapper>
      <Left>
        <p>TheForbiddenTrove</p>
        <Button onClick={redirectDiscord}>join our discord!</Button>
      </Left>

      <Middle>
        <img
          src="https://avatars.githubusercontent.com/u/74618880?s=200&v=4"
          alt="logo"
        />
      </Middle>

      <Right>
        {authService.isAuthenticated() ? (
          <>
            <p>You are logged in!</p>
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
