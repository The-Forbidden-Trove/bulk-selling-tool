import html2canvas from "html2canvas";
import styled from "styled-components";
import { isFirefox, isSafari } from "react-device-detect";
import { FaCheck } from "react-icons/fa";
import { useAppSelector } from "../..";
import { Button, FlexWrap } from "../baseStyles";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import chaosOrb from "../../assets/chaosOrb.png";
import exaltedOrb from "../../assets/divineOrb.png";

import { FaExclamationTriangle } from "react-icons/fa";

const GenerateBulkItemMessage = ({ selectedItems, msg, setMsg }: any) => {
  const [userName, setUserName] = useState("");
  const [warning, setWarning] = useState(false);

  const [sellEx, setSellEx] = useState(0);
  const [sellChaos, setSellChaos] = useState(0);
  const [sellMirror, setSellMirror] = useState(0);

  const exPrice = useAppSelector((store) => store.exaltedPrice).value || 1;
  const exDefaultPrice =
    useAppSelector((store) => store.exaltedPrice).defaultValue || 1;
  const league = useAppSelector((store) => store.leagues).defaultLeague;

  const generateImage = () => {
    toast.promise(generateImg, {
      pending: "Generating image",
      success: `${isFirefox || isSafari
          ? "Image generated successfully! You are on Firefox, your image will open in a new tab."
          : "Image generated successfully! Your image is in the clipboard already!"
        }`,
      error: `Couldn't generate an image.\n\nPlease stay on the site while it is being generated.`,
    });
  };
  const generateText = () => {
    toast.promise(generateTxt, {
      pending: "Generating text",
      success: `${isFirefox || isSafari
          ? "Text generated successfully! It is in Your clipboard!"
          : "Text generated successfully! It is in Your clipboard!"
        }`,
      error: `Couldn't generate text.\n\nPlease stay on the site while it is being generated.`,
    });
  };
  const generateTxt = () => {
    return new Promise((resolve, reject) => {
      const copyText = `WTS ${league}\n${userName ? `IGN: \`${userName}\`\n` : ""
        }${msg.length > 0 ? "Note: `" + msg + "`" : ""}`;

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
      let component = document.getElementById("generatedBulkItemMessage");

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

  const makeChaosPrice = (askingPrice: number) => {
    const askingPriceChaos = Math.round(
      ((askingPrice * 100) / exPrice / 100 -
        Math.floor((askingPrice * 100) / exPrice / 100)) *
      exPrice,
    );
    return askingPriceChaos;
  };

  const makeExPrice = (askingPrice: number) => {
    const askingPriceEx = Math.floor((askingPrice * 100) / exPrice / 100);

    return askingPriceEx;
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

  useEffect(() => {
    let totalChaos = 0;
    let totalMirror = 0;
    selectedItems.forEach((item: any) => {
      totalChaos += Number(item.chaosValue);
      totalChaos += Number(item.exValue) * exPrice;
      totalMirror += Number(item.mirrorValue);
    });
    setSellEx(makeExPrice(totalChaos));
    setSellChaos(makeChaosPrice(totalChaos));
    setSellMirror(totalMirror);
  }, [selectedItems, exPrice, makeExPrice, makeChaosPrice]);

  return (
    <Wrapper>
      <FlexWrap>
        <P>Asking Price</P>

        <>
          <Icon
            src={
              "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lEdXBsaWNhdGUiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/7111e35254/CurrencyDuplicate.png"
            }
          />
          <P>{sellMirror}</P>
        </>

        <>
          <Icon src={exaltedOrb} />
          <P>{Math.round(sellEx)}</P>
        </>

        <>
          <Icon src={chaosOrb} />
          <P>{Math.round(sellChaos)}</P>
        </>
      </FlexWrap>

      <FlexWrap>
        <FlexWrap>
          <P>Note</P>
          <Input
            placeholder="Put your listing note here..."
            value={msg}
            onChange={(e: any) => setMsg(e.target.value)}
          />
        </FlexWrap>
        <FlexWrap>
          <P>IGN</P>
          <Input
            placeholder="Put your in game name here..."
            value={userName}
            onChange={(e: any) => setUserName(e.target.value)}
          />
          <FaCheck style={iconStyle} onClick={(e) => updateName()} />
        </FlexWrap>

        <FlexWrap style={{ flexDirection: "column" }}>
          <FlexWrap style={{ width: "100%", justifyContent: "space-evenly" }}>
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
          </FlexWrap>

          <FlexWrap>
            <FaExclamationTriangle style={iconStyle2} />
            {isFirefox || isSafari ? (
              <P2>Paste text and the image from new tab to discord channel!</P2>
            ) : (
              <P2>Paste text and the image to discord channel!</P2>
            )}
          </FlexWrap>
        </FlexWrap>
      </FlexWrap>
    </Wrapper>
  );
};
export default GenerateBulkItemMessage;

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

const Input = styled.input`
  border: none;
  color: ${(props) => props.theme.colors.accent2};
  background: none;
  outline: none;
  padding: 5px 3px;
  border-bottom: 1px solid ${(props) => props.theme.colors.accentDark};
`;

const Wrapper = styled(FlexWrap)`
  width: 100%;
  height: 5%;
  justify-content: space-between;
`;

const Icon = styled.img`
  padding: 5px;
  width: 36px;
  height: 36px;
  object-fit: contain;
`;

const P = styled(Button)`
  font-size: 1.5em;
  color: ${(props) => props.theme.colors.accent};
`;

const P2 = styled.p`
  padding: 3px 0px;
  opacity: 0.8;
  align-self: flex-end;
  font-size: 10px;
  color: ${(props) => props.theme.colors.text};
`;
