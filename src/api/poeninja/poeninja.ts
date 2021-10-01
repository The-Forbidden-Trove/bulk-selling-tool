import axios from "axios";
import { differenceInMinutes } from "date-fns";
import { currencies, CurrencyType, NinjaItem } from "../../types";
import { provider } from "../../index";

export const getAllItemTypePrices = async (league: string) => {
  let items: Record<string, NinjaItem> = {};
  await Promise.allSettled(
    currencies.map((currency: CurrencyType) => {
      const uri = `${provider}/ninjaItems?endpoint=${currency.ninjaEndpoint}&league=${league}&type=${currency.type}`;
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
                const name = item.name.match(/Blighted [\w\s]+Map/)
                  ? `${item.baseType} ${item.mapTier}`
                  : item.name;

                const x = {
                  name: name,
                  chaosValue: item.chaosValue,
                };
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
    })
  );

  return items;
};

export const fetchNinjaData = (league: string) => {
  const time = JSON.parse(window.localStorage.getItem("ninjaFetch") || "{}");

  if (typeof time !== "number") {
    localStorage.setItem("ninjaFetch", JSON.stringify(new Date().getTime()));
    getAllItemTypePrices(league).then((res) => {
      window.localStorage.setItem("ninjaItems", JSON.stringify(res));
    });
  } else {
    const diff = differenceInMinutes(new Date().getTime(), time);
    if (diff >= 5) {
      localStorage.setItem("ninjaFetch", JSON.stringify(new Date().getTime()));
      getAllItemTypePrices(league).then((res) => {
        window.localStorage.setItem("ninjaItems", JSON.stringify(res));
      });
    }
  }
};
