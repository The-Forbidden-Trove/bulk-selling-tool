import { itemFilter } from "../itemFilter";
import { AppDispatch } from "../store";
import { Item } from "../types";
import { selectItem, unselectAllItems, unselectItem } from "./itemReducer";

interface FragmentSet {
  name: string;
  items: string[];
  icon: string;
  isSelected: boolean;
}
interface Options {
  search: string;
  sorters: { key: keyof Item; order?: "asc" | "desc" }[];
  stashLoading: "loading" | "idle" | "failed";
  fragmentSets: FragmentSet[];
  minValue: number;
  minTotalValue: number;
  minStack: number;
}

const initialState: Options = {
  search: "",
  sorters: [{ key: "totalValue", order: "desc" }],
  stashLoading: "idle",
  fragmentSets: itemFilter.fragments.map((type: any) => {
    return { ...type, isSelected: false };
  }),
  minValue: 0,
  minStack: 0,
  minTotalValue: 0,
};

const itemOptionsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_ITEM_OPTIONS_SEARCH":
      return { ...state, search: action.data.search };
    case "TOGGLE_ITEM_OPTIONS_SET": {
      const newState = { ...state };
      newState.fragmentSets.map((x: FragmentSet) => {
        return x.name === action.data.setName
          ? { ...x, isSelected: !x.isSelected }
          : x;
      });

      const count = newState.fragmentSets.filter((x: FragmentSet) => {
        return x.isSelected === true;
      });

      if (count) {
        newState.sorters.unshift({ key: "isSelected", order: "asc" });
      } else {
        newState.sorters.filter((x: any) => {
          return x.key !== "isSelected";
        });
      }
      return newState;
    }

    case "SELECT_ITEM_OPTIONS_SET": {
      const newState = { ...state };
      newState.fragmentSets = newState.fragmentSets.map((x: FragmentSet) => {
        return x.name === action.data.setName
          ? { ...x, isSelected: true }
          : { ...x };
      });
      if (
        !newState.sorters.find((x) => {
          return x.key === "isSelected";
        })
      ) {
        newState.sorters.unshift({ key: "group", order: "asc" });
        newState.sorters.unshift({ key: "isSelected", order: "desc" });
      }
      return newState;
    }
    case "UNSELECT_ITEM_OPTIONS_SET": {
      const newState = { ...state };
      newState.fragmentSets = newState.fragmentSets.map((x: FragmentSet) => {
        return x.name === action.data.setName
          ? { ...x, isSelected: false }
          : { ...x };
      });
      const count = newState.fragmentSets.filter((x: any) => {
        return x.isSelected;
      }).length;
      if (count === 0) {
        newState.sorters = newState.sorters.filter((x: any) => {
          return x.key !== "isSelected" && x.key !== "group";
        });
      }
      return newState;
    }

    case "SET_LOADING_STATUS": {
      const newState = { ...state };
      newState.stashLoading = "loading";
      return newState;
    }

    case "SET_IDLE_STATUS": {
      const newState = { ...state };
      newState.stashLoading = "idle";
      return newState;
    }
    default:
      return state;
  }
};

export const setItemOptionsSearch = (search: string) => {
  return {
    type: "SET_ITEM_OPTIONS_SEARCH",
    data: { search: search },
  };
};

export const toggleItemOptionsSet = (setName: string) => {
  return {
    type: "TOGGLE_ITEM_OPTIONS_SET",
    data: { setName: setName },
  };
};

export const setLoadingStatus = () => {
  return {
    type: "SET_LOADING_STATUS"
  };
};

export const setIdleStatus = () => {
  return {
    type: "SET_IDLE_STATUS"
  };
};

export const selectItemOptionsSet = (setName: string) => {
  return async (dispatch: AppDispatch, getState: any) => {
    dispatch(unselectAllItems());
    const sets = getState().itemOptions.fragmentSets.filter(
      (x: any) => x.isSelected
    );
    sets.forEach((set: any) => {
      set.items.forEach((x: any) => {
        dispatch(selectItem(x));
      });
    });

    dispatch({
      type: "SELECT_ITEM_OPTIONS_SET",
      data: { setName: setName },
    });
  };
};

export const unselectItemOptionsSet = (setName: string) => {
  return async (dispatch: AppDispatch, getState: any) => {
    const set = getState().itemOptions.fragmentSets.find(
      (x: any) => x.name === setName
    );
    set.items.forEach((x: any) => {
      dispatch(unselectItem(x));
    });

    dispatch({
      type: "UNSELECT_ITEM_OPTIONS_SET",
      data: { setName: setName },
    });
  };
};
export default itemOptionsReducer;
