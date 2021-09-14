import { useEffect } from "react";
import styled from "styled-components";
import { useAppSelector } from "../..";
import { getSelectedTabsItems } from "../../api/ggg/ggg";
import { useAuth } from "../../api/oauth/AuthContext";
import { StashTab } from "../../types";

const Wrapper = styled.div`
  grid-column: 1 / -1;
`;
const ItemRecordWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 2fr 2fr 2fr 2fr;
`;
const PickedItems = ({ selectedItems }: any) => {
  const { authService } = useAuth();

  return <Wrapper></Wrapper>;
};

export default PickedItems;

//{selectedItems &&
//Object.keys(selectedItems).map((item: any) => {
//console.log("ITEM: ", selectedItems[item]);
//return (
//<ItemRecordWrap>
//<p>Remove</p>
//<div style={{ display: "flex" }}>
//<img src={selectedItems[item].icon} />
//<p>{selectedItems[item].name}</p>
//</div>
//<p>Multiplier:</p>
//<p>Single value:</p>
//<p>Amount:</p>
//<p>Total value:</p>
//</ItemRecordWrap>
//);
//})}
