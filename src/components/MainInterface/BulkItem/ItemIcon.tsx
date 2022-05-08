import { useEffect, useState } from "react";
import styled from "styled-components";
import { FlexWrap } from "../../baseStyles";

export const ItemIcon = ({ item }: any) => {
  const [background, setBackground] = useState("");
  const [isGrid, setIsGrid] = useState(true);
  const [secondaryBackground, setBackgroundSecondary] = useState("");

  //const decideBackground = () => {
  //  const elderIcon = `https://web.poecdn.com/image/inventory/ElderBackground.png?w=${item.base.w}&h=${item.base.h}`;
  //  const shaperIcon = `https://web.poecdn.com/image/inventory/ShaperBackground.png?w=${item.base.w}&h=${item.base.h}&x=0&y=0`;
  //  const influences = item.flags.influence;
  //  let isLeftSet = false;

  //  if (influences.shaper) {
  //    setBackground(shaperIcon);
  //    if (!isLeftSet) {
  //      setBackgroundSecondary(shaperIcon);
  //    }

  //    isLeftSet = true;
  //  }
  //  if (influences.elder) {
  //    setBackground(elderIcon);
  //    if (!isLeftSet) {
  //      setBackgroundSecondary(elderIcon);
  //    }

  //    isLeftSet = true;
  //  }
  //};

  //useEffect(() => {
  //  decideBackground();
  //}, []);

  const sockets = "https://web.poecdn.com/image/gen/socket.png?1651788356474";

  useEffect(() => {
    if (item.base.w === 1 && (item.base.h === 3 || item.base.h === 4))
      setIsGrid(false);
    if (
      item.sockets &&
      item.sockets.groups &&
      item.sockets.groups.flatMap((e: any) => e).length <= 1
    )
      setIsGrid(false);
  }, [item.base.w, item.base.h]);

  const getOffsetX = (color: string) => {
    if (color === "R") return "-140px";
    if (color === "G") return "-35px";
    if (color === "B") return "-105px";
    if (color === "W") return "-140px";
    if (color === "A") return "0px";
    return "";
  };

  const getOffsetY = (color: string) => {
    if (color === "R") return "0px";
    if (color === "G") return "-105px";
    if (color === "B") return "-0px";
    if (color === "W") return "-35px";
    if (color === "A") return "-70px";
    return "";
  };

  const getLinks = () => {
    let links = [
      <LinkHorizontal bg={""} />,
      <LinkVertical bg={""} />,
      <LinkHorizontal bg={""} />,
      <LinkVerticalLeft bg={""} />,
      <LinkHorizontal bg={""} />,
    ];

    let idx = 0;

    let isLeft = false;
    let isEven = true;
    item.sockets.groups.forEach((group: string[]) => {
      group.slice(0, -1).forEach((color: string) => {
        links[idx] = isEven ? (
          <LinkHorizontal
            bg={"https://web.poecdn.com/image/gen/socket.png?1651788356474"}
          />
        ) : isLeft ? (
          <LinkVerticalLeft
            bg={"https://web.poecdn.com/image/gen/socket.png?1651788356474"}
          />
        ) : (
          <LinkVertical
            bg={"https://web.poecdn.com/image/gen/socket.png?1651788356474"}
          />
        );
        idx += 1;
        if (isEven === false) isLeft = !isLeft;
        isEven = !isEven;
      });

      if (group.length <= 2) {
        idx += 1;
        isEven = !isEven;
      }
    });

    if (item.sockets.count.sockets % 2 === 0)
      return links.slice(0, item.sockets.count.sockets - 1);

    return links.slice(0, item.sockets.count.sockets);
  };

  const getVerticalLinks = () => {
    let links = [<LinkVerticalMid bg={""} />, <LinkVerticalMid bg={""} />];

    let idx = 0;

    item.sockets.groups.forEach((group: string[]) => {
      group.slice(0, -1).forEach((color: string) => {
        links[idx] = (
          <LinkVerticalMid
            bg={"https://web.poecdn.com/image/gen/socket.png?1651788356474"}
          />
        );
        idx += 1;
      });
    });

    if (item.sockets.count.sockets % 2 === 0)
      return links.slice(0, item.sockets.count.sockets - 1);

    return links.slice(0, item.sockets.count.sockets);
  };

  return (
    <>
      {item.icon && (
        <Wrapper>
          <IconBase
            src={item.icon + (item.base.rarity === "Unique" ? "" : "&scale=1")}
            isMirrored={item.flags.mirrored}
            isUnique={item.base.rarity === "Unique"}
            isOneWidth={item.base.w === 1}
          />

          {item.sockets && item.sockets.groups &&<Sockets isGrid={isGrid}>
            {item.sockets.groups.flatMap((group: string[]) => {
              return group.map((color: string) => {
                const offsetX = getOffsetX(color);
                const offsetY = getOffsetY(color);
                return (
                  <FlexWrap>
                    <IconBackground
                      sockets={sockets}
                      offsetX={offsetX}
                      offsetY={offsetY}
                    />
                  </FlexWrap>
                );
              });
            })}
          </Sockets>}

          {item.sockets && item.sockets.groups && item.base.w === 1 &&
            <Links>{getVerticalLinks()}</Links>
        }

          {item.sockets && item.sockets.groups && item.base.w !== 1 &&
            <Links>{getLinks()}</Links>
        }
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled(FlexWrap)`
  margin-top: 6px;
  width: 650px;
  position: relative;
`;

const Links = styled(FlexWrap)`
  position: absolute;
  flex-direction: column;
  z-index: 999;
  width: 64px;
  max-height: 110px;
`;

const Sockets = styled(FlexWrap)<{ isGrid: boolean }>`
  position: absolute;
  flex-direction: column;
  grid-template-columns: 1fr 1fr;
  grid-row-start: 1;
  display: ${(props) => (props.isGrid ? "grid" : "flex")};
  place-items: center;
  width: 64px;
  max-height: 110px;
  & div:nth-child(3) {
    grid-column: 2;
    grid-row: 2;
  }
  &div:nth-child(4) {
    grid-column: 1;
    grid-row: 2;
  }
`;

const IconBackground = styled.div<{
  sockets: string;
  offsetX: any;
  offsetY: any;
}>`
  background: ${(props) => "url(" + props.sockets + ") no-repeat"};
  background-position: ${(props) => props.offsetX + " " + props.offsetY};
  margin: 6px;
  width: 35px;
  height: 35px;
`;

const LinkHorizontal = styled.div<{ bg: string }>`
  background: ${(props) => "url(" + props.bg + ") no-repeat"};
  background-position: -70px -140px;
  height: 15px;
  width: 38px;
`;

const LinkVertical = styled.div<{ bg: string }>`
  background: ${(props) => "url(" + props.bg + ") no-repeat"};
  background-position: -175px 0px;
  width: 15px;
  height: 38px;
  align-self: flex-end;
  justify-self: flex-end;
`;

const LinkVerticalLeft = styled.div<{ bg: string }>`
  background: ${(props) => "url(" + props.bg + ") no-repeat"};
  background-position: -175px 0px;
  width: 15px;
  height: 38px;
  align-self: flex-start;
  justify-self: flex-start;
`;

const LinkVerticalMid = styled.div<{ bg: string }>`
  background: ${(props) => "url(" + props.bg + ") no-repeat"};
  background-position: -175px 0px;
  width: 15px;
  height: 38px;
`;

const IconBase = styled.img<{
  isMirrored: boolean;
  isUnique: boolean;
  isOneWidth: boolean;
}>`
  max-width: ${(props) => (props.isOneWidth ? "47px" : "94px")};
  height: auto;
  transform: ${(props) => (props.isMirrored ? "scaleX(-1)" : "scaleX(1)")};
`;
