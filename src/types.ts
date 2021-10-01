import {
  currencyFilter,
  essenceFilter,
  fossilFilter,
  fragmentFilter,
  oilFilter,
  scarabFilter,
  incubatorFilter,
  blightedMapFilter,
  deliriumOrbFilter,
} from "./itemFilter";

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

  {
    type: "Incubator",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvSW5jdWJhdGlvbi9JbmN1YmF0aW9uQXJtb3VyIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/637c41a730/IncubationArmour.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: incubatorFilter,
  },
  {
    type: "BlightedMap",
    icon: "https://web.poecdn.com/gen/image/WzI4LDE0LHsiZiI6IjJESXRlbXMvTWFwcy9BdGxhczJNYXBzL05ldy9Gb3JraW5nUml2ZXIiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MSwibW4iOjExLCJtdCI6MTUsIm1iIjp0cnVlfV0/d14b4572d0/ForkingRiver.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: blightedMapFilter,
  },
  {
    type: "DeliriumOrb",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRGVsaXJpdW0vRGVsaXJpdW1PcmJTY2FyYWJzIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/fa4c5160ca/DeliriumOrbScarabs.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: deliriumOrbFilter,
  },

  {
    type: "Beast",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQmVzdGlhcnlPcmJGdWxsIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/3214b44360/BestiaryOrbFull.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: deliriumOrbFilter,
  },
  //{
  // type: "Fossil",
  // icon: "",
  // ninjaEndpoint: "currencyoverview",
  // typeFilter: ["Chaos Orb", "Exalted Orb"],
  //},
];
