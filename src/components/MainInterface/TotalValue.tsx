import html2canvas from "html2canvas";
import styled from "styled-components";
import { isFirefox, isSafari } from "react-device-detect";
import { FaCheck } from "react-icons/fa";
import { useAppSelector } from "../..";
import { Button, CheckboxContainer, FlexWrap } from "../baseStyles";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { FaExclamationTriangle } from "react-icons/fa";
import axios from "axios";
import { Checkbox } from "../Checkbox";
import { CurrencyType, StashTab } from "../../types";

const TotalValue = () => {
  const [isFullText, setIsFullText] = useState(false);
  const [isNitro, setIsNitro] = useState(false);
  const [isWillingToNegotiate, setIsWillingToNegotiate] = useState(false);

  const [userName, setUserName] = useState("");
  const [warning, setWarning] = useState(false);
  let sellSum = 0;
  let ninjaSum = 0;
  const items = useAppSelector((store) => store.items);
  const exPrice = useAppSelector((store) => store.exaltedPrice).value || 1;
  const exDefaultPrice =
    useAppSelector((store) => store.exaltedPrice).defaultValue || 1;
  const league = useAppSelector((store) => store.leagues).defaultLeague;

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
          (t: CurrencyType) => t.type === thing.type && t.icon === thing.icon,
        ),
    );

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
    if (isFullText === false) {
      toast.promise(generateTxt, {
        pending: "Generating text",
        success: `${
          isFirefox || isSafari
            ? "Text generated successfully! It is in Your clipboard!"
            : "Text generated successfully! It is in Your clipboard!"
        }`,
        error: `Couldn't generate text.\n\nPlease stay on the site while it is being generated.`,
      });
    } else {
      toast.promise(generateFullTxt, {
        pending: "Generating text",
        success: `${
          isFirefox || isSafari
            ? "Text generated successfully! It is in Your clipboard!"
            : "Text generated successfully! It is in Your clipboard!"
        }`,
        error: `Couldn't generate text.\n\nPlease stay on the site while it is being generated.`,
      });
    }
  };
  const generateTxt = () => {
    return new Promise(async (resolve, reject) => {
      const contracts = Object.values(items)
        .filter((x: any) => x.isSelected)
        .filter(
          (x: any) => x.name.includes("Contract") && !x.name.match(/^Sextant/),
        );

      const TFTNamesLink =
        "https://raw.githubusercontent.com/The-Forbidden-Trove/tft-data-prices/master/mappings/compasses.json";
      const TFTNames = (await axios.get(TFTNamesLink)).data;

      const sextants = Object.values(items)
        .filter((x: any) => x.isSelected)
        .filter((x: any) => {
          return (
            x.name.match(/Sextant (\w\s*)*\(\d*\s*uses\)/) ||
            TFTNames[x.name] !== undefined
          );
        });

      const ninjaPrice = Math.round(
        Math.round((ninjaSum + Number.EPSILON) * 100) / 100,
      );

      const ninjaPriceEx = Math.floor(
        (ninjaPrice * 100) / exDefaultPrice / 100,
      );

      const ninjaPriceChaos = Math.round(
        ((ninjaPrice * 100) / exDefaultPrice / 100 -
          Math.floor((ninjaPrice * 100) / exDefaultPrice / 100)) *
          exDefaultPrice,
      );

      const askingPrice = Math.round(
        Math.round((sellSum + Number.EPSILON) * 100) / 100,
      );

      const askingPriceEx = Math.floor((askingPrice * 100) / exPrice / 100);

      const askingPriceChaos = Math.round(
        ((askingPrice * 100) / exPrice / 100 -
          Math.floor((askingPrice * 100) / exPrice / 100)) *
          exPrice,
      );

      const mostValuable = Object.values(items)
        .filter((x: any) => x.isSelected)
        .sort((a: any, b: any) => b.totalValue - a.totalValue)
        .slice(0, 3)
        .map((x: any) => {
          return ` ${x.shortName}`;
        });

      const divineRate = `[1 :divine: = ${exDefaultPrice} :chaos:]`;

      const copyText = `WTS ${league}\nNinja Price: ${ninjaPriceEx} :divine: + ${ninjaPriceChaos} :chaos:\n**Asking Price**: ${askingPriceEx} :divine: + ${askingPriceChaos} :chaos: (${Math.round(
        (sellSum / ninjaSum) * 100,
      )}% Ninja price) ${divineRate}${
        contracts.length > 0 || sextants.length > 0
          ? "( excluding: " +
            (contracts.length > 0 ? "contracts " : "") +
            (sextants.length > 0 ? "sextants " : "") +
            ")"
          : ""
      }\nMost valuable:${mostValuable}${
        contracts.length > 0
          ? "\n`Contracts are experimental`\n" +
            contracts
              .map((x: any) => {
                return `${x.stackSize}x ${x.name} ${x.sellValue} :chaos:/each`;
              })
              .join("\n")
          : ""
      }${
        sextants.length > 0
          ? sextants
              .map((x: any) => {
                return `${x.stackSize}x ${x.shortName} ${x.sellValue} c/each`;
              })
              .join("\n")
          : ""
      }\n${userName ? `\`\`\`@${userName} Hi, I would like to buy your bulk ${selectedTypes.map((type: CurrencyType) => type.type).join(", ")} listing for ${askingPriceEx ? `${askingPriceEx} div + ` : ""}${askingPriceChaos} chaos\`\`\`\n` : ""}${isWillingToNegotiate ? "**Willing to negotiate and sell specific pieces.**" : ""}`;

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

  const generateFullTxt = () => {
    let itemsString = "";

    for (const [key, value] of Object.entries(items)) {
      if (items[key].isSelected) {
        itemsString += `${items[key].stackSize}x ${items[key].shortName}: ${items[key].sellValue} c/ea\n`;
      }
    }

    return new Promise(async (resolve, reject) => {
      const contracts = Object.values(items)
        .filter((x: any) => x.isSelected)
        .filter(
          (x: any) => x.name.includes("Contract") && !x.name.match(/^Sextant/),
        );

      const TFTNamesLink =
        "https://raw.githubusercontent.com/The-Forbidden-Trove/tft-data-prices/master/mappings/compasses.json";
      const TFTNames = (await axios.get(TFTNamesLink)).data;

      const sextants = Object.values(items)
        .filter((x: any) => x.isSelected)
        .filter((x: any) => {
          return (
            x.name.match(/Sextant (\w\s*)*\(\d*\s*uses\)/) ||
            TFTNames[x.name] !== undefined
          );
        });

      const ninjaPrice = Math.round(
        Math.round((ninjaSum + Number.EPSILON) * 100) / 100,
      );

      const ninjaPriceEx = Math.floor(
        (ninjaPrice * 100) / exDefaultPrice / 100,
      );

      const ninjaPriceChaos = Math.round(
        ((ninjaPrice * 100) / exDefaultPrice / 100 -
          Math.floor((ninjaPrice * 100) / exDefaultPrice / 100)) *
          exDefaultPrice,
      );

      const askingPrice = Math.round(
        Math.round((sellSum + Number.EPSILON) * 100) / 100,
      );

      const askingPriceEx = Math.floor((askingPrice * 100) / exPrice / 100);

      const askingPriceChaos = Math.round(
        ((askingPrice * 100) / exPrice / 100 -
          Math.floor((askingPrice * 100) / exPrice / 100)) *
          exPrice,
      );

      const mostValuable = Object.values(items)
        .filter((x: any) => x.isSelected)
        .sort((a: any, b: any) => b.totalValue - a.totalValue)
        .slice(0, 3)
        .map((x: any) => {
          return ` ${x.shortName}`;
        });

      const copyText = `WTS ${league}\n${
        userName ? `IGN: \`${userName}\`\n` : ""
      }Ninja price: \`${ninjaPrice}\` :chaos: ( \`${ninjaPriceEx}\` :divine: + \`${ninjaPriceChaos}\` :chaos: ) at ratio [\`${exDefaultPrice}\`:chaos:/\`1\`:divine:]\nAsking price: \`${askingPrice}\` :chaos: (\`${Math.round(
        (sellSum / ninjaSum) * 100,
      )}%\` Ninja price) ( \`${askingPriceEx}\` :divine: + \`${askingPriceChaos}\` :chaos: ) at ratio [\`${exPrice}\`:chaos:/\`1\`:divine:] ${
        contracts.length > 0 || sextants.length > 0
          ? "( excluding: " +
            (contracts.length > 0 ? "contracts " : "") +
            (sextants.length > 0 ? "sextants " : "") +
            ")"
          : ""
      }\nMost valuable:${mostValuable}${
        contracts.length > 0
          ? "\n`Contracts are experimental`\n" +
            contracts
              .map((x: any) => {
                return `${x.stackSize}x ${x.name} ${x.sellValue} :chaos:/each`;
              })
              .join("\n")
          : ""
      }${
        sextants.length > 0
          ? sextants
              .map((x: any) => {
                return `${x.stackSize}x ${x.shortName} ${x.sellValue} c/each`;
              })
              .join("\n")
          : ""
      }\n${isWillingToNegotiate ? "**Willing to negotiate and sell specific pieces.**" : ""}\n\n${itemsString}`;

      const textBlob: any = new Blob([copyText], {
        type: "text/plain",
      });

      if (copyText.length > 2000 && isNitro === false) {
        toast.warn("Text is too long, you will need discord nitro to send it");
        reject(
          new Error("Text is too long, you will need discord nitro to send it"),
        );
      }

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
                "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lNb2RWYWx1ZXMiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/e1a54ff97d/CurrencyModValues.png"
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <P3
                  onClick={() => setIsFullText(!isFullText)}
                  style={{ color: isFullText ? "" : "white" }}
                >
                  Full text
                </P3>

                <P3
                  onClick={() => {
                    setIsNitro(!isNitro);
                    setIsFullText(!isNitro);
                  }}
                  style={{ color: isNitro ? "" : "white" }}
                >
                  Nitro
                </P3>

                <P3
                  onClick={() => {
                    setIsWillingToNegotiate(!isWillingToNegotiate);
                  }}
                  style={{ color: isWillingToNegotiate ? "" : "white" }}
                >
                  Negotiable
                </P3>

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

const P3 = styled.p`
  font-size: ${(props) => props.theme.fontM};
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
