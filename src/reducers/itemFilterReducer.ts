import { itemFilter as defautFilter } from "../itemFilter";
import { ItemFilter } from "../types";

const { fragments, ...defautItemFilter } = defautFilter;

const initialState: Record<string, ItemFilter> = {};

const itemFilterReducer = (state = initialState, action: any) => {
  switch (action.types) {
    case "INIT_ITEM_FILTER":
      return action.data;
    case "TOGGLE_IS_SELECTED_BY_DEFAULT":
      const newState = { ...state };
      return newState;
    case "SAVE_ITEM_FILTER":
      window.localStorage.setItem("itemFilter", JSON.stringify(state));
      return state;
    default:
      break;
  }
};

export const initItemFilter = () => {
  const itemFilter = window.localStorage.getItem("itemFilter");
  if (itemFilter && itemFilter.length) {
    return {
      type: "INIT_ITEM_FILTER",
      data: JSON.parse(itemFilter),
    };
  } else {
    const result: Record<string, ItemFilter> = {};

    for (const [key, value] of Object.entries(defautItemFilter)) {
      result[key as string] = {
        name: value.name,
        items: value.items.map((x: any) => {
          return { isSelectedByDefault: true, name: x };
        }),
        icon: value.icon,
      };
    }

    return {
      type: "INIT_ITEM_FILTER",
      data: result,
    };
  }
};

export const toggleItemIsSelectedByDefault = (name: string) => {
  return {
    type: "TOGGLE_IS_SELECTED_BY_DEFAULT",
    data: { name: name },
  };
};

export const saveItemFilter = () => {
  return {
    type: "SAVE_ITEM_FILTER",
  };
};
export default itemFilterReducer;
