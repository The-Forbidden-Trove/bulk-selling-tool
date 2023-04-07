import { getLeagues } from "../api/ggg/ggg";
import { fetchNinjaData, getAllItemTypePrices } from "../api/poeninja/poeninja";
import { AppDispatch } from "../store";
import { setDefaultExaltPrice } from "./exaltPriceReducer";
import { initItemFilter } from "./itemFilterReducer";
import { clearAllItems } from "./itemReducer";
import { unselectAllStashes } from "./stashReducer";

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

    if (!ninjaItems) {
      ninjaItems = await getAllItemTypePrices(defaultLeague);
    } else {
    }

    if (ninjaItems.hasOwnProperty("Divine Orb")) {
      dispatch(setDefaultExaltPrice(ninjaItems["Divine Orb"].chaosValue));
    } else {
      window.localStorage.removeItem("ninjaItems");
      window.localStorage.removeItem("ninjaFetch");
    }

    dispatch(clearAllItems());
    dispatch(unselectAllStashes());

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

    await getLeagues().then(async (response) => {
      const res = response.filter((x: any) => {
        return (
          !x.id.toLowerCase().includes("solo self-found") &&
          !x.id.toLowerCase().includes("ssf") &&
          !x.id.toLowerCase().includes("royale")
        );
      });

      //const res = [
      //{
      //id: "Standard",
      //realm: "pc",
      //url: "https://www.pathofexile.com/forum/view-thread/71278",
      //startAt: "2013-01-23T21:00:00Z",
      //endAt: null,
      //},
      //{
      //id: "Hardcore",
      //realm: "pc",
      //url: "https://www.pathofexile.com/forum/view-thread/71276",
      //startAt: "2013-01-23T21:00:00Z",
      //endAt: null,
      //},
      //];

      if (!defaultLeague.hasOwnProperty("defaultLeague")) {
        window.localStorage.setItem(
          "defaultLeague",
          JSON.stringify({ defaultLeague: res[2] || "Standard" })
        );
        league = res[2] ? res[2].id : "Standard";
        fetchNinjaData(league);
      } else {
        if (
          defaultLeague.defaultLeague.hasOwnProperty("id") &&
          res.filter((x: any) => {
            return x.id
              .toLowerCase()
              .includes(defaultLeague.defaultLeague.id.toLowerCase());
          }).length
        ) {
          league = defaultLeague.defaultLeague.id;
        } else if (
          !defaultLeague.defaultLeague.hasOwnProperty("id") &&
          res.filter((x: any) => {
            return x.id
              .toLowerCase()
              .includes(defaultLeague.defaultLeague.toLowerCase());
          }).length
        ) {
          league = defaultLeague.defaultLeague;
        } else {
          league = "Standard";
          window.localStorage.setItem(
            "defaultLeague",
            JSON.stringify({ defaultLeague: "Standard" })
          );
        }
        fetchNinjaData(league);
      }

      let ninjaItems: any = window.localStorage.getItem("ninjaItems");

      if (!ninjaItems) {
        ninjaItems = await getAllItemTypePrices(league);
      } else {
        ninjaItems = JSON.parse(ninjaItems);
      }

      // if poeninja fails
      if (ninjaItems.hasOwnProperty("Divine Orb")) {
        dispatch(setDefaultExaltPrice(ninjaItems["Divine Orb"].chaosValue));
      } else {
        window.localStorage.removeItem("ninjaItems");
        window.localStorage.removeItem("ninjaFetch");
      }

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
