import styled from "styled-components";
import { FlexWrap } from "../baseStyles";
import StashTabL from "../../assets/StashTabL.png";
import StashTabM from "../../assets/StashTabM.png";
import StashTabR from "../../assets/StashTabR.png";
import { useAppDispatch, useAppSelector } from "../..";
import { StashTab } from "../../types";
import { unselectStash } from "../../reducers/stashReducer";

const Header = styled.h3`
  text-align: center;
  margin: 5px 0px;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontM};
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: start;
  grid-row-gap: 15px;
  grid-auto-rows: min-content;
`;

const TabWrap = styled(FlexWrap)`
  height: 26px;
  margin: 0px 0px;
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
    margin: 3px 0px 0px 0px;
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
const PickedTabs = () => {
  const stashes = useAppSelector((store) => store.stashes);
  const dispatch = useAppDispatch();

  const click = (id: string) => {
    dispatch(unselectStash(id));
  };

  return (
    <div style={{ margin: "5px 0px" }}>
      <Header>Picked tabs</Header>
      <Wrapper>
        {stashes.map((stashTab: StashTab) => {
          return (
            <>
              {!stashTab.isSelected ? (
                <></>
              ) : (
                <TabWrap onClick={() => click(stashTab.id)}>
                  <LeftPart />
                  <MidPart>{stashTab.name}</MidPart>
                  <RightPart />
                  {stashTab.assignedTypes?.map((type: any) => {
                    return <Icon src={type.icon} />;
                  })}

                  <p>{stashTab.defaultMultiplier}%</p>
                </TabWrap>
              )}
            </>
          );
        })}
      </Wrapper>
    </div>
  );
};

export default PickedTabs;
