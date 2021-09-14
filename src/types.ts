import {
  currencyFilter,
  essenceFilter,
  fossilFilter,
  fragmentFilter,
  oilFilter,
  scarabFilter,
} from "./itemFilter";

export interface Item {
  id: string;
  icon: string;
  typeLine?: string;
  baseType: string;
  stackSize?: number;
  maxStackSize?: number;
  w?: number;
  h?: number; // might be usefull if we want to calculate something like a total
  // inventories needed to trade all items
}

export interface StashTab {
  id: string;
  name: string;
  colour: string;
  isHighlited: boolean;
  isSelected: boolean;
  assignedTypes: {}[];
  defaultMultiplier?: number;
  isSpecial?: boolean;
  items?: Record<string, Item[]>;
  filteredItems?: Record<string, Item[]>;
}

export interface NinjaItem {
  currencyTypeName: string;
  chaosEquivalent: number;
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
    typeFilter: currencyFilter,
  },
  {
    type: "Fragment",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQnJlYWNoL0JyZWFjaEZyYWdtZW50c0NoYW9zIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/04b5c032f4/BreachFragmentsChaos.png",
    ninjaEndpoint: "currencyoverview",
    isSelected: false,
    typeFilter: fragmentFilter,
  },
  {
    type: "Oil",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvT2lscy9Hb2xkZW5PaWwiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/69094a06e9/GoldenOil.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: oilFilter,
  },
  {
    type: "Scarab",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvU2NhcmFicy9UaWVyNFNjYXJhYkhhcmJpbmdlcnMiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/81caefbf3f/Tier4ScarabHarbingers.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: scarabFilter,
  },
  {
    type: "Fossil",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRGVsdmUvRmFjZXRlZEZvc3NpbCIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/db0aba6238/FacetedFossil.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: fossilFilter,
  },
  {
    type: "Essence",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRXNzZW5jZS9Ib3Jyb3IxIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/748d594bde/Horror1.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: essenceFilter,
  },
  //{
  // type: "Fossil",
  // icon: "",
  // ninjaEndpoint: "currencyoverview",
  // typeFilter: ["Chaos Orb", "Exalted Orb"],
  //},
];
