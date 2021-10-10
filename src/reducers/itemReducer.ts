import { Item } from "../types";

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
      if (action.data.items)
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
      newState[action.data.name].multiplier = action.data.multiplier;
      newState[action.data.name].sellValue = Math.round(
        (newState[action.data.name].chaosEquivalent *
          newState[action.data.name].sellMultiplier) /
          100
      );

      newState[action.data.name].totalValue =
        ((newState[action.data.name].stackSize *
          newState[action.data.name].sellMultiplier) /
          100) *
        newState[action.data.name].sellValue;
      return newState;
    }

    case "RESET_MULTIPLIER_VALUE": {
      const newState = { ...state };

      newState[action.data.name].sellMultiplier = 100;
      newState[action.data.name].multiplier = 100;

      newState[action.data.name].sellValue =
        newState[action.data.name].chaosEquivalent;

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

      newState[action.data.name].multiplier = Math.round(
        (newState[action.data.name].sellValue /
          newState[action.data.name].chaosEquivalent) *
          100
      );
      newState[action.data.name].sellMultiplier = Math.round(
        (newState[action.data.name].sellValue /
          newState[action.data.name].chaosEquivalent) *
          100
      );

      newState[action.data.name].totalValue =
        ((newState[action.data.name].stackSize *
          newState[action.data.name].sellMultiplier) /
          100) *
        newState[action.data.name].sellValue;
      return newState;
    }
    case "RESET_CHAOS_VALUE": {
      const newState = { ...state };

      newState[action.data.name].sellValue = action.data.chaosEquivalent;
      newState[action.data.name].multiplier = 100;
      newState[action.data.name].sellMultiplier = 100;

      newState[action.data.name].totalValue =
        ((newState[action.data.name].stackSize *
          newState[action.data.name].sellMultiplier) /
          100) *
        action.data.chaosEquivalent;
      return newState;
    }
    case "CLEAR_ALL_ITEMS": {
      const newState = { ...state };
      return {};
    }
    case "SELECT_ALL_ITEMS": {
      const newState = { ...state };

      for (const [key, value] of Object.entries(state)) {
        newState[key].isSelected = true;
      }

      return newState;
    }
    case "UNSELECT_ALL_ITEMS": {
      const newState = { ...state };

      for (const [key, value] of Object.entries(state)) {
        newState[key].isSelected = false;
      }

      return newState;
    }
    case "FILTER_BY_MIN_STACK": {
      const newState = { ...state };

      for (const [key, value] of Object.entries(state)) {
        if (newState[key].stackSize < action.data.minStackSize) {
          newState[key].isSelected = false;
        } else {
          newState[key].isSelected = true;
        }
      }

      return newState;
    }

    case "FILTER_BY_MIN_VALUE": {
      const newState = { ...state };

      for (const [key, value] of Object.entries(state)) {
        if (newState[key].sellValue < action.data.minValue) {
          newState[key].isSelected = false;
        } else {
          newState[key].isSelected = true;
        }
      }

      return newState;
    }
    case "FILTER_BY_MIN_TOTAL_VALUE": {
      const newState = { ...state };

      for (const [key, value] of Object.entries(state)) {
        if (newState[key].totalValue < action.data.minTotalValue) {
          newState[key].isSelected = false;
        } else {
          newState[key].isSelected = true;
        }
      }

      return newState;
    }
    case "SELECT_ITEM": {
      const newState = { ...state };
      if (newState[action.data.name]) {
        newState[action.data.name].isSelected = true;
      }
      return newState;
    }
    case "UNSELECT_ITEM": {
      const newState = { ...state };
      if (newState[action.data.name]) {
        newState[action.data.name].isSelected = false;
      }
      return newState;
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
export const resetMultiplierValue = (name: string, multiplier: number) => {
  return {
    type: "RESET_MULTIPLIER_VALUE",
    data: { name: name, multiplier: multiplier },
  };
};
export const updateChaosValue = (name: string, chaosValue: number) => {
  return {
    type: "UPDATE_CHAOS_VALUE",
    data: { name: name, chaosValue: chaosValue },
  };
};

export const resetChaosValue = (name: string, chaosEquivalent: number) => {
  return {
    type: "RESET_CHAOS_VALUE",
    data: { name: name, chaosEquivalent: chaosEquivalent },
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
export const selectItem = (name: string) => {
  return {
    type: "SELECT_ITEM",
    data: { name: name },
  };
};

export const unselectItem = (name: string) => {
  return {
    type: "UNSELECT_ITEM",
    data: { name: name },
  };
};
export const selectAllItems = () => {
  return {
    type: "SELECT_ALL_ITEMS",
  };
};
export const unselectAllItems = () => {
  return {
    type: "UNSELECT_ALL_ITEMS",
  };
};
export const filterByMinStack = (minStackSize: number) => {
  return {
    type: "FILTER_BY_MIN_STACK",
    data: { minStackSize: minStackSize },
  };
};

export const filterByMinValue = (minValue: number) => {
  return {
    type: "FILTER_BY_MIN_VALUE",
    data: { minValue: minValue },
  };
};
export const filterByMinTotalValue = (minTotalValue: number) => {
  return {
    type: "FILTER_BY_MIN_TOTAL_VALUE",
    data: { minTotalValue: minTotalValue },
  };
};
export default itemReducer;
