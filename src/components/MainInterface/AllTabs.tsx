import styled from "styled-components";
import { StashTab } from "../../types";
import { FlexWrap } from "../baseStyles";
import StashTabL from "../../assets/StashTabL.png";
import StashTabM from "../../assets/StashTabM.png";
import StashTabR from "../../assets/StashTabR.png";
import { useAppDispatch, useAppSelector } from "../..";
import { highlightStash } from "../../reducers/stashReducer";
import { useState } from "react";
import { Checkbox } from "../Checkbox";

const AllTabs = () => {
  const [removeOnly, setRemoveOnly] = useState<boolean>(true);
  const [stashFilter, setStashFilter] = useState<string>("");
  const stashes = useAppSelector((store) => store.stashes);
  const dispatch = useAppDispatch();

  const click = (id: string) => {
    dispatch(highlightStash(id));
  };
  const handleRemoveOnly = (e: any) => {
    e.preventDefault();
    setRemoveOnly(!removeOnly);
  };

  return (
    <Wrapper>
      <Header>1. Pick a tab</Header>
      <Options>
        <Filter
          placeholder="Find tabs... "
          value={stashFilter}
          onChange={(e: any) => setStashFilter(e.target.value)}
        />

        <RemoveOnly
          isSelected={!removeOnly}
          onClick={(e: any) => handleRemoveOnly(e)}
        >
          <Checkbox checked={!removeOnly} onChange={() => {}} />
          <HideRemoveOnlyTabs>Show Remove-Only Tabs</HideRemoveOnlyTabs>
        </RemoveOnly>
      </Options>
      <TabList>
        {stashes
          .filter((x: StashTab) => {
            if (removeOnly) {
              return !x.name.toLocaleLowerCase().includes("remove-only");
            }
            return true;
          })
          .filter((x: StashTab) => {
            return x.name
              .toLocaleLowerCase()
              .includes(stashFilter.toLocaleLowerCase());
          })
          .map((stashTab: StashTab) => {
            return (
              !stashTab.isSelected && (
                <TabWrap
                  key={stashTab.id}
                  onClick={() => click(stashTab.id)}
                  scale={stashTab.isHighlited ? 1.1 : 1}
                  z={stashTab.isHighlited ? 99 : 1}
                >
                  <LeftPart backColor={stashTab.colour} />
                  <MidPart
                    backColor={stashTab.colour}
                    isSelected={stashTab.isHighlited}
                  >
                    <p>
                      {stashTab.name.toLowerCase().includes("remove-only")
                        ? `${stashTab.name.split(" ").slice(0, -1)} (R/O)`
                        : stashTab.name}
                    </p>
                  </MidPart>
                  <RightPart backColor={stashTab.colour} />
                </TabWrap>
              )
            );
          })}
      </TabList>
    </Wrapper>
  );
};

export default AllTabs;

const Wrapper = styled(FlexWrap)`
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  width: 60%;
  height: 100%;
  padding: 10px 0px 0px 0px;
  margin: 0px 50px 0px 0px;
`;

const Header = styled.h3`
  text-align: center;
  margin: 5px 0px;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontM};
`;

const Options = styled(FlexWrap)`
  width: 100%;
  padding: 0px 10px 15px 0px;
  justify-content: space-between;
`;
const RemoveOnly = styled(FlexWrap)<{ isSelected: boolean }>`
  background: none;
  padding: 0px 10px;
  outline: none;
  border: none;
  cursor: pointer;
  opacity: ${(props) => (props.isSelected ? 1 : 0.5)};
`;
const HideRemoveOnlyTabs = styled.p`
  padding: 0px 0px 2px 10px;
  color: ${(props) => props.theme.colors.text};
`;

const TabList = styled(FlexWrap)`
  flex-flow: column wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
    padding: 0px 15px;
  height: 130px;
    width 100%;
  overflow-y: scroll;

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
const MidPart = styled.div<{ backColor: string; isSelected: boolean }>`
  background-image: url(${StashTabM});
  height: 26px;
  color: rgb(255, 192, 119);
  > p {
    color: ${(props) =>
      props.isSelected ? props.theme.colors.text : props.theme.colors.bg};
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

const Filter = styled.input`
  border: none;

  color: ${(props) => props.theme.colors.accent2};
  background: none;
  outline: none;
  padding: 10px;
  border-bottom: 1px solid ${(props) => props.theme.colors.accentDark};
  font-size: ${(props) => props.theme.fontM};
`;
