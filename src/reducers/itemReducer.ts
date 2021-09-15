import { AnyAction } from "redux";
import { getAllSTashTabs, getSelectedTabsItems } from "../api/ggg/ggg";
import { AppDispatch, RootState } from "../store";
import { CurrencyType, StashTab } from "../types";

const initialState: StashTab[] | undefined = [];

const itemReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "INIT_ITEMS": {
      return action.data;
    }
    default:
      return state;
  }
};

export const initItems = (selectedStashes: StashTab[]) => {
  return (dispatch: AppDispatch, getState: RootState) => {};
};

export default itemReducer;
