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
  try {
    const url = `${baseUrl}/stash/${league}`;
    const request = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return request.data.stashes
      .map((x: any) => {
        if (x.hasOwnProperty("children")) {
          return x.children;
        }
        return x;
      })
      .flat();
  } catch (error) {
    console.log(error);
    return Promise.reject(400);
  }
};

export const getSTashTabItems = async (
  token: string,
  league: string,
  id: string
) => {
  const request = await axios.get(`${baseUrl}/stash/${league}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,

      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return request.data;
};

export const getSelectedTabsItems = async (
  token: string,
  league: string,
  stashes: StashTab[]
) => {
  let items: Record<string, any> = [];

  await Promise.allSettled(
    stashes.map((stash: StashTab) => {
      return axios
        .get(`${baseUrl}/stash/${league}/${stash.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response: any) => {
          const res = response.data.stash.items;
          res.forEach((item: any) => {
            items[item.baseType] = {
              id: item.id,
              name: item.baseType,
              icon: item.icon,
              stackSize: item.stackSize,
            };
          });
        });
    })
  );
  return items;
};
