import { combineReducers } from "redux";
import currencyTypeReducer from "./currencyTypeReducer";
import stashReducer from "./stashReducer";

const reducer = combineReducers({
  stashes: stashReducer,
  currencyTypes: currencyTypeReducer,
});

export default reducer;
