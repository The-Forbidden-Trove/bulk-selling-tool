import { getLeagues } from "../api/ggg/ggg";
import { fetchNinjaData, getAllItemTypePrices } from "../api/poeninja/poeninja";
import { AppDispatch, RootState } from "../store";
import { setDefaultExaltPrice } from "./exaltPriceReducer";
import { clearAllItems } from "./itemReducer";

const initialState: any | undefined = {};

const leagueReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "INIT_LEAGUES": {
      const newState = { ...state };
      return action.data;
    }
    case "CHANGE_DEFAULT_LEAGUE": {
      return { ...state, defaultLeague: action.data };
    }
    default:
      return state;
  }
};
export default leagueReducer;

export const changeDefaultLeague = (leagueName: string) => {
  return async (dispatch: AppDispatch, getState: any) => {
    const wav = getState().leagues.allLeagues.filter((x: any) => {
      return x.id === leagueName;
    });
    const defaultLeague = getState().leagues.allLeagues.filter((x: any) => {
      return x.id === leagueName;
    })[0].id;
    window.localStorage.removeItem("ninjaFetch");
    window.localStorage.removeItem("ninjaItems");

    window.localStorage.setItem(
      "defaultLeague",
      JSON.stringify({ defaultLeague: wav[0] })
    );

    fetchNinjaData(defaultLeague);

    let ninjaItems: any = window.localStorage.getItem("ninjaItems");

    console.log("new league", defaultLeague, "ninjaItems", ninjaItems);
    if (!ninjaItems) {
      ninjaItems = await getAllItemTypePrices(defaultLeague);
      console.log("A", ninjaItems);
    } else {
      console.log("B", ninjaItems);
    }

    dispatch(setDefaultExaltPrice(ninjaItems["Exalted Orb"].chaosValue));
    dispatch(clearAllItems());

    dispatch({
      type: "CHANGE_DEFAULT_LEAGUE",
      data: defaultLeague,
    });
  };
};

export const initAppState = () => {
  return async (dispatch: AppDispatch, getState: any) => {
    const defaultLeague = JSON.parse(
      window.localStorage.getItem("defaultLeague") || "{}"
    );

    let league;

    await getLeagues().then(async (res) => {
      if (!defaultLeague.hasOwnProperty("defaultLeague")) {
        window.localStorage.setItem(
          "defaultLeague",
          JSON.stringify({ defaultLeague: res[4] })
        );
        league = res[4].id;
        fetchNinjaData(res[4].id);
      } else {
        league = defaultLeague.defaultLeague.id;
        fetchNinjaData(defaultLeague?.defaultLeague?.id);
      }

      let ninjaItems: any = window.localStorage.getItem("ninjaItems");

      if (!ninjaItems) {
        ninjaItems = await getAllItemTypePrices(league);
      } else {
        ninjaItems = JSON.parse(ninjaItems);
      }

      dispatch(setDefaultExaltPrice(ninjaItems["Exalted Orb"].chaosValue));

      dispatch({
        type: "INIT_LEAGUES",
        data: {
          allLeagues: res,
          defaultLeague: league,
        },
      });
    });
  };
};
