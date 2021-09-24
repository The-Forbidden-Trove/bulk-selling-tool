import styled from "styled-components";
import { StashTab } from "../../types";
import { FlexWrap } from "../baseStyles";
import StashTabL from "../../assets/StashTabL.png";
import StashTabM from "../../assets/StashTabM.png";
import StashTabR from "../../assets/StashTabR.png";
import { useAppDispatch, useAppSelector } from "../..";
import { highlightStash } from "../../reducers/stashReducer";

const Wrapper = styled(FlexWrap)`
  flex-flow: column wrap;
  flex-direction: row;

  justify-content: flex-start;
`;

const TabWrap = styled(FlexWrap)<{ scale: number; z: number }>`
  height: 26px;
  margin: 0px 0px;
  cursor: pointer;
  transform: scale(${({ scale }) => scale});
  transition: all ease 0.2s;

  z-index: ${({ z }) => z};
  outline: none;
  border: none;
`;

const LeftPart = styled.div<{ backColor: string }>`
  background-image: url(${StashTabL});
  height: 26px;
  width: 19px;
  color: rgb(255, 192, 119);
`;
const MidPart = styled.div<{ backColor: string }>`
  background-image: url(${StashTabM});
  height: 26px;
  color: rgb(255, 192, 119);
  > p {
    color: rgb(59, 44, 27);
    margin: 3px 0px 0px 0px;
    text-align: center;
    vertical-align: middle;
    padding: 2px 0px 0px 0px;
  }
`;
const RightPart = styled.div<{ backColor: string }>`
  background-image: url(${StashTabR});
  color: rgb(255, 192, 119);
  height: 26px;
  width: 19px;
`;
const AllTabs = () => {
  const stashes = useAppSelector((store) => store.stashes);
  const dispatch = useAppDispatch();

  const click = (id: string) => {
    dispatch(highlightStash(id));
  };

  return (
    <Wrapper>
      {stashes.map((stashTab: StashTab) => {
        return (
          <>
            {stashTab.isSelected ? (
              <></>
            ) : (
              <TabWrap
                onClick={() => click(stashTab.id)}
                scale={stashTab.isHighlited ? 1.2 : 1}
                z={stashTab.isHighlited ? 99 : 1}
              >
                <LeftPart backColor={stashTab.colour} />
                <MidPart backColor={stashTab.colour}>
                  <p>{stashTab.name}</p>
                </MidPart>
                <RightPart backColor={stashTab.colour} />
              </TabWrap>
            )}
          </>
        );
      })}
    </Wrapper>
  );
};

export default AllTabs;
