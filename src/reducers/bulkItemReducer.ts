import { generateItem } from "poe-text-to-item";
import { v4 as uuidv4 } from "uuid";
import { BulkItem } from "../types";

const initialState: BulkItem[] = [];

const bulkItemReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const newState = [...state];

      const item = generateItem(action.data.itemString);
      let name = action.data.name;
      if (name === "") {
        //@ts-ignore
        const itemName = item.base.name;
        //@ts-ignore
        const itemBase = item.base.base;
        name = (itemName ? itemName : "") + " " + (itemBase ? itemBase : "");
      }

      const note = item.note || "";

      let chaosValue = action.data.chaosValue;
      let exValue = action.data.exValue;
      let mirrorValue = action.data.mirrorValue;

      const regex = /^~price (\d*) (chaos|divine|mirror)$/m;
      const match = note.match(regex);

      if (match) {
        if (match[2] === "mirror" && action.data.mirrorValue === 0)
          mirrorValue = match[1];
        if (match[2] === "divine" && action.data.exValue === 0)
          exValue = match[1];
        if (match[2] === "chaos" && action.data.chaosValue === 0)
          chaosValue = match[1];
      }


      const newItem: BulkItem = {
        id: uuidv4(),
        itemText: action.data.itemString,
        name: name,
        chaosValue: chaosValue,
        exValue: exValue,
        mirrorValue: mirrorValue,
        isMirrorService: action.data.isMirrorService,
        itemNote: action.data.itemNote,
        isSelected: true,
        item: item,
      };
      const LS = localStorage.getItem("bulkItems");
      let savedItems = [];
      if (LS) savedItems = JSON.parse(LS);

      savedItems.push(newItem);
      localStorage.setItem("bulkItems", JSON.stringify(savedItems));

      return [...newState, newItem];
    }

    case "APPEND_BULK_ITEM": {
      const newState: BulkItem[] = [...state, action.data.newItem];
      return uniqueArrayOfObject(newState, "id");
    }

    case "REMOVE_BULK_ITEM": {
      const newState = state.filter((item) => {
        return item.id !== action.data.itemId;
      });
      localStorage.setItem("bulkItems", JSON.stringify(newState));
      return newState;
    }

    // case "SELECT_ITEM": {
    //   break;
    // }
    // case "UNSELECT_ITEM": {
    //   break;
    // }

    case "TOGGLE_ITEM_SELECT": {
      const newState = state.map((item) => {
        return item.id === action.data.itemId
          ? { ...item, isSelected: action.data.newChaosValue }
          : { ...item };
      });
      localStorage.setItem("bulkItems", JSON.stringify(newState));
      return newState;
    }

    case "UPDATE_BULK_ITEM_NAME": {
      const newState = state.map((item) => {
        return item.id === action.data.itemId
          ? { ...item, name: action.data.newName }
          : { ...item };
      });

      localStorage.setItem("bulkItems", JSON.stringify(newState));
      return newState;
    }

    case "UPDATE_BULK_ITEM_CHAOS": {
      const newState = state.map((item) => {
        return item.id === action.data.itemId
          ? { ...item, chaosValue: action.data.newChaosValue }
          : { ...item };
      });

      localStorage.setItem("bulkItems", JSON.stringify(newState));
      return newState;
    }

    case "UPDATE_BULK_ITEM_EX": {
      const newState = state.map((item) => {
        return item.id === action.data.itemId
          ? { ...item, exValue: action.data.newExValue }
          : { ...item };
      });

      localStorage.setItem("bulkItems", JSON.stringify(newState));
      return newState;
    }

    case "UPDATE_BULK_ITEM_MIRROR_VALUE": {
      const newState = state.map((item) => {
        return item.id === action.data.itemId
          ? { ...item, mirrorValue: action.data.newMirrorValue }
          : { ...item };
      });

      localStorage.setItem("bulkItems", JSON.stringify(newState));
      return newState;
    }

    case "UPDATE_BULK_ITEM_MIRROR": {
      const newState = state.map((item) => {
        return item.id === action.data.itemId
          ? { ...item, isMirrorService: action.data.newIsMirrorService }
          : { ...item };
      });

      localStorage.setItem("bulkItems", JSON.stringify(newState));
      return newState;
    }

    case "UPDATE_BULK_ITEM_NOTE": {
      const newState = state.map((item) => {
        return item.id === action.data.itemId
          ? { ...item, itemNote: action.data.newNote }
          : { ...item };
      });
      localStorage.setItem("bulkItems", JSON.stringify(newState));
      return newState;
    }

    case "UPDATE_BULK_ITEM_SELECT": {
      const newState = state.map((item) => {
        return item.id === action.data.itemId
          ? { ...item, isSelected: action.data.newSelect }
          : { ...item };
      });
      localStorage.setItem("bulkItems", JSON.stringify(newState));
      return newState;
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
  mirrorValue: number,
  isMirrorService: boolean,
  itemNote: string,
) => {
  return {
    type: "ADD_ITEM",
    data: {
      itemString: itemString,
      name: name,
      chaosValue: chaosValue,
      exValue: exValue,
      mirrorValue: mirrorValue,
      isMirrorService: isMirrorService,
      itemNote: itemNote,
    },
  };
};

function uniqueArrayOfObject(array: any, keyToBeUnique: any) {
  // Filter by looking at the next objects if the key is present a second time
  return array.filter(
    (x: any, xi: any) =>
      !array
        .slice(xi + 1)
        .some((y: any) => y[keyToBeUnique] === x[keyToBeUnique]),
  );
}

export const appendBulkItem = (newItem: BulkItem) => {
  return {
    type: "APPEND_BULK_ITEM",
    data: { newItem: newItem },
  };
};

export const removeBulkItem = (itemId: string) => {
  return {
    type: "REMOVE_BULK_ITEM",
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

export const updateBulkItemNote = (itemId: string, newNote: string) => {
  return {
    type: "UPDATE_BULK_ITEM_NOTE",
    data: { itemId: itemId, newNote: newNote },
  };
};

export const updateBulkItemExValue = (itemId: string, newExValue: number) => {
  return {
    type: "UPDATE_BULK_ITEM_EX",
    data: { itemId: itemId, newExValue: newExValue },
  };
};

export const updateBulkItemMirrorValue = (
  itemId: string,
  newMirrorValue: number,
) => {
  return {
    type: "UPDATE_BULK_ITEM_MIRROR_VALUE",
    data: { itemId: itemId, newMirrorValue: newMirrorValue },
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

export const updateBulkItemSelect = (itemId: string, newSelect: boolean) => {
  return {
    type: "UPDATE_BULK_ITEM_SELECT",
    data: { itemId: itemId, newSelect: newSelect },
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
