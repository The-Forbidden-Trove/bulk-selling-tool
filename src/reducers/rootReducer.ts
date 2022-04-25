import { combineReducers } from "redux";
import currencyTypeReducer from "./currencyTypeReducer";
import stashReducer from "./stashReducer";
import itemReducer from "./itemReducer";
import exaltPriceReducer from "./exaltPriceReducer";
import leagueReducer from "./leagueReducer";
import itemOptionsReducer from "./itemOptionsReducer";
import bulkItemReducer from "./bulkItemReducer";

const reducer = combineReducers({
  stashes: stashReducer,
  currencyTypes: currencyTypeReducer,
  items: itemReducer,
  exaltedPrice: exaltPriceReducer,
  leagues: leagueReducer,
  itemOptions: itemOptionsReducer,
  bulkItems: bulkItemReducer
});

export default reducer;
