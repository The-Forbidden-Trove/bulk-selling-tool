import axios from "axios";
import { getAllSTashTabs } from "../api/ggg/ggg";
import { AppDispatch } from "../store";
import { CurrencyType, Item, NinjaItem, StashTab } from "../types";
import { unselectAllCurrencyTypes } from "./currencyTypeReducer";
import { initItemFilter } from "./itemFilterReducer";
import { addGlobalItems, removeGlobalItems } from "./itemReducer";
import { itemFilter } from "../itemFilter";

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
    if (league === undefined) return;
    const response = await getAllSTashTabs(token, league);

    const stashes: StashTab[] = response
      .filter((stash: any) => {
        return stash.type !== "MapStash";
      })
      .map((stash: any) => {
        return {
          id: stash.id,
          name: stash.name,
          colour: stash.metadata.colour,
          isHighlited: false,
          isSelected: false,
        };
      });

    dispatch(initItemFilter());

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
    const options = getState().itemOptions;

    const highlightStash: StashTab = getState().stashes.find((x: StashTab) => {
      return x.isHighlited === true;
    });

    const types: CurrencyType[] = getState().currencyTypes.filter(
      (currencyType: CurrencyType) => {
        return currencyType.isSelected === true;
      }
    );

    if (
      !highlightStash ||
      !highlightStash.hasOwnProperty("id") ||
      types.length === 0
    ) {
      return;
    }

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

        allItems.forEach((item: any) => {
          let name = item.baseType;

          if (item.baseType.match(/Blighted [\w\s]+Map/)) {
            name = `${item.baseType} ${
              //@ts-ignore
              item.properties.find((x): any => x.name === "Map Tier")
                .values[0][0]
            }`;
          } else if (item.baseType.match(/Blight-ravaged [\w\s]+Map/)) {
            name = `${item.baseType} ${
              //@ts-ignore
              item.properties.find((x): any => x.name === "Map Tier")
                .values[0][0]
            }`;
          } else if (item.baseType.includes("Contract:")) {
            name = `Contract ${item.properties[3].values[1][0]}${
              Number(item.ilvl) >= 81 ? " 81+" : ""
            }`;
          } else if (
            item.baseType.includes("Charged Compass") &&
            item.hasOwnProperty("enchantMods")
          ) {
            name = `Sextant ${item.enchantMods
              .slice(0, -1)
              .join(" ")} (${item.enchantMods[item.enchantMods.length - 1]
              .split(" ")
              .slice(0, -1)
              .join(" ")})`;
          }

          if (items[name]) {
            items[name] = {
              id: item?.id,
              name: name,
              icon: item.icon,
              shortName: generateSimpleName(name),
              w: item.w,
              h: item.h,
              maxStackSize: item.maxStackSize ? item.maxStackSize : 1,
              stackSize: item.stackSize
                ? items[name].stackSize + item.stackSize
                : items[name].stackSize + 1,
              chaosEquivalent: ninjaItems[name]
                ? ninjaItems[name].chaosValue
                : 0,
              sellValue: ninjaItems[name]
                ? roundToTwo(
                    (ninjaItems[name].chaosValue * items[name].multiplier) / 100
                  )
                : 0,
              multiplier: multiplier,
              sellMultiplier: multiplier,
              isSelected: true,
              group: generateItemGroup(name),
            };
          } else {
            items[name] = {
              id: item?.id,
              name: name,
              shortName: generateSimpleName(name),
              icon: item.icon,
              w: item.w,
              h: item.h,
              maxStackSize: item.maxStackSize ? item.maxStackSize : 1,
              stackSize: item.stackSize ? item.stackSize : 1,
              chaosEquivalent: ninjaItems[name]
                ? ninjaItems[name].chaosValue
                : 0,
              sellValue: ninjaItems[name]
                ? roundToTwo((ninjaItems[name].chaosValue * multiplier) / 100)
                : 0,
              multiplier: multiplier,
              sellMultiplier: multiplier,
              isSelected: true,
              group: generateItemGroup(name),
            };
          }
        });
      });

    let filteredItems: Record<string, Item> = {};

    const itemFilters = types.flatMap((filters: any) => {
      return filters.typeFilter;
    });

    for (const [key, value] of Object.entries(items)) {
      if (key.match(/Blighted [\w\s]+Map \d+/)) {
        if (
          itemFilters &&
          itemFilters.includes(key.split(" ").slice(0, -1).join(" "))
        ) {
          filteredItems[key] = value as Item;
        }
      } else if (key.match(/Blight-ravaged [\w\s]+Map \d+/)) {
        if (
          itemFilters &&
          itemFilters.includes(key.split(" ").slice(0, -1).join(" "))
        ) {
          filteredItems[key] = value as Item;
        }
      } else if (key.match(/Sextant (\w\s*)*\(\d*\s*uses\)/)) {
        if (itemFilters && itemFilters.includes("Sextant")) {
          filteredItems[key] = value as Item;
        }
      } else if (itemFilters && itemFilters.includes(key)) {
        filteredItems[key] = value as Item;
      }
    }

    const fragments = options.fragmentSets.filter((x: any) => {
      return x.isSelected;
    });

    if (fragments.length) {
      const fragmentSetsAllItems = fragments.flatMap((x: any) => x.items);
      for (const [key, value] of Object.entries(items)) {
        if (
          !fragmentSetsAllItems.find((x: any) =>
            x.toLocaleLowerCase().includes(items[key].name.toLocaleLowerCase())
          )
        ) {
          items[key].isSelected = false;
        }
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

const generateSimpleName = (name: string) => {
  const filters = [
    "Essence of ",
    "Delirium Orb",
    "Fragment of the",
    "Fragment of",
    "of Corruption",
    "Scroll of",
    "Sacrifice at",
    "Scroll",
    "Blessing of",
    "Fossil",
    "Splinter of",
    "Orb of",
    "Sextant",
    "Chisel",
    "Orb",
    "Scarab",
    "Resonator",
    "Incubator",
    "Oil",
    "Catalyst",
    "Breachstone",
    "Splinter",
    "Map",
    "Mortal",
    "Timeless",
    "Bauble",
    "Scroll",
    "Scrap",
    "Whetstone",
    "The",
    "Prism",
  ];

  const result: string | undefined = filters.find((filter: string) => {
    return name.includes(filter);
  });

  if (result) {
    if (result === "Splinter" && name.includes("Timeless")) {
      return name.replace(result, "").replace("Timeless", "").trim() || "";
    } else if (result === "Timeless")
      return name.replace(result, "").replace("Emblem", "").trim() || "";
    return name.replace(result, "").trim() || "";
  }
  return name;
};

const generateItemGroup = (name: string) => {
  let result = "Other";
  itemFilter.fragments.forEach((x: any) => {
    if (
      x.items.find((x: string) => {
        return x.toLowerCase().includes(name.toLocaleLowerCase());
      })
    ) {
      result = x.name;
    }
  });
  return result;
};
const roundToTwo = (value: number) => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};
