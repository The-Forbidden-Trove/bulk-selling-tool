import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FlexWrap } from "../../baseStyles";
import { Divider } from "./Divider";

export const ItemIcon = ({ item }: any) => {
  const [background, setBackground] = useState("");
  const [secondaryBackground, setBackgroundSecondary] = useState("");

  const decideBackground = () => {
    const elderIcon = `https://web.poecdn.com/image/inventory/ElderBackground.png?w=${item.w}&h=${item.h}`;
    const shaperIcon = `https://web.poecdn.com/image/inventory/ShaperBackground.png?w=${item.w}&h=${item.h}&x=0&y=0`;
    const influences = item.flags.influence;
    let isLeftSet = false;

    if (influences.shaper) {
      setBackground(shaperIcon);
      if (!isLeftSet) {
        setBackgroundSecondary(shaperIcon);
      }

      isLeftSet = true;
    }
    if (influences.elder) {
      setBackground(elderIcon);
      if (!isLeftSet) {
        setBackgroundSecondary(elderIcon);
      }

      isLeftSet = true;
    }

  };

  useEffect(() => {
    decideBackground();
  }, []);

  return (
    <>
      {item.icon && (
        <Wrapper>
          <IconBackground src={background} />
          <IconBackground src={secondaryBackground} />
          <IconBase src={item.icon} isMirrored={item.flags.mirrored} />
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled(FlexWrap)`
  position: relative;
`;
const IconBackground = styled.img`
  position: absolute;
`;

const IconBase = styled.img<{ isMirrored: boolean }>`
  position: absolute;
  transform: ${(props) => (props.isMirrored ? "scaleX(-1)" : "scaleX(1)")};
`;
