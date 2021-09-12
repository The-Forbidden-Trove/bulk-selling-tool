import { combineReducers } from "redux";
import stashReducer from "./stashReducer";

const reducer = combineReducers({ stashes: stashReducer });

export default reducer;
