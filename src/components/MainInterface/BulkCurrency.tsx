import PickedItems from "./PickedItems";
import StashTabPicker from "./StashTabPicker";
import TotalValue from "./TotalValue";
import GeneratedMessage from "../GeneratedMessage/GeneratedMessage";
import PickedTabsHeader from "./PickedTabsHeader";

const BulkCurrency = () => {
  return (
    <>
      <StashTabPicker />
      <PickedTabsHeader />
      <PickedItems />
      <TotalValue />

      <GeneratedMessage />
    </>
  );
};

export default BulkCurrency;
