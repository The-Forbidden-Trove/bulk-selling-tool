import axios from "axios";
import { differenceInMinutes } from "date-fns";
import { currencies, CurrencyType, NinjaItem } from "../../types";
import { provider } from "../../index";

const baseUrl = "https://poe.ninja/api/data";

export const getAllItemTypePrices = async (league: string) => {
  let items: Record<string, NinjaItem> = {};
  await Promise.allSettled(
    currencies.map((currency: CurrencyType) => {
      const uri = `${provider}/ninjaItems?endpoint=${currency.ninjaEndpoint}&league=${league}&type=${currency.type}`;
      return axios
        .get(uri)
        .then((response) => {
          const data = response.data.lines;
          currency.ninjaEndpoint === "itemoverview"
            ? data.map((item: any) => {
                const x = {
                  name: item.name,
                  chaosValue: item.chaosValue,
                };
                items[x.name] = x;
              })
            : data.map((item: any) => {
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
        .catch((e) => console.log(e.message));
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
