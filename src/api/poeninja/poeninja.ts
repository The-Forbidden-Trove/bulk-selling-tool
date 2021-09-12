import axios from "axios";

const baseUrl = "https://poe.ninja/api/data";
const league = "expedition";

export const getCurrencyOverview = async (type: string) => {
  // accepts: Fragment and Currency
  const request = await axios.get(
    `${baseUrl}/currencyoverview?league=${league}&type=${type}`
  );
  return request.data;
};

export const getItemOverview = async (type: string) => {
  // accepts: Oil Incubators Scarab Fossil Resonator Essence DivinationCard Prophecy Beast
  const request = await axios.get(
    `${baseUrl}/itemoverview?league=${league}&type=${type}`
  );
  return request.data;
};
