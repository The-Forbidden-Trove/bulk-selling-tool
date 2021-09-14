import axios from "axios";
import { StashTab } from "../../types";

const baseUrl = "https://api.pathofexile.com";

export const getUserData = async (token: string) => {
  const request = await axios.get(`${baseUrl}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return request.data;
};

export const getLeagues = async () => {
  const url = "https://api.pathofexile.com/leagues?type=main&compact=1";
  const request = await axios.get(url);
  return request.data;
};

export const getAllSTashTabs = async (token: string, league: string) => {
  const request = await axios.get(`${baseUrl}/stash/${league}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return request.data;
};

export const getSTashTabItems = async (
  token: string,
  league: string,
  id: string
) => {
  const request = await axios.get(`${baseUrl}/stash/${league}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return request.data;
};

export const getSelectedTabsItems = async (
  token: string,
  league: string,
  stashes: StashTab[]
) => {
  let items: Record<string, any> = {};

  const result = await Promise.allSettled(
    stashes.map((stash: StashTab) => {
      axios
        .get(`${baseUrl}/stash/${league}/${stash.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response: any) => {
          const res = response.data.stash.items;
          res.map((item: any) => {
            items[item.baseType] = {
              id: item.id,
              name: item.baseType,
              icon: item.icon,
              stackSize: item.stackSize,
            };
          });
          //items[res.baseType] = {
          //id: res?.id,
          //name: res?.baseType,
          //icon: res?.icon,
          //stackSize: res?.stackSize,
          //};
        });
    })
  );
  return items;
};
