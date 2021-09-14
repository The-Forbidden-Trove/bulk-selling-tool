import { AnyAction } from "redux";
import { AppDispatch, RootState } from "../store";
import { CurrencyType } from "../types";

const initialState: CurrencyType[] | undefined = [];

const currencyTypeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "INIT_CURRENCIES": {
      return action.data;
    }
    case "TOGGLE_SELECT": {
      const newState = state.map((currencyType: CurrencyType) => {
        return {
          ...currencyType,
          isSelected:
            currencyType.type === action.data
              ? !currencyType.isSelected
              : currencyType.isSelected,
        };
      });
      return newState;
    }
    case "UNSELECT_ALL": {
      const newState = state.map((currencyType: CurrencyType) => {
        return {
          ...currencyType,
          isSelected: false,
        };
      });
      return newState;
    }

    default:
      return state;
  }
};
export const toggleSelectCurrency = (type: string) => {
  return {
    type: "TOGGLE_SELECT",
    data: type,
  };
};

export const initCurrencies = (data: CurrencyType[]) => {
  return {
    type: "INIT_CURRENCIES",
    data: data,
  };
};
export const unselectAllCurrencyTypes = () => {
  return {
    type: "UNSELECT_ALL",
  };
};
export default currencyTypeReducer;
