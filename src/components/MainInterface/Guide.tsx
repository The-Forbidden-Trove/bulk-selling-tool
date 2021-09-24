import styled from "styled-components";
import { FlexWrap } from "../baseStyles";
import Guide1 from "../../assets/Guide1.png";
import Guide2 from "../../assets/Guide2.png";
import Guide3 from "../../assets/Guide3.png";

const Wrapper = styled.div`
  width: 75%;
  height: 75%;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.colors.bg};
  box-shadow: 4px 5px 52px rgba(0, 0, 0, 0.8);
  -webkit-box-shadow: 4px 5px 52px rgba(0, 0, 0, 0.8);
  -moz-box-shadow: 4px 5px 52px rgba(0, 0, 0, 0.8);
  padding: 25px;
  margin: 55px 0px 10px 0px;
  border-radius: 15px;
  opacity: 0.9;
  border: 3px solid ${(props) => props.theme.colors.fg2};
`;

const Header = styled.h2`
  margin: 10px 0px;
  text-align: center;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontL};
`;

const P = styled(FlexWrap)`
  font-size: 18px;
  color: ${(props) => props.theme.colors.text};
  margin: 0px 5px;
  align-items: flex-start;
`;

const Guide = () => {
  return (
    <Wrapper>
      <Header>bulk-selling-tool</Header>
      <Text>
        <P>To start using the app log in with your Path of Exile account.</P>
        <div style={{ display: "flex" }}>
          <div style={{ width: "30%", padding: "5px 0px" }}>
            <P style={{ padding: "25px 0px" }}>
              Then you can pick a stash tab and currency types which you want to
              be associated with it. After that select your % multiplier which
              will be added to each item in a picked stash tab. All there is
              left to do is to click "Select Tab" and all you items will be
              listed below.
            </P>
          </div>
          <div style={{ width: "70%", padding: "5px 0px" }}>
            <img src={Guide1} style={{ width: "100%", height: "100%" }} />
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ width: "70%", padding: "5px 0px" }}>
            <img src={Guide2} style={{ width: "100%", height: "100%" }} />
          </div>
          <div style={{ width: "30%", padding: "5px 0px" }}>
            <P style={{ padding: "25px 0px" }}>
              You can select or deselect each listed item, change the chaos
              price of a single item and multiplier. All prices will be
              automatically updated.{" "}
            </P>
            <P>
              Above the list of items you are provided with a filter for easier
              finding of items and the default exalted orb price on the right.
              This price can also be changed and all the prices will get
              updated.
            </P>
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ width: "30%", padding: "5px 0px" }}>
            <P style={{ padding: "25px 0px" }}>
              Now the last thing to do is click Generate Discord Message to have
              a pastable message in your clipboard!. Due to Discord limitations,
              you will have to press CTRL+V twice - first to paste the image and
              second to pase the header message.
            </P>
          </div>
          <div style={{ width: "70%", padding: "5px 0px" }}>
            <img
              src={Guide3}
              style={{
                width: "100%",
                height: "50%",
                padding: "50px 0px 0px 0px",
              }}
            />
          </div>
        </div>
      </Text>
    </Wrapper>
  );
};

export default Guide;
const Text = styled(FlexWrap)`
  padding: 5px 50px;
  align-items: flex-start;
  flex-direction: column;
  width: 90%;
`;
