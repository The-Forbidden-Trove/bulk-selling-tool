import styled from "styled-components";
import { FlexWrap } from "../baseStyles";
import StashTabL from "../../assets/StashTabL.png";
import StashTabM from "../../assets/StashTabM.png";
import StashTabR from "../../assets/StashTabR.png";
import { useAppDispatch, useAppSelector } from "../..";
import { StashTab } from "../../types";
import { unselectStash } from "../../reducers/stashReducer";

const PickedTabs = () => {
  const stashes = useAppSelector((store) => store.stashes);
  const dispatch = useAppDispatch();

  const click = (id: string) => {
    dispatch(unselectStash(id));
  };

  return (
    <Wrapper>
      {stashes.map((stashTab: StashTab) => {
        return (
          stashTab.isSelected && (
            <TabWrap onClick={() => click(stashTab.id)} key={stashTab.id}>
              <LeftPart />
              <MidPart>
                <p>
                  {stashTab.name.toLowerCase().includes("remove-only")
                    ? `${stashTab.name.split(" ").slice(0, -1)} (R/O)`
                    : stashTab.name}
                </p>
              </MidPart>
              <RightPart />
              {stashTab.assignedTypes?.map((type: any) => {
                return <Icon src={type.icon} key={type.type} />;
              })}

              <p>{stashTab.defaultMultiplier}%</p>
            </TabWrap>
          )
        );
      })}
    </Wrapper>
  );
};

export default PickedTabs;

const Wrapper = styled(FlexWrap)`
  height: 36px;
  width: 100%;
  overflow-y: scroll;
  flex-flow: column wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  padding: 0px 15px 0px 30px;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
    background: none;
  }

  &::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;

    background: none;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
  }
`;

const TabWrap = styled(FlexWrap)`
  height: 36px;

  cursor: pointer;
  outline: none;
  border: none;
  color: blue;
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
    text-align: center;
    vertical-align: middle;
    padding: 2px 0px 0px 0px;
  }
`;
const RightPart = styled.div`
  background-image: url(${StashTabR});
  color: rgb(255, 192, 119);
  height: 26px;
  width: 19px;
`;

const Icon = styled.img`
  padding: 0px 5px 0px 0px;
  width: 36px;
  height: 36px;
  object-fit: contain;
`;
