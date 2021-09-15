import axios from "axios";
import { AnyAction } from "redux";
import { getAllSTashTabs } from "../api/ggg/ggg";
import { AppDispatch, RootState } from "../store";
import { CurrencyType, Item, StashTab } from "../types";

const initialState: StashTab[] | undefined = [];

const stashReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "INIT_STASHES": {
      return action.data;
    }
    case "INIT_ITEMS": {
      return action.data;
    }
    case "HIGHLIGHT_STASH": {
      const newState = state.map((stash: StashTab) => {
        return {
          ...stash,
          isHighlited: stash.id === action.data ? !stash.isHighlited : false,
        };
      });
      return newState;
    }
    case "SELECT_STASH": {
      const newState = state.map((stash: StashTab) => {
        return {
          ...stash,
          isSelected: stash.isHighlited ? true : stash.isSelected,
          isHighlited: false,
          defaultMultiplier: action.data.multiplier,
          assignedTypes: stash.isSelected
            ? stash.assignedTypes
            : action.data.types.map((type: CurrencyType) => {
                return {
                  type: type.type,
                  icon: type.icon,
                  typeFilter: type.typeFilter,
                };
              }),
        };
      });
      return newState;
    }
    case "INIT_STASH_ITEMS": {
      let items: Record<string, any> = [];

      const newStash = state.find((stash: StashTab) => {
        return stash.id === action.data.id;
      });

      const itemFilters = newStash?.assignedTypes.flatMap((filters: any) => {
        return filters.typeFilter;
      });

      for (const [key, value] of Object.entries(action.data.items)) {
        if (itemFilters && itemFilters.includes(key)) {
          items[key] = value;
        }
      }
      const newState = state.map((stash) => {
        return stash.id === action.data.id
          ? { ...newStash, filteredItems: items }
          : stash;
      });
      return newState;
    }
    case "UNSELECT_STASH": {
      const newState = state.map((stash: StashTab) => {
        return {
          ...stash,
          isSelected: stash.id === action.data ? false : stash.isSelected,
          assignedTypes:
            stash.id === action.data ? undefined : stash.assignedTypes,
          defaultMultiplier: undefined,
          filteredItems: undefined,
        };
      });
      return newState;
    }

    case "TOGGLE_SELECT_STASH": {
      const newState = state.map((stash: StashTab) => {
        return {
          ...stash,
          isSelected:
            stash.id === action.data ? !stash.isSelected : stash.isSelected,
        };
      });
      return newState;
    }

    default:
      return state;
  }
};

export const initStashes = (token: string, league: string) => {
  return async (dispatch: AppDispatch, getState: any) => {
    const response = await getAllSTashTabs(token, league);
    const stashes: StashTab[] = response.stashes.map((stash: any) => {
      return {
        id: stash.id,
        name: stash.name,
        colour: stash.metadata.colour,
        isHighlited: false,
        isSelected: false,
      };
    });

    dispatch({
      type: "INIT_STASHES",
      data: stashes,
    });
  };
};

export const selectStash = (types: CurrencyType[], multiplier: number) => {
  return {
    type: "SELECT_STASH",
    data: {
      types: types,
      multiplier: multiplier,
    },
  };
};

export const initStashItems = (
  token: string,
  league: string,
  stash: StashTab,
  multiplier: number
) => {
  return async (dispatch: AppDispatch, getState: any) => {
    let items: Record<string, any> = [];
    const res = await axios
      .get(`https://api.pathofexile.com/stash/${league}/${stash.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: any) => {
        const allItems = response.data.stash.items;

        allItems.map((item: any) => {
          items[item?.baseType] = {
            id: item?.id,
            name: item?.baseType,
            icon: item?.icon,
            stackSize: item?.stackSize,
            chaosEquivalent: 10,
            multiplier: multiplier,
          };
        });
      });

    dispatch({
      type: "INIT_STASH_ITEMS",
      data: { items: items, id: stash.id },
    });
  };
};

export const unselectStash = (id: string) => {
  return {
    type: "UNSELECT_STASH",
    data: id,
  };
};

export const highlightStash = (id: string) => {
  return {
    type: "HIGHLIGHT_STASH",
    data: id,
  };
};

export const toggleSelectStash = (id: string) => {
  return {
    type: "TOGGLE_SELECT_STASH",
    data: id,
  };
};
export default stashReducer;
