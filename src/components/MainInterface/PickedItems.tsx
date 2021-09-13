import { useAppSelector } from "../..";
import { StashTab } from "../../types";

const PickedItems = () => {
  const selectedStashes = useAppSelector((store) =>
    store.stashes.filter((stash: StashTab) => {
      return stash.isSelected === true;
    })
  );
  console.log(selectedStashes);
  return <></>;
};

export default PickedItems;
