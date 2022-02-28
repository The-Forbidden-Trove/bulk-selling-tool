import html2canvas from "html2canvas";
import styled from "styled-components";
import { isFirefox, isSafari } from "react-device-detect";
import { FaCheck } from "react-icons/fa";
import { useAppSelector } from "../..";
import { Button, FlexWrap } from "../baseStyles";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { FaExclamationTriangle } from "react-icons/fa";

const TotalValue = () => {
  const [userName, setUserName] = useState("");
  const [warning, setWarning] = useState(false);
  let sellSum = 0;
  let ninjaSum = 0;
  const items = useAppSelector((store) => store.items);
  const exPrice = useAppSelector((store) => store.exaltedPrice).value || 1;
  const league = useAppSelector((store) => store.leagues).defaultLeague;

  for (const [key, value] of Object.entries(items)) {
    if (items[key].isSelected) {
      sellSum += items[key].totalValue;
      ninjaSum += items[key].chaosEquivalent * items[key].stackSize;
    }
  }
  const generateImage = () => {
    toast.promise(generateImg, {
      pending: "Generating image",
      success: `${
        isFirefox || isSafari
          ? "Image generated successfully! You are on Firefox, your image will open in a new tab."
          : "Image generated successfully! Your image is in the clipboard already!"
      }`,
      error: `Couldn't generate an image.\n\nPlease stay on the site while it is being generated.`,
    });
  };
  const generateText = () => {
    toast.promise(generateTxt, {
      pending: "Generating text",
      success: `${
        isFirefox || isSafari
          ? "Text generated successfully! It is in Your clipboard!"
          : "Text generated successfully! It is in Your clipboard!"
      }`,
      error: `Couldn't generate text.\n\nPlease stay on the site while it is being generated.`,
    });
  };
  const generateTxt = () => {
    return new Promise((resolve, reject) => {
      const contracts = Object.values(items)
        .filter((x: any) => x.isSelected)
        .filter((x: any) => x.name.includes("Contract"));
      const sextants = Object.values(items)
        .filter((x: any) => x.isSelected)
        .filter((x: any) => x.name.match(/Sextant (\w\s*)*\(\d*\s*uses\)/));

      const copyText = `WTS ${league}\n${
        userName ? `IGN: \`${userName}\`\n` : ""
      }Ninja price: \`${Math.round(
        Math.round((ninjaSum + Number.EPSILON) * 100) / 100
      )} chaos\` ( \`${Math.floor(
        Math.round(((ninjaSum + Number.EPSILON) * 100) / exPrice) / 100
      )}\` ex + \`${Math.round(
        (Math.round(((ninjaSum + Number.EPSILON) * 100) / exPrice) / 100 -
          Math.floor(
            Math.round(((ninjaSum + Number.EPSILON) * 100) / exPrice) / 100
          )) *
          exPrice
      )}\` chaos )\nAsking price: \`${Math.round(
        Math.round((sellSum + Number.EPSILON) * 100) / 100
      )}\` chaos \`(${Math.round(
        (sellSum / ninjaSum) * 100
      )}%\` of Ninja price) ( \`${Math.floor(
        Math.round(((sellSum + Number.EPSILON) * 100) / exPrice) / 100
      )}\` ex + \`${Math.round(
        (Math.round(((sellSum + Number.EPSILON) * 100) / exPrice) / 100 -
          Math.floor(
            Math.round(((sellSum + Number.EPSILON) * 100) / exPrice) / 100
          )) *
          exPrice
      )}\` chaos ) ${
        contracts.length > 0 || sextants.length > 0
          ? "( excluding: " +
            (contracts.length > 0 ? "contracts " : "") +
            (sextants.length > 0 ? "sextants " : "") +
            ")"
          : ""
      }\nMost valuable:${Object.values(items)
        .filter((x: any) => x.isSelected)
        .sort((a: any, b: any) => b.totalValue - a.totalValue)
        .slice(0, 3)
        .map((x: any) => {
          return ` ${x.shortName}`;
        })}${
        contracts.length > 0
          ? "\n`Contracts are experimental`\n" +
            contracts
              .map((x: any) => {
                return ` ${x.name} x${x.stackSize} ${x.sellValue}chaos/each`;
              })
              .join("\n")
          : ""
      }${
        sextants.length > 0
          ? "\n`Sextants are experimental`\n" +
            sextants
              .map((x: any) => {
                return ` ${x.name} x${x.stackSize} ${x.sellValue}chaos/each`;
              })
              .join("\n")
          : ""
      }`;

      const textBlob: any = new Blob([copyText], {
        type: "text/plain",
      });

      if (isFirefox || isSafari) {
        navigator.clipboard
          .writeText(copyText)
          .then((x) => {
            resolve("Text Generated");
          })
          .catch((e) => {
            console.log("Error:", e);
            reject(new Error("Not generated"));
          });
      } else {
        window.navigator.clipboard
          .write([
            new window.ClipboardItem({
              "text/plain": textBlob,
            }),
          ])
          .then((x) => {
            resolve("Text Generated");
          })
          .catch((e) => {
            reject(new Error("Not generated"));
          });
      }
    });
  };

  const generateImg = () => {
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
              if (isFirefox || isSafari) {
                const fileObjectURL = URL.createObjectURL(blob);
                resolve("Image Generated");
                window.open(fileObjectURL);
              } else {
                window.navigator.clipboard
                  .write([
                    new window.ClipboardItem({
                      "image/png": blob,
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
          Asking price:
          <Price>
            <Icon
              src={
                "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?scale=1&w=1&h=1"
              }
            />
            {Math.round((sellSum + Number.EPSILON) * 100) / 100}
          </Price>
          <Price>
            <Icon
              src={
                "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyAddModToRare.png?scale=1&w=1&h=1"
              }
            />
            {Math.round(((sellSum + Number.EPSILON) * 100) / exPrice) / 100}
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

          <Generate>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <P
                  style={warning ? { color: "red" } : {}}
                  onClick={() => generateText()}
                >
                  Generate text
                </P>

                <P
                  style={warning ? { color: "red" } : {}}
                  onClick={() => generateImage()}
                >
                  Generate image
                </P>
              </div>
              <div style={{ display: "flex", alignSelf: "center" }}>
                <FaExclamationTriangle style={iconStyle2} />
                {isFirefox || isSafari ? (
                  <P2>
                    Paste text and the image from new tab to discord channel!
                  </P2>
                ) : (
                  <P2>Paste text and the image to discord channel!</P2>
                )}
              </div>
            </div>
          </Generate>
        </div>
      </A>
    </Wrapper>
  );
};
export default TotalValue;

const iconStyle2 = {
  fill: "#A8DBE3",
  padding: "0px 10px 0px 0px",
  width: "18px",
  height: "18px",
};

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
  height: 6%;
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
  padding: 0px 15px;

  color: ${(props) => props.theme.colors.text};
  color: ${(props) => props.theme.colors.accent};
`;

const P2 = styled.p`
  padding: 3px 0px;
  opacity: 0.8;
  align-self: flex-end;
  font-size: 10px;
  color: ${(props) => props.theme.colors.text};
`;
