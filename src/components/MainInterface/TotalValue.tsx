import html2canvas from "html2canvas";
import styled from "styled-components";
import { isFirefox, isSafari } from "react-device-detect";
import { FaCheck } from "react-icons/fa";
import { useAppSelector } from "../..";
import { Button, FlexWrap } from "../baseStyles";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TotalValue = () => {
  const [userName, setUserName] = useState("");
  const [warning, setWarning] = useState(false);
  let sum = 0;
  const items = useAppSelector((store) => store.items);
  const exPrice = useAppSelector((store) => store.exaltedPrice).value || 1;
  const league = useAppSelector((store) => store.leagues).defaultLeague;

  for (const [key, value] of Object.entries(items)) {
    if (items[key].isSelected) {
      sum += items[key].totalValue;
    }
  }
  const generateImage = () => {
    toast.promise(generate, {
      pending: "Generating",
      success: "Image generated successfully!",
      error:
        "Couldn't generate an image.\nPlease stay on the site while it is being generated.",
    });
  };
  const generate = () => {
    return new Promise((resolve, reject) => {
      let component = document.getElementById("generatedMessage");

      if (component) {
        component.focus();
        return html2canvas(component, {
          useCORS: true,
          allowTaint: true,
          backgroundColor: "none",
        })
          .then((canvas: any) => {
            return canvas.toBlob((blob: any) => {
              const copyText = `WTS ${league}\nIGN: \`${userName}\`\nPrice: \`${Math.round(
                Math.round((sum + Number.EPSILON) * 100) / 100
              )} chaos\` ( \`${Math.floor(
                Math.round(((sum + Number.EPSILON) * 100) / exPrice) / 100
              )} ex\` + \`${Math.round(
                (Math.round(((sum + Number.EPSILON) * 100) / exPrice) / 100 -
                  Math.floor(
                    Math.round(((sum + Number.EPSILON) * 100) / exPrice) / 100
                  )) *
                  exPrice
              )} chaos\` )`;
              const textBlob: any = new Blob([copyText], {
                type: "text/plain",
              });

              if (isFirefox || isSafari) {
                navigator.clipboard
                  .writeText(copyText)
                  .then((x) => {
                    const fileObjectURL = URL.createObjectURL(blob);

                    resolve("Image Generated");
                    window.open(fileObjectURL);
                  })
                  .catch((e) => {
                    console.log("Error:", e);
                    reject(new Error("Not generated"));
                  });
              } else {
                window.navigator.clipboard
                  .write([
                    new window.ClipboardItem({
                      "image/png": blob,
                      "text/plain": textBlob,
                    }),
                  ])
                  .then((x) => {
                    resolve("Image Generated");
                  })
                  .catch((e) => {
                    reject(new Error("Not generated"));
                  });
              }
            });
          })
          .catch((e) => console.log(e));
      }
    });
  };

  useEffect(() => {
    const data = window.localStorage.getItem("userName");
    if (data) {
      setUserName(data);
    }
  }, []);
  const updateName = () => {
    window.localStorage.setItem("userName", userName);
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
        <div style={{ display: "flex" }}>
          <UserName>
            <P style={{ padding: "0px 15px 0px 0px", fontSize: "22px" }}>IGN</P>
            <Input
              placeholder="Put your in game name here..."
              value={userName}
              onChange={(e: any) => setUserName(e.target.value)}
            />

            <FaCheck style={iconStyle} onClick={(e) => updateName()} />
          </UserName>
          <Generate onClick={generateImage}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <P style={warning ? { color: "red" } : {}}>
                Generate discord message!
              </P>
              <P2>Remember to CTRL+V twice on Discord!</P2>
            </div>
          </Generate>
        </div>
      </A>
    </Wrapper>
  );
};
export default TotalValue;

const iconStyle = {
  fill: "#555",
  padding: "5px 15px 5px 5px",
  cursor: "pointer",
};

const UserName = styled(FlexWrap)`
  padding: 5px 25px 5px 0px;
`;

const Input = styled.input`
  border: none;
  color: ${(props) => props.theme.colors.accent2};
  background: none;
  outline: none;
  padding: 5px 3px;
  border-bottom: 1px solid ${(props) => props.theme.colors.accentDark};
  font-size: ${(props) => props.theme.fontM};
`;

const Wrapper = styled.div`
  width: 100%;
  height: 5%;
  padding: 5px 25px 0px 25px;
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
