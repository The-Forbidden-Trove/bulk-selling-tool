import styled from "styled-components";
import MainInterface from "./components/MainInterface/MainInterface";
import Navbar from "./components/Navbar/Navbar";
import { useAuth } from "./api/oauth/AuthContext";
import Guide from "./components/MainInterface/Guide";
import { useAppDispatch } from ".";
import { FlexWrap } from "./components/baseStyles";
import { useEffect } from "react";
import { initAppState } from "./reducers/leagueReducer";
import backgroundImg from './assets/harvest-bg.jpg';
import patreon from './assets/patreon.png';

function App() {
  const { authService } = useAuth();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initAppState());
  }, [dispatch]);

  return (
    <Container>
      <Navbar />
      {authService.isAuthenticated() ? <MainInterface /> : <Guide />}
      <Bottom>
        <P style={{ textAlign: "left" }}>
          This product isn't affiliated with or endorsed by Grinding Gear Games
          in any way.
        </P>

        <Patreon onClick={() => window.open("https://www.patreon.com/pacto_", "_blank")} style={{ width: "35%", justifyItems: "center", alignItems: "center", fontSize: "12px" }}>
          <Icon src={patreon} />
          Support the dev!
        </Patreon>

        <P style={{ textAlign: "right" }}>
          All prices gathered thanks to poe.ninja
        </P>
      </Bottom>
    </Container>
  );
}

export default App;

const Icon = styled.img`
  padding: 0px 3px;
  width: 12px;
  height: 12px;
  object-fit: contain;
`;

const Patreon = styled(FlexWrap)`
&:hover {
  cursor: pointer;
  color: #ff6e25;
}
`

const Bottom = styled(FlexWrap)`
  justify-content: space-between;
  width: 75%;
`;
const P = styled.p`
  font-size: 10px;
  width: 50%;
  color: ${(props) => props.theme.colors.text};
  opacity: 0.5;
  padding: 5px 0px;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      0deg,
      rgba(6, 10, 23, 0.9),
      rgba(10, 14, 28, 0.7),
      rgba(12, 18, 33, 0.7),
      rgba(14, 21, 38, 0.7),
      rgba(15, 24, 43, 0.7),
      rgba(16, 26, 49, 0.7),
      rgba(16, 29, 54, 0.7)
    ),
    url(${backgroundImg}),
    no-repeat center center / cover;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;
