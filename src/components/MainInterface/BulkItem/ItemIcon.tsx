import { useEffect, useState } from "react";
import styled from "styled-components";
import { FlexWrap } from "../../baseStyles";

export const ItemIcon = ({ item }: any) => {
  const [background, setBackground] = useState("");
  const [secondaryBackground, setBackgroundSecondary] = useState("");

  const decideBackground = () => {
    const elderIcon = `https://web.poecdn.com/image/inventory/ElderBackground.png?w=${item.base.w}&h=${item.base.h}`;
    const shaperIcon = `https://web.poecdn.com/image/inventory/ShaperBackground.png?w=${item.base.w}&h=${item.base.h}&x=0&y=0`;
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
  margin-top: 6px;
`;

const IconBackground = styled.img`
  position: absolute;
`;

const IconBase = styled.img<{ isMirrored: boolean }>`
  transform: ${(props) => (props.isMirrored ? "scaleX(-1)" : "scaleX(1)")};
`;
