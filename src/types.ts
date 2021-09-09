export interface Item {
  id: string;
  icon: string;
  typeLine: string;
  baseType: string;
  stackSize: number;
  maxStackSize: number;
  w: number;
  h: number; // might be usefull if we want to calculate something like a total inventories needed to trade all items
}

export interface StashTab {
  id: string;
  name: string;
  type: string;
  index: number;
  metadata: {
    public: boolean;
    colour: string;
  };
  items?: Item[];
}

export interface CurrencyType {
  type: string;
  icon: string;
  typeFilter: string; // it is supposed to be a usefull to allow us to filter out items, trying to avoid listing all items one by one
  // because with ro example essences it would be no fun
}
