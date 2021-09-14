import axios from "axios";
import { currencies, CurrencyType, NinjaItem } from "../../types";

const baseUrl = "https://poe.ninja/api/data";

export const getItemOverview = async (
  endpoint: string,
  league: string,
  type: string
) => {
  // accepts: Oil Incubators Scarab Fossil Resonator Essence DivinationCard
  // Prophecy Beast
  console.log(`${baseUrl}/${endpoint}?league=${league}&type=${type}`);
  const request = await axios.get(
    `${baseUrl}/${endpoint}?league=${league}&type=${type}`
  );
  return request.data;
};

export const getAllCurrencyItems = async (league: string) => {
  let items: Record<string, any> = {};
  const result = await Promise.allSettled(
    currencies.map((currency: CurrencyType) => {
      currency.ninjaEndpoint === "currencyoverview"
        ? axios
            .get(
              `${baseUrl}/${currency.ninjaEndpoint}?league=${league}&type=${currency.type}`
            )
            .then((response) => {
              items[currency.type] = response.data.lines.map(
                (currency: any) => {
                  return {
                    currencyTypeName: currency.currencyTypeName,
                    chaosEquivalent: currency.receive.value,
                  };
                }
              );
            })
        : axios
            .get(
              `${baseUrl}/${currency.ninjaEndpoint}?league=${league}&type=${currency.type}`
            )
            .then((response) => {
              items[currency.type] = response.data.lines.map(
                (currency: any) => {
                  return {
                    currencyTypeName: currency.name,
                    chaosEquivalent: currency.chaosValue,
                  };
                }
              );
            });
    })
  );

  console.log("ITEMS: ", items);

  return items;
};
