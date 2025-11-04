import { itemFilter } from "./itemFilter";

export interface ItemFilter {
  name: string;
  items: { isSelectedByDefault: boolean; name: string }[];
  icon: string;
}

export interface BulkItem {
  id: string;
  itemText: string;
  name: string;
  chaosValue: number;
  exValue: number;
  mirrorValue: number;
  isMirrorService: boolean;
  itemNote: string;
  isSelected: boolean;
  item: any;
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
  wasPriceAdjusted: boolean;
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
  levelRequired?: number;
}

export interface CurrencyType {
  type: string;
  icon: string;
  exchange: boolean;
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
    exchange: true,
  },
  {
    type: "Fragment",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQnJlYWNoL0JyZWFjaEZyYWdtZW50c0NoYW9zIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/04b5c032f4/BreachFragmentsChaos.png",
    ninjaEndpoint: "currencyoverview",
    isSelected: false,
    typeFilter: itemFilter.fragmentFilter.items,
    exchange: true,
  },
  {
    type: "Oil",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvT2lscy9Hb2xkZW5PaWwiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/69094a06e9/GoldenOil.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: itemFilter.oilFilter.items,
    exchange: true,
  },
  {
    type: "Scarab",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvU2NhcmFicy9UaWVyNFNjYXJhYkhhcmJpbmdlcnMiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/81caefbf3f/Tier4ScarabHarbingers.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: itemFilter.scarabFilter.items,
    exchange: true,
  },
  {
    type: "KalguuranRune",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvU2V0dGxlcnMvVmlsbGFnZVJ1bmUxMCIsInNjYWxlIjoxfV0/7a75e42c42/VillageRune10.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: itemFilter.runeFilter.items,
    exchange: true,
  },
  {
    type: "Fossil",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRGVsdmUvRmFjZXRlZEZvc3NpbCIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/db0aba6238/FacetedFossil.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: itemFilter.fossilFilter.items,
    exchange: true,
  },
  {
    type: "Essence",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRXNzZW5jZS9Ib3Jyb3IxIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/748d594bde/Horror1.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: itemFilter.essenceFilter.items,
    exchange: true,
  },
  {
    type: "High Essence",
    icon: "https://web.poecdn.com/image/Art/2DItems/Currency/Essence/Woe7.png?scale=1&w=1&h=1",
    ninjaEndpoint: "none",
    isSelected: false,
    typeFilter: itemFilter.highEssenceFilter.items,
    exchange: true,
  },
  {
    type: "AllflameEmber",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvTmVjcm9wb2xpcy9BbGxmbGFtZUVtYmVyc0Jhc2VDdXJyZW5jeSIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/fcf983d363/AllflameEmbersBaseCurrency.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: itemFilter.allflameFilter.items,
    exchange: true,
  },
  {
    type: "Coffin",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvTmVjcm9wb2xpcy9OZWNyb3BvbGlzQ29mZmluRmlsbGVkIiwidyI6MiwiaCI6MSwic2NhbGUiOjF9XQ/5b4214a420/NecropolisCoffinFilled.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: itemFilter.coffinsFilter.items,
    exchange: false,
  },

  {
    type: "Incubator",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvSW5jdWJhdGlvbi9JbmN1YmF0aW9uQXJtb3VyIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/637c41a730/IncubationArmour.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: itemFilter.incubatorFilter.items,
    exchange: false,
  },
  {
    type: "Artifact",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRXhwZWRpdGlvbi9CYXJ0ZXJSZWZyZXNoQ3VycmVuY3kiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/bf3e6fbe8f/BarterRefreshCurrency.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: itemFilter.artifactFilter.items,
    exchange: true,
  },
  {
    type: "BlightRavagedMap",
    icon: "https://web.poecdn.com/gen/image/WzI4LDE0LHsiZiI6IjJESXRlbXMvTWFwcy9BdGxhczJNYXBzL05ldy9EZWZpbGVkQ2F0aGVkcmFsIiwidyI6MSwiaCI6MSwic2NhbGUiOjEsIm1uIjoxMywibXQiOjE2LCJtdWIiOnRydWV9XQ/88b6aa7f13/DefiledCathedral.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: itemFilter.blightRavagedMapFilter.items,
    exchange: false,
  },
  {
    type: "BlightedMap",
    icon: "https://web.poecdn.com/gen/image/WzI4LDE0LHsiZiI6IjJESXRlbXMvTWFwcy9BdGxhczJNYXBzL05ldy9Gb3JraW5nUml2ZXIiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MSwibW4iOjExLCJtdCI6MTUsIm1iIjp0cnVlfV0/d14b4572d0/ForkingRiver.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: itemFilter.blightedMapFilter.items,
    exchange: false,
  },
  {
    type: "DeliriumOrb",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRGVsaXJpdW0vRGVsaXJpdW1PcmJTY2FyYWJzIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/fa4c5160ca/DeliriumOrbScarabs.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: itemFilter.deliriumOrbFilter.items,
    exchange: true,
  },

  {
    type: "Beast",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQmVzdGlhcnlPcmJGdWxsIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/3214b44360/BestiaryOrbFull.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: itemFilter.beastFilter.items,
    exchange: false,
  },

  {
    type: "Invitation",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQXRsYXMvTnVsbFZvaWQyIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/3c5b06022e/NullVoid2.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: itemFilter.invitationFilter.items,
    exchange: false,
  },

  {
    type: "Resonator",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRGVsdmUvUmVyb2xsMngyQyIsInciOjIsImgiOjIsInNjYWxlIjoxfV0/584267701b/Reroll2x2C.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: itemFilter.resonatorFilter.items,
    exchange: true,
  },
  {
    type: "DivinationCard",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvRGl2aW5hdGlvbi9JbnZlbnRvcnlJY29uIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/f34bf8cbb5/InventoryIcon.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: itemFilter.divinationFilter.items,
    exchange: true,
  },
  {
    type: "Tattoo",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQW5jZXN0b3JzL0NvbW1vbkRleFRhdHR0b29FcXVpcG1lbnQiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/b80711f45f/CommonDexTatttooEquipment.png",
    ninjaEndpoint: "itemoverview",
    isSelected: false,
    typeFilter: itemFilter.tattooFilter.items,
    exchange: true,
  },

  {
    type: "Contract",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvSGVpc3QvQ29udHJhY3RJdGVtMiIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/f755c71433/ContractItem2.png",
    ninjaEndpoint: "none",
    isSelected: false,
    typeFilter: itemFilter.contractFilter.items,
    exchange: false,
  },
];
