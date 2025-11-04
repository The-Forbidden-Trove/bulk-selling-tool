import axios from "axios";
import { differenceInMinutes } from "date-fns";
import { currencies, CurrencyType, NinjaItem } from "../../types";
import { provider } from "../../index";
import { ExchangeResponse } from "./ExchangeResponse";

export const getAllItemTypePrices = async (league: string) => {
  let items: Record<string, NinjaItem> = {};
  await Promise.allSettled(
    currencies
      .filter((currency: CurrencyType) => {
        return currency.ninjaEndpoint !== "none";
      })
      .map(async (currency: CurrencyType) => {
        const uri = `${provider}/ninjaItems?endpoint=${currency.ninjaEndpoint}&league=${league}&type=${currency.type}`;

        if (currency.exchange) {
          const exchange_uri = `${provider}/exchangeItems?league=${league}&type=${currency.type}`;
          const resp = await axios.get(exchange_uri, {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          });

          const data: ExchangeResponse = resp.data;

          data.lines.forEach((item) => {
            const found_item = data.items?.find((line) => item.id === line.id);
            const name = found_item?.name ?? "";
            const chaosValue = item.primaryValue;

            items[name] = { name, chaosValue };
          });

          return;
        }

        return axios
          .get(uri, {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          })
          .then((response) => {
            const data = response.data.lines;
            currency.ninjaEndpoint === "itemoverview"
              ? data.forEach((item: any) => {
                  let name = item.name;

                  if (item.name.match(/Blighted [\w\s]+Map/)) {
                    name = `${item.baseType} ${item.mapTier}`;
                  }

                  if (item.name.match(/Blight-ravaged [\w\s]+Map/)) {
                    name = `${item.baseType} ${item.mapTier}`;
                  }

                  const x: {
                    name: string;
                    chaosValue: number;
                    levelRequired?: number;
                  } = {
                    name: name,
                    // levelRequired: item.levelRequired,
                    chaosValue: item.chaosValue,
                  };

                  if (currency.type.match("Coffin")) {
                    name = `${item.name} ${item.levelRequired}`;
                    x.levelRequired = item.levelRequired;
                    x.name = name;
                  }

                  items[x.name] = x;
                })
              : data.forEach((item: any) => {
                  if (item.hasOwnProperty("receive")) {
                    if (!item.receive.hasOwnProperty("value")) {
                    }
                  }
                  const x = {
                    name: item.currencyTypeName,
                    chaosValue: item.chaosEquivalent,
                  };
                  items[x.name] = x;
                });
          })
          .catch((e) => console.log(e));
      }),
  );

  return items;
};

const getTFTCompassData = async () => {
  const leagueLink =
    "https://raw.githubusercontent.com/The-Forbidden-Trove/tft-data-prices/master/lsc/bulk-compasses.json";
  const standardLink =
    "https://raw.githubusercontent.com/The-Forbidden-Trove/tft-data-prices/master/std/bulk-compasses.json";

  const leagueCompasses = (await axios.get(leagueLink)).data;
  const standardCompasses = (await axios.get(standardLink)).data;
  return { lsc: leagueCompasses.data, std: standardCompasses.data };
};

export const fetchNinjaData = (league: string) => {
  const time = JSON.parse(window.localStorage.getItem("ninjaFetch") || "{}");

  if (typeof time !== "number") {
    localStorage.setItem("ninjaFetch", JSON.stringify(new Date().getTime()));
    getAllItemTypePrices(league).then((res) => {
      window.localStorage.setItem("ninjaItems", JSON.stringify(res));
    });
    getTFTCompassData().then((res) => {
      window.localStorage.setItem("TFTCompassPrices", JSON.stringify(res));
    });
  } else {
    const diff = differenceInMinutes(new Date().getTime(), time);
    if (diff >= 5) {
      localStorage.setItem("ninjaFetch", JSON.stringify(new Date().getTime()));
      getAllItemTypePrices(league).then((res) => {
        window.localStorage.setItem("ninjaItems", JSON.stringify(res));
      });
    }
    getTFTCompassData().then((res) => {
      window.localStorage.setItem("TFTCompassPrices", JSON.stringify(res));
    });
  }
};
