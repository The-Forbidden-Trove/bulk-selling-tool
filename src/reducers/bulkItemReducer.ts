import { generateItem } from "poe-text-to-item";
import { BulkItem } from "../types";

const initialState: BulkItem[] = [];

const bulkItemReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const newState = [...state];
      const newItem: BulkItem = {
        id: "ewe",
        itemText: action.data.itemString,
        name: action.data.name,
        chaosValue: action.data.chaosValue,
        exValue: action.data.exValue,
        isMirrorService: action.data.isMirrorService,
        isSelected: true,
        item: generateItem(action.data.itemString),
      };
      console.log(newItem);
      return [...newState, newItem];
    }

    case "REMOVE_ITEMS": {
      break;
    }

    case "SELECT_ITEM": {
      break;
    }
    case "UNSELECT_ITEM": {
      break;
    }

    case "TOGGLE_ITEM_SELECT": {
      break;
    }

    case "UPDATE_BULK_ITEM_NAME": {
      const newState = [...state];
      return newState.map((item) => {
        return item.id === action.data.itemId
          ? { ...item, name: action.data.newName }
          : { ...item };
      });
    }

    case "UPDATE_BULK_ITEM_CHAOS": {
      const newState = [...state];
      return newState.map((item) => {
        return item.id === action.data.itemId
          ? { ...item, exValue: action.data.newChaosValue }
          : { ...item };
      });
    }

    case "UPDATE_BULK_ITEM_EX": {
      const newState = [...state];
      return newState.map((item) => {
        return item.id === action.data.itemId
          ? { ...item, exValue: action.data.newExValue }
          : { ...item };
      });
    }
    case "CLEAR_ALL_ITEMS": {
      const newState = [...state];
      return [];
    }
    case "SELECT_ALL_ITEMS": {
      const newState = [...state];

      return newState;
    }
    case "UNSELECT_ALL_ITEMS": {
      const newState = [...state];

      return newState;
    }

    default:
      return state;
  }
};

export const addBulkItem = (
  itemString: string,
  name: string,
  chaosValue: number,
  exValue: number,
  isMirrorService: boolean,
) => {
  return {
    type: "ADD_ITEM",
    data: {
      itemString: itemString,
      name: name,
      chaosValue: chaosValue,
      exValue: exValue,
      isMirrorService: isMirrorService,
    },
  };
};

export const removeBulkItem = (itemId: string) => {
  return {
    type: "REMOVE_ITEM",
    data: { itemId: itemId },
  };
};
export const toggleBulkItemSelect = (itemId: string) => {
  return {
    type: "TOGGLE_ITEM_SELECT",
    data: { itemId: itemId },
  };
};

export const updateChaosValue = (itemId: string, chaosValue: number) => {
  return {
    type: "UPDATE_CHAOS_VALUE",
    data: { itemId: itemId, chaosValue: chaosValue },
  };
};

export const resetChaosValue = (itemId: string, chaosEquivalent: number) => {
  return {
    type: "RESET_CHAOS_VALUE",
    data: { itemId: itemId, chaosEquivalent: chaosEquivalent },
  };
};
export const updateItemProps = (
  itemId: string,
  multiplier: number,
  chaosValue: number,
) => {
  return {
    type: "UPDATE_ITEM_PROPS",
    data: { itemId: itemId, multiplier: multiplier, chaosValue: chaosValue },
  };
};

export const updateBulkItemName = (itemId: string, newName: string) => {
  return {
    type: "UPDATE_BULK_ITEM_NAME",
    data: { itemId: itemId, newName: newName },
  };
};

export const updateBulkItemChaosValue = (
  itemId: string,
  newChaosValue: number,
) => {
  return {
    type: "UPDATE_BULK_ITEM_CHAOS",
    data: { itemId: itemId, newChaosValue: newChaosValue },
  };
};

export const updateBulkItemExValue = (itemId: string, newExValue: number) => {
  return {
    type: "UPDATE_BULK_ITEM_EX",
    data: { itemId: itemId, newExValue: newExValue },
  };
};

export const updateBulkItemIsMirrorService = (
  itemId: string,
  newIsMirrorService: boolean,
) => {
  return {
    type: "UPDATE_BULK_ITEM_MIRROR",
    data: { itemId: itemId, newIsMirrorService: newIsMirrorService },
  };
};

export const clearAllItems = () => {
  return {
    type: "CLEAR_ALL_ITEMS",
  };
};

export const selectItem = (itemId: string) => {
  return {
    type: "SELECT_ITEM",
    data: { itemId: itemId },
  };
};

export const unselectItem = (itemId: string) => {
  return {
    type: "UNSELECT_ITEM",
    data: { itemId: itemId },
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

const roundToTwo = (value: number) => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};

export default bulkItemReducer;
