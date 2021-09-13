import styled from "styled-components";
import MainInterface from "./components/MainInterface/MainInterface";
import Navbar from "./components/Navbar/Navbar";

import { useAuth } from "./api/oauth/AuthContext";
import Guide from "./components/MainInterface/Guide";
import { getAllItems } from "./api/poeninja/poeninja";

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
    url(https://www.pathofexile.com/image/layout/harvest-bg.jpg),
    no-repeat center center / cover;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
`;

function App() {
  const { authService } = useAuth();

  return (
    <Container>
      <Navbar />
      {authService.isAuthenticated() ? <MainInterface /> : <Guide />}
    </Container>
  );
}

export default App;
