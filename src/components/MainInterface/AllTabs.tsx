import styled from "styled-components";
import { StashTab } from "../../types";
import { FlexWrap } from "../baseStyles";
import StashTabL from "../../assets/StashTabL.png";
import StashTabM from "../../assets/StashTabM.png";
import StashTabR from "../../assets/StashTabR.png";
import { useState } from "react";

const Wrapper = styled(FlexWrap)`
  flex-flow: column wrap;
  flex-direction: row;
`;

const TabWrap = styled(FlexWrap)`
  height: 26px;
  margin: 0px 0px;
  cursor: pointer;
`;

const LeftPart = styled.div`
  background-image: url(${StashTabL});
  height: 26px;
  width: 19px;
  color: rgb(255, 192, 119);
`;
const MidPart = styled.div`
  background-image: url(${StashTabM});
  height: 26px;
  color: rgb(255, 192, 119);
  > p {
    color: rgb(59, 44, 27);
    margin: 3px 0px 0px 0px;
  }
`;
const RightPart = styled.div`
  background-image: url(${StashTabR});
  color: rgb(255, 192, 119);
  height: 26px;
  width: 19px;
`;
const AllTabs = () => {
  const [stashTabs, setStashTabs] = useState<StashTab[]>([]);

  return (
    <Wrapper>
      {stashTabs.map((stashTab: StashTab) => {
        return (
          <TabWrap>
            <LeftPart />
            <MidPart>{stashTab.name}</MidPart>
            <RightPart />
          </TabWrap>
        );
      })}
    </Wrapper>
  );
};

export default AllTabs;
