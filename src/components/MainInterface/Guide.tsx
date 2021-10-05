import styled from "styled-components";
import { FlexWrap } from "../baseStyles";
import Guide1 from "../../assets/Guide1.png";
import Guide2 from "../../assets/Guide2.png";
import { useAuth } from "../../api/oauth/AuthContext";

const Guide = () => {
  const { authService } = useAuth();
  return (
    <Wrapper>
      <Text>
        <P>
          To start using the app{" "}
          <Highlight
            onClick={() => authService.authorize()}
            style={{ cursor: "pointer" }}
          >
            Log in
          </Highlight>{" "}
          with your Path of Exile account.
        </P>
        <P>
          Then select a tab by clicking on it and pick currency type filter
          which you want to be applied to that tab. Optionally you can change
          the default multiplier which will adjust the default price fetched
          from <Highlight href="https://poe.ninja/">poe.ninja</Highlight>. Now
          all that is left to do is click the <Highlight>Select tab</Highlight>{" "}
          button.
        </P>

        <div style={{ display: "flex" }}>
          <P style={{ width: "20%" }}>
            <br />
            You can <Highlight>add</Highlight> multiple tabs.
            <br />
            <br />
            You can select <Highlight>multiple</Highlight> currency types.
            <br />
            <br />
            Show or hide <Highlight>Remove-Only</Highlight> tabs.
            <br />
            <br />
            <Highlight>Find</Highlight> a tab by its name.
            <br />
          </P>
          <Img src={Guide1} alt="guide1" />
        </div>

        <P>
          Now all items according to the currency types you chose will be
          displayed and priced below. You can manually adjust
          <Highlight> Ex Price</Highlight>,<Highlight> multiplier</Highlight>{" "}
          and
          <Highlight> single item value</Highlight>.
        </P>
        <div style={{ display: "flex" }}>
          <Img src={Guide2} alt="guide2" />

          <P style={{ width: "35%" }}>
            <br />
            You can deselect a tab by clicking on its name in the{" "}
            <Highlight>Picked Tabs</Highlight> section.
            <br />
            <br />
            It is also possible to <Highlight>find</Highlight> an item by its
            name.
            <br />
            <br />
            To generate the image press{" "}
            <Highlight>Generate discord message!</Highlight> button and it will
            be in you clipboard with a{" "}
            <Highlight>discord header message</Highlight> and because of that
            you need to paste it twice in discord chat.
            <br />
            <br />
            Generated message will contain a text header with{" "}
            <Highlight>currency types</Highlight>,{" "}
            <Highlight>total value</Highlight> of your items and generated image
            of all items with their <Highlight>count</Highlight>,{" "}
            <Highlight>price</Highlight> and <Highlight>total value</Highlight>.
          </P>
        </div>
      </Text>
    </Wrapper>
  );
};

export default Guide;
const Text = styled(FlexWrap)`
  padding: 5px 5px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 95%;
  height: 100%;
`;

const Img = styled.img`
  object-fit: contain;
  width: 80%;
  align-self: center;
`;
const Wrapper = styled(FlexWrap)`
  flex-direction: column;
  width: 83vw;
  height: 83vh;
  background: ${(props) => props.theme.colors.bg};
  box-shadow: 4px 5px 52px rgba(0, 0, 0, 0.8);
  -webkit-box-shadow: 4px 5px 52px rgba(0, 0, 0, 0.8);
  -moz-box-shadow: 4px 5px 52px rgba(0, 0, 0, 0.8);
  padding: 15px 35px;
  padding: 20px 0px 10px 0px;
  border-radius: 15px;
  opacity: 0.9;
  border: 3px solid ${(props) => props.theme.colors.fg2};

  overflow-y: scroll;

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

const P = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text};
  padding: 10px 5px;
`;
const Highlight = styled.a`
  font-size: 18px;
  color: ${(props) => props.theme.colors.accent};
`;
