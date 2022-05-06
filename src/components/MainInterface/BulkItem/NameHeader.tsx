import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FlexWrap } from "../../baseStyles";

const shaperIcon =
  "https://web.poecdn.com/image/item/popup/shaper-symbol.png?1648706966521";

export const NameHeader = ({ item }: any) => {
  const [iconLeft, setIconLeft] = useState("");
  const [iconRight, setIconRight] = useState("");

  const determineIcon = () => {
    if (item.flags.synthesised) {
      setIconLeft(
        "https://web.poecdn.com/image/item/popup/synthetic-symbol.png?1648706966521",
      );
      setIconRight(
        "https://web.poecdn.com/image/item/popup/synthetic-symbol.png?1648706966521",
      );
      return;
    }

    if (item.flags.fractured) {
      setIconLeft(
        "https://web.poecdn.com/image/item/popup/fractured-symbol.png?1648706966513",
      );
      setIconRight(
        "https://web.poecdn.com/image/item/popup/fractured-symbol.png?1648706966513",
      );
      return;
    }

    if (item.flags.replica) {
      setIconLeft(
        "https://web.poecdn.com/image/item/popup/experimented-symbol.png?1648706966513",
      );
      setIconRight(
        "https://web.poecdn.com/image/item/popup/experimented-symbol.png?1648706966513",
      );
      return;
    }

    const influences = item.flags.influence;
    let isLeftSet = false;

    if (influences.shaper) {
      setIconRight(
        "https://web.poecdn.com/image/item/popup/shaper-symbol.png?1648706966521",
      );
      if (!isLeftSet) {
        setIconLeft(
          "https://web.poecdn.com/image/item/popup/shaper-symbol.png?1648706966521",
        );
      }

      isLeftSet = true;
    }
    if (influences.elder) {
      setIconRight(
        "https://web.poecdn.com/image/item/popup/elder-symbol.png?1648706966393",
      );
      if (!isLeftSet) {
        setIconLeft(
          "https://web.poecdn.com/image/item/popup/elder-symbol.png?1648706966393",
        );
      }

      isLeftSet = true;
    }
    if (influences.crusader) {
      setIconRight(
        "https://web.poecdn.com/image/item/popup/crusader-symbol.png?1648706966389",
      );
      if (!isLeftSet) {
        setIconLeft(
          "https://web.poecdn.com/image/item/popup/crusader-symbol.png?1648706966389",
        );
      }

      isLeftSet = true;
    }
    if (influences.hunter) {
      setIconRight(
        "https://web.poecdn.com/image/item/popup/hunter-symbol.png?1648706966517",
      );
      if (!isLeftSet) {
        setIconLeft(
          "https://web.poecdn.com/image/item/popup/hunter-symbol.png?1648706966517",
        );
      }

      isLeftSet = true;
    }
    if (influences.redeemer) {
      setIconRight(
        "https://web.poecdn.com/image/item/popup/redeemer-symbol.png?1648706966517",
      );
      if (!isLeftSet) {
        setIconLeft(
          "https://web.poecdn.com/image/item/popup/redeemer-symbol.png?1648706966517",
        );
      }

      isLeftSet = true;
    }
    if (influences.warlord) {
      setIconRight(
        "https://web.poecdn.com/image/item/popup/warlord-symbol.png?1648706966533",
      );
      if (!isLeftSet) {
        setIconLeft(
          "https://web.poecdn.com/image/item/popup/warlord-symbol.png?1648706966533",
        );
      }

      isLeftSet = true;
    }
    if (influences.eater) {
      setIconRight(
        "https://web.poecdn.com/image/item/popup/tangled-symbol.png?1648706966521",
      );
      if (!isLeftSet) {
        setIconLeft(
          "https://web.poecdn.com/image/item/popup/tangled-symbol.png?1648706966521",
        );
      }

      isLeftSet = true;
    }
    if (influences.exarch) {
      setIconRight(
        "https://web.poecdn.com/image/item/popup/searing-symbol.png?1648706966517",
      );
      if (!isLeftSet)
        setIconLeft(
          "https://web.poecdn.com/image/item/popup/searing-symbol.png?1648706966517",
        );

      isLeftSet = true;
    }
  };

  useEffect(() => {
    determineIcon();
  }, []);

  return (
    <>
      {item.base.rarity === "Rare" && (
        <RareItemHeader>
          <IconLeft src={iconLeft} />
          <P>{item.base.name}</P>
          <P>{item.base.base}</P>
          <IconRight src={iconRight} />
        </RareItemHeader>
      )}

      {item.base.rarity === "Unique" && (
        <UniqueItemHeader>
          <IconLeft src={iconLeft} />
          <P>{item.base.name}</P>
          <P>{item.base.base}</P>
          <IconRight src={iconRight} />
        </UniqueItemHeader>
      )}
      {item.base.rarity === "Magic" && (
        <MagicItemHeader>
          <IconLeft src={iconLeft} />
          <P>{item.base.name}</P>
          <P>{item.base.base}</P>
          <IconRight src={iconRight} />
        </MagicItemHeader>
      )}
      {item.base.rarity === "Normal" && (
        <NormalItemHeader>
          <IconLeft src={iconLeft} />
          <P>{item.base.name}</P>
          <P>{item.base.base}</P>
          <IconRight src={iconRight} />
        </NormalItemHeader>
      )}
    </>
  );
};

const P = styled("div")`
  color: inherit;
`;

const IconLeft = styled("img")`
  position: absolute;

  max-height: 18px;
  left: 0;
`;

const IconRight = styled("img")`
  position: absolute;
  max-height: 16px;
  right: 0;
`;

const Header = styled(FlexWrap)`
  position: relative;
  width: 100%;
  height: 28px;
  flex-direction: column;
`;

const UniqueItemHeader = styled(Header)`
  background: url("https://web.poecdn.com/image/item/popup/header-double-unique-left.png?1648706966513")
      top left no-repeat,
    url("https://web.poecdn.com/image/item/popup/header-double-unique-right.png?1648706966517")
      top right no-repeat,
    url("https://web.poecdn.com/image/item/popup/header-double-unique-middle.png?1648706966513")
      top center repeat-x;
  color: #af6025;

  background-size: contain;
`;

const RareItemHeader = styled(Header)`
  background: url("https://web.poecdn.com/image/item/popup/header-double-rare-left.png?1648706966513")
      top left no-repeat,
    url("https://web.poecdn.com/image/item/popup/header-double-rare-right.png?1648706966513")
      top right no-repeat,
    url("https://web.poecdn.com/image/item/popup/header-double-rare-middle.png?1648706966513")
      top center repeat-x;
  color: #ff7;

  background-size: contain;
`;

const MagicItemHeader = styled(Header)`
  background: url('https://web.poecdn.com/image/item/popup/header-magic-left.png?1648706966517') top left no-repeat,url('https://web.poecdn.com/image/item/popup/header-magic-right.png?1648706966517') top right no-repeat,url('https://web.poecdn.com/image/item/popup/header-magic-middle.png?1648706966517') top center repeat-x  width: 100%;
  color: #88f;

  background-size: contain;
`;

const NormalItemHeader = styled(Header)`
  background: url("https://web.poecdn.com/image/image/item/popup/header-normal-left.png?1648706966517")
      top left no-repeat,
    url("https://web.poecdn.com/image/image/item/popup/header-normal-right.png?1648706966517")
      top right no-repeat,
    url("https://web.poecdn.com/image/image/item/popup/header-normal-middle.png?1648706966517")
      top center repeat-x;
  color: #c8c8c8;

  background-size: contain;
`;
