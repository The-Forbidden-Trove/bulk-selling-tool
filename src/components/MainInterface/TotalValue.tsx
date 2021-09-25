import html2canvas from "html2canvas";
import styled from "styled-components";
import { useAppSelector } from "../..";
import { CurrencyType, StashTab } from "../../types";
import { Button, FlexWrap } from "../baseStyles";

const TotalValue = () => {
  let sum = 0;
  const items = useAppSelector((store) => store.items);
  const exPrice = useAppSelector((store) => store.exaltedPrice).value || 1;

  const selectedTypes = useAppSelector((store) => store.stashes)
    .filter((stash: StashTab) => {
      return stash.isSelected;
    })
    .flatMap((stash: StashTab) => {
      return stash.assignedTypes;
    })
    .filter(
      (thing: CurrencyType, index: number, self: any) =>
        index ===
        self.findIndex(
          (t: CurrencyType) => t.type === thing.type && t.icon === thing.icon
        )
    );

  for (const [key, value] of Object.entries(items)) {
    if (items[key].isSelected) {
      sum += items[key].totalValue;
    }
  }

  const generateImage = () => {
    let component = document.getElementById("generatedMessage");

    if (component) {
      html2canvas(component, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: "none",
      })
        .then((canvas: any) => {
          canvas.toBlob((blob: any) => {
            const textBlob: any = new Blob(
              [
                `Item types: ${selectedTypes.map((x: any) => {
                  return x.type;
                })}\nTotal price ${
                  Math.round((sum + Number.EPSILON) * 100) / 100
                } chaos ( ${
                  Math.round(((sum + Number.EPSILON) * 100) / exPrice) / 100
                }ex )`,
              ],
              {
                type: "text/plain",
              }
            );
            navigator.clipboard
              .write([
                new ClipboardItem({
                  "image/png": blob,
                  "text/plain": textBlob,
                }),
              ])
              .catch((e) => console.log(e));
          });
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <Wrapper>
      <A>
        <Total>
          Total value:
          <Price>
            <Icon
              src={
                "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?scale=1&w=1&h=1"
              }
            />
            {Math.round((sum + Number.EPSILON) * 100) / 100}
          </Price>
          <Price>
            <Icon
              src={
                "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyAddModToRare.png?scale=1&w=1&h=1"
              }
            />
            {Math.round(((sum + Number.EPSILON) * 100) / exPrice) / 100}
          </Price>
        </Total>

        <Generate onClick={generateImage}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <P>Generate discord message!</P>
            <P2>Remember to CTRL+V twice on Discord!</P2>
          </div>
        </Generate>
      </A>
    </Wrapper>
  );
};
export default TotalValue;

const Wrapper = styled.div`
  margin: 15px 5px 0px 5px;
  padding: 35px 25px 0px 25px;
  grid-column: 1 / -1;
`;
const A = styled(FlexWrap)`
  justify-content: space-between;
  align-items: center;
`;
const Generate = styled(Button)`
  padding: 3px 0px 0px 0px;
  font-size: ${(props) => props.theme.fontL};
`;

const Total = styled(FlexWrap)`
  font-size: ${(props) => props.theme.fontL};
  align-self: flex-end;
`;

const Icon = styled.img`
  padding: 5px;
  width: 36px;
  height: 36px;
  object-fit: contain;
`;
const Price = styled(FlexWrap)`
  padding: 5px;
  color: ${(props) => props.theme.colors.accent2};
`;
const P = styled.p`
  font-size: ${(props) => props.theme.fontL};

  color: ${(props) => props.theme.colors.text};
  color: ${(props) => props.theme.colors.accent};
`;

const P2 = styled.p`
  margin: 3px 0px;
  opacity: 0.8;
  align-self: flex-end;
  font-size: 10px;
  color: ${(props) => props.theme.colors.text};
`;
