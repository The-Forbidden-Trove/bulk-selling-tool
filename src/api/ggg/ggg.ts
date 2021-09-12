import axios from "axios";

const baseUrl = "https://api.pathofexile.com";
const league = "expedition";

export const getUserData = async (token: string) => {
  const request = await axios.get(`${baseUrl}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getAllSTashTabs = async (token: string) => {
  const request = await axios.get(`${baseUrl}/stash/${league}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return request.data;
};

export const getSTashTab = async (token: string, id: string) => {
  const request = await axios.get(`${baseUrl}/stash/${league}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return request.data;
};
