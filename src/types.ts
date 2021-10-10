import { itemFilter } from "./itemFilter";

export interface ItemFilter {
  name: string;
  items: { isSelectedByDefault: boolean; name: string }[];
  icon: string;
}

export interface Item {
  id: string;
  icon: string;
  name: string;
  shortName?: string;
  multiplier: number;
  sellMultiplier: number;
  chaosEquivalent?: number;
  mapTier?: number;
  totalValue?: number;
  sellValue?: number;
  isSelected: boolean;
  stackSize: number;
  sellStackSize?: number;
  maxStackSize?: number;
  group: string;
  w: number;
  h: number; // might be usefull if we want to calculate something like a total
  // inventories needed to trade all items
}

export interface StashTab {
  id: string;
  name: string;
  colour: string;
  isHighlited: boolean;
  isSelected: boolean;
  assignedTypes: CurrencyType[];
  defaultMultiplier?: number;
  isSpecial?: boolean;
  items: Record<string, Item> | undefined;
  filteredItems: Record<string, Item> | undefined;
}

export interface NinjaItem {
  name: string;
  chaosValue: number;
}

export interface CurrencyType {
  type: string;
  icon: string;
  ninjaEndpoint: string;
  isSelected: boolean;
  typeFilter: string[]; // it is supposed to be a usefull to allow us to filter out
  // items, trying to avoid listing all items one by one
  // because with ro example essences it would be no fun
}
export const currencies: CurrencyType[] = [
  {
    type: "Currency",
    icon: "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?scale=1&w=1&h=1",
    ninjaEndpoint: "currencyoverview",
    isSelected: false,
    typeFilter: itemFilter.currencyFilter.items,
  },
  {
    type: "Fragment",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQnJlYWNoL0JyZWFjaEZyYWdtZW50c0NoYW9zIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/04b5c032f4/BreachFragmentsChaos.png",
    ninjaEndpoint: "currencyoverview",
    isSelected: false,
    typeFilter: itemFilter.fragmentFilter.items,
  },
  {
    type: "Oil",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvT2lscy9Hb2xkZW5PaWwiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/69094a06e9/GoldenOil.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: itemFilter.oilFilter.items,
  },
  {
    type: "Scarab",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvU2NhcmFicy9UaWVyNFNjYXJhYkhhcmJpbmdlcnMiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/81caefbf3f/Tier4ScarabHarbingers.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: itemFilter.scarabFilter.items,
  },
  {
    type: "Fossil",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRGVsdmUvRmFjZXRlZEZvc3NpbCIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/db0aba6238/FacetedFossil.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: itemFilter.fossilFilter.items,
  },
  {
    type: "Essence",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRXNzZW5jZS9Ib3Jyb3IxIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/748d594bde/Horror1.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: itemFilter.essenceFilter.items,
  },

  {
    type: "Incubator",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvSW5jdWJhdGlvbi9JbmN1YmF0aW9uQXJtb3VyIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/637c41a730/IncubationArmour.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: itemFilter.incubatorFilter.items,
  },
  {
    type: "BlightedMap",
    icon: "https://web.poecdn.com/gen/image/WzI4LDE0LHsiZiI6IjJESXRlbXMvTWFwcy9BdGxhczJNYXBzL05ldy9Gb3JraW5nUml2ZXIiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MSwibW4iOjExLCJtdCI6MTUsIm1iIjp0cnVlfV0/d14b4572d0/ForkingRiver.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: itemFilter.blightedMapFilter.items,
  },
  {
    type: "DeliriumOrb",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRGVsaXJpdW0vRGVsaXJpdW1PcmJTY2FyYWJzIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/fa4c5160ca/DeliriumOrbScarabs.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: itemFilter.deliriumOrbFilter.items,
  },

  {
    type: "Beast",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQmVzdGlhcnlPcmJGdWxsIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/3214b44360/BestiaryOrbFull.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: itemFilter.deliriumOrbFilter.items,
  },

  {
    type: "Resonator",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRGVsdmUvUmVyb2xsMngyQyIsInciOjIsImgiOjIsInNjYWxlIjoxfV0/584267701b/Reroll2x2C.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: itemFilter.resonatorFilter.items,
  },

  {
    type: "Prophecy",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvUHJvcGhlY3lPcmJSZWQiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/c45e04700d/ProphecyOrbRed.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: itemFilter.prophecyFilter.items,
  },
  {
    type: "DivinationCard",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvRGl2aW5hdGlvbi9JbnZlbnRvcnlJY29uIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/f34bf8cbb5/InventoryIcon.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: itemFilter.divinationFilter.items,
  },
];
