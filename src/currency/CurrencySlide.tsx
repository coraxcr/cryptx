import { createSlice, Action } from '@reduxjs/toolkit'
import { getCurrencyAsync } from '../CoinMarketCapGateway'
import { AppThunkAction } from '../cryptx-redux/store'

export interface Currency{
  id: number;
  name: string;
  symbol: string;
}

export interface CurrencyState{
  isLoading : boolean,
  isError: boolean,
  errorMessage: string,
  currency : Currency | null  
}

const initialState : CurrencyState = {
  isLoading:true,
  isError: false,
  errorMessage: "na",
  currency : null
}

const currencySlice = createSlice({

  name: 'currency',

  initialState,

  reducers: {    
    setCurrency(state, action) {
        state.currency = action.payload;
    },
    startLoading(state) {
      state.isLoading = true;
    },
    endLoading(state) {
      state.isLoading = false;
    },
    setIsError(state, action) {
      state.isError = action.payload;
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
      console.log(state.isError);
    }
  }
});

export const { 
  setCurrency,
  startLoading,
  endLoading,
  setIsError,
  setErrorMessage

} = currencySlice.actions;


export function fetchCurrency(id:number): AppThunkAction {
  return async (dispatch) => {
    try {
      dispatch(setIsError(false));
      dispatch(startLoading());
      const currency = await getCurrencyAsync(id);
      dispatch(setCurrency(currency));
    } catch (err) {
      dispatch(setIsError(true));
      dispatch(setErrorMessage(err.toString()));
    }finally{
      dispatch(endLoading());
    }
  }
}

export default currencySlice.reducer;