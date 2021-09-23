import axios from "axios";
import { AnyAction } from "redux";
import { getAllSTashTabs } from "../api/ggg/ggg";
import { AppDispatch, RootState } from "../store";
import { CurrencyType, Item, NinjaItem, StashTab } from "../types";
import { unselectAllCurrencyTypes } from "./currencyTypeReducer";
import { setDefaultExaltPrice } from "./exaltPriceReducer";
import { addGlobalItems, removeGlobalItems } from "./itemReducer";

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
      const newState: StashTab[] = state.map((stash: StashTab) => {
        return {
          ...stash,
          isHighlited: stash.id === action.data ? !stash.isHighlited : false,
        };
      });
      return newState;
    }
    case "SELECT_STASH": {
      const newState: StashTab[] = state.map((stash: StashTab) => {
        return stash.isHighlited
          ? {
              ...stash,
              isSelected: true,
              isHighlited: false,
              defaultMultiplier: action.data.multiplier,
              assignedTypes: action.data.types.map((type: CurrencyType) => {
                return {
                  type: type.type,
                  icon: type.icon,
                  typeFilter: type.typeFilter,
                };
              }),
            }
          : { ...stash };
      });
      return newState;
    }
    case "INIT_STASH_ITEMS": {
      const newState = state.map((stash: StashTab) => {
        return stash.id === action.data.id
          ? {
              ...stash,
              filteredItems: action.data.filteredItems,
              items: action.data.items,
            }
          : stash;
      });
      return newState;
    }
    case "UNSELECT_STASH": {
      const newState = state.map((stash: StashTab) => {
        return stash.id === action.data.id
          ? {
              ...stash,
              isSelected: false,
              isHighlited: false,
              defaultMultiplier: undefined,
              filteredItems: undefined,
              items: undefined,
              assignedTypes: undefined,
            }
          : { ...stash };
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
    const stashes: StashTab[] = response.stashes
      .filter((stash: any) => {
        return stash.type !== "MapStash";
      })
      .filter((stash: any) => {
        return !stash.name.toLowerCase().includes("Remove-only".toLowerCase());
      })
      .map((stash: any) => {
        return {
          id: stash.id,
          name: stash.name,
          colour: stash.metadata.colour,
          //isSpecial: false,
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

export const selectStash = (
  token: string,
  league: string,
  multiplier: number,
  ninjaItems: Record<string, NinjaItem>
) => {
  return async (dispatch: AppDispatch, getState: any) => {
    const highlightStash: StashTab = getState().stashes.find((x: StashTab) => {
      return x.isHighlited === true;
    });

    const types: CurrencyType[] = getState().currencyTypes.filter(
      (currencyType: CurrencyType) => {
        return currencyType.isSelected === true;
      }
    );

    const exPrice: number = ninjaItems["Exalted Orb"].chaosValue;

    dispatch({
      type: "SELECT_STASH",
      data: {
        types: types,
        multiplier: multiplier,
      },
    });
    dispatch(unselectAllCurrencyTypes());

    let items: Record<string, Item> = {};

    await axios
      .get(`https://api.pathofexile.com/stash/${league}/${highlightStash.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: any) => {
        const allItems = response.data.stash.items;

        allItems.map((item: any) => {
          if (items[item.baseType]) {
            items[item.baseType] = {
              id: item?.id,
              name: item.baseType,
              icon: item.icon,
              w: item.w,
              h: item.h,
              maxStackSize: item.maxStackSize ? item.maxStackSize : 1,
              stackSize: item.stackSize
                ? items[item.baseType].stackSize + item.stackSize
                : items[item.baseType].stackSize + 1,
              chaosEquivalent: ninjaItems[item.baseType]
                ? ninjaItems[item.baseType].chaosValue
                : 0,
              sellValue: ninjaItems[item.baseType]
                ? ninjaItems[item.baseType].chaosValue
                : 0,
              multiplier: multiplier,
              sellMultiplier: multiplier,
              isSelected: true,
            };
          } else {
            items[item.baseType] = {
              id: item?.id,
              name: item.baseType,
              icon: item.icon,
              w: item.w,
              h: item.h,
              maxStackSize: item.maxStackSize ? item.maxStackSize : 1,
              stackSize: item.stackSize ? item.stackSize : 1,
              chaosEquivalent: ninjaItems[item.baseType]
                ? ninjaItems[item.baseType].chaosValue
                : 0,
              sellValue: ninjaItems[item.baseType]
                ? ninjaItems[item.baseType].chaosValue
                : 0,
              multiplier: multiplier,
              sellMultiplier: multiplier,
              isSelected: true,
            };
          }
        });
      });

    let filteredItems: Record<string, Item> = {};

    const itemFilters = types.flatMap((filters: any) => {
      return filters.typeFilter;
    });

    for (const [key, value] of Object.entries(items)) {
      if (itemFilters && itemFilters.includes(key)) {
        filteredItems[key] = value as Item;
      }
    }

    dispatch(initStashItems(items, filteredItems, highlightStash.id));

    dispatch(addGlobalItems(filteredItems));
  };
};

export const initStashItems = (items: any, filteredItems: any, id: string) => {
  return {
    type: "INIT_STASH_ITEMS",
    data: { items: items, filteredItems: filteredItems, id: id },
  };
};

export const unselectStash = (id: string) => {
  return async (dispatch: AppDispatch, getState: any) => {
    const items: Record<string, Item> = getState().stashes.find(
      (x: StashTab) => {
        return x.id === id;
      }
    ).filteredItems;

    dispatch({
      type: "UNSELECT_STASH",
      data: { id: id },
    });
    dispatch(removeGlobalItems(items));
  };
};

export const highlightStash = (id: string) => {
  return {
    type: "HIGHLIGHT_STASH",
    data: id,
  };
};

export default stashReducer;
