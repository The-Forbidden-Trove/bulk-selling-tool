import { applyMiddleware, createStore } from "redux";
import reducer from "./reducers/rootReducer";
import thunk from "redux-thunk";

const store = createStore(reducer, applyMiddleware(thunk));

//
store.subscribe(() => console.log("STATE: ", store.getState()));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
