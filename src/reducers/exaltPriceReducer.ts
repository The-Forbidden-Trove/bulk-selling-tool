const initialState: any = { value: 0, defaultValue: 0 };

const exaltPriceReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_DEFAULT_EXALT_PRICE": {
      const newState = { ...state };
      newState.value = action.data.value;
      newState.defaultValue = action.data.value;
      return newState;
    }
    case "SET_EXALT_PRICE": {
      const newState = { ...state };
      newState.value = action.data.value;
      return newState;
    }
    case "RESET_EXALT_VALUE": {
      const newState = { ...state };
      newState.value = state.defaultValue;
      return newState;
    }
    default:
      return state;
  }
};

export const setExaltPrice = (value: number) => {
  return {
    type: "SET_EXALT_PRICE",
    data: { value: value },
  };
};
export const setDefaultExaltPrice = (value: number) => {
  return {
    type: "SET_DEFAULT_EXALT_PRICE",
    data: { value: value },
  };
};
export const resetExaltPrice = () => {
  return {
    type: "RESET_EXALT_VALUE",
  };
};
export default exaltPriceReducer;
