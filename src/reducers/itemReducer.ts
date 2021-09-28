import { AnyAction } from "redux";
import { AppDispatch, RootState } from "../store";
import { Item, StashTab } from "../types";

const initialState: Record<string, any> | undefined = {};

const itemReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_ITEMS": {
      let newState: any = { ...state };

      for (const [key, value] of Object.entries(action.data.items)) {
        const temp: any = value;
        if (newState[key]) {
          newState[key].stackSize += temp.stackSize;
          newState[key].totalValue =
            ((newState[key].stackSize * newState[key].sellMultiplier) / 100) *
            newState[key].sellValue;
        } else {
          newState[key] = value;

          newState[key].totalValue =
            ((newState[key].stackSize * newState[key].sellMultiplier) / 100) *
            newState[key].sellValue;
        }
      }
      return newState;
    }
    case "REMOVE_ITEMS": {
      let newState = { ...state };
      for (const [key, value] of Object.entries(action.data.items)) {
        const temp: any = value;
        if (newState[key]) {
          newState[key].stackSize -= temp.stackSize;

          newState[key].totalValue =
            ((newState[key].stackSize * newState[key].sellMultiplier) / 100) *
            newState[key].sellValue;
        }
      }
      let result: Record<string, Item> = {};

      for (const [key, value] of Object.entries(newState)) {
        if (newState[key].stackSize !== 0) {
          result[key] = value;
        }
      }

      return result;
    }
    case "TOGGLE_ITEM_SELECT": {
      const newState = { ...state };
      newState[action.data.name].isSelected =
        !newState[action.data.name].isSelected;
      return newState;
    }
    case "UPDATE_ITEM_PROPS": {
      const newState = { ...state };

      newState[action.data.name].sellMultiplier = action.data.multiplier;
      newState[action.data.name].sellValue = action.data.chaosValue;
      newState[action.data.name].totalValue =
        ((newState[action.data.name].stackSize *
          newState[action.data.name].sellMultiplier) /
          100) *
        newState[action.data.name].sellValue;
      return newState;
    }

    case "UPDATE_MULTIPLIER_VALUE": {
      const newState = { ...state };

      newState[action.data.name].sellMultiplier = action.data.multiplier;
      newState[action.data.name].totalValue =
        ((newState[action.data.name].stackSize *
          newState[action.data.name].sellMultiplier) /
          100) *
        newState[action.data.name].sellValue;
      return newState;
    }
    case "UPDATE_CHAOS_VALUE": {
      const newState = { ...state };

      newState[action.data.name].sellValue = action.data.chaosValue;
      newState[action.data.name].totalValue =
        ((newState[action.data.name].stackSize *
          newState[action.data.name].sellMultiplier) /
          100) *
        newState[action.data.name].sellValue;
      return newState;
    }
    case "CLEAR_ALL_ITEMS": {
      const newState = { ...state };
      return {};
    }
    default:
      return state;
  }
};

export const addGlobalItems = (items: Record<string, Item>) => {
  return {
    type: "ADD_ITEMS",
    data: { items: items },
  };
};

export const removeGlobalItems = (items: Record<string, Item>) => {
  return {
    type: "REMOVE_ITEMS",
    data: { items: items },
  };
};
export const toggleItemSelect = (name: string) => {
  return {
    type: "TOGGLE_ITEM_SELECT",
    data: { name: name },
  };
};

export const updateMultiplierValue = (name: string, multiplier: number) => {
  return {
    type: "UPDATE_MULTIPLIER_VALUE",
    data: { name: name, multiplier: multiplier },
  };
};
export const updateChaosValue = (name: string, chaosValue: number) => {
  return {
    type: "UPDATE_CHAOS_VALUE",
    data: { name: name, chaosValue: chaosValue },
  };
};
export const updateItemProps = (
  name: string,
  multiplier: number,
  chaosValue: number
) => {
  return {
    type: "UPDATE_ITEM_PROPS",
    data: { name: name, multiplier: multiplier, chaosValue: chaosValue },
  };
};
export const clearAllItems = () => {
  return {
    type: "CLEAR_ALL_ITEMS",
  };
};
export default itemReducer;
