export interface WeekOfDailyPriceChanges {
  data: (number | null)[];
  totalChange: number;
}

export interface Exchange {
  id: string;
  primaryValue: number;
  volumePrimaryValue: number;
  maxVolumeCurrency: string;
  maxVolumeRate: number;
  sparkline: WeekOfDailyPriceChanges;
}

export interface ExchangeItems {
  id: string;
  name: string;
  image: string;
  category: string;
  detailsId?: string;
}

export interface ExchangeCoreItem {
  id: string;
  name: string;
  image: string;
  category: string;
  detailsId: string;
}

export interface ExchangeCore {
  primary: string;
  secondary: string;
  rates: { divine: number };
  items: ExchangeCoreItem[];
}

export interface ExchangeResponse {
  core: ExchangeCore;
  lines: Exchange[];
  items: ExchangeItems[];
}
