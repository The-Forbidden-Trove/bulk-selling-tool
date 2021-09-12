import { AnyAction } from "redux";
import { getAllSTashTabs } from "../api/ggg/ggg";
import { AppDispatch, RootState } from "../store";
import { StashTab } from "../types";

const initialState: StashTab[] | undefined = [];

const stashReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "INIT_STASHES": {
      return action.data;
    }
    case "HIGHLIGHT_STASH": {
      const newState = state.map((stash: StashTab) => {
        return {
          ...stash,
          isHighlited: stash.id === action.data ? true : false,
        };
      });
      return newState;
    }
    case "SELECT_STASH": {
      const newState = state.map((stash: StashTab) => {
        return {
          ...stash,
          isSelected: stash.id === action.data ? true : stash.isSelected,
        };
      });
      return newState;
    }
    case "UNSELECT_STASH": {
      const newState = state.map((stash: StashTab) => {
        return {
          ...stash,
          isSelected: stash.id === action.data ? false : stash.isSelected,
        };
      });
      return newState;
    }
    case "TOGGLE_SELECT_STASH": {
      const newState = state.map((stash: StashTab) => {
        return {
          ...stash,
          isSelected:
            stash.id === action.data ? !stash.isSelected : stash.isSelected,
        };
      });
      return newState;
    }

    default:
      return state;
  }
};

export const initStashes = (token: string, league: string) => {
  return (dispatch: AppDispatch, getState: RootState) => {
    getAllSTashTabs(token, league)
      .then((response) => {
        const stashes: StashTab[] = response.stashes.map((stash: any) => {
          return {
            id: stash.id,
            name: stash.name,
            colour: stash.metadata.colour,
            isHighlited: false,
            isSelected: false,
          };
        });
        dispatch({
          type: "INIT_STASHES",
          data: stashes,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const highlightStash = (id: string) => {
  return {
    type: "HIGHLIGHT_STASH",
    data: id,
  };
};

export const toggleSelectStash = (id: string) => {
  return {
    type: "TOGGLE_SELECT_STASH",
    data: id,
  };
};
export const selectStash = (id: string) => {
  return {
    type: "SELECT_STASH",
    data: id,
  };
};
export const unselectStash = (id: string) => {
  return {
    type: "UNCELECT_STASH",
    data: id,
  };
};
export default stashReducer;
