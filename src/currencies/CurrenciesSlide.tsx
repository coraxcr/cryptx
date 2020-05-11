import { createSlice, Action } from '@reduxjs/toolkit'
import { getLatestCurrenciesAsync } from '../CoinMarketCapGateway'
import { AppThunkAction } from '../cryptx-redux/store'

export interface CurrencySummary {
  id: number;
  name: string;
  symbol: string;
  market_cap: number;
  price: number;
}

export interface CurrenciesState  {
  direction : 'asc' | 'desc',
  field : string,
  pageNumber : number,
  rowsPerPage :  number,
  numberOfRows : number, 
  isLoading : boolean, 
  isError: boolean,
  errorMessage: string,
  currencies : [
  ]
}

const initialState : CurrenciesState  = {
  direction : 'asc',
  field : 'name',
  pageNumber : 0,
  rowsPerPage :  25,
  numberOfRows : 200, 
  isLoading : true, 
  isError: false,
  errorMessage: "na",
  currencies : [
  ]
}

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {    
    setDirection(state, action) {
        state.direction = action.payload;
    },
    setField(state, action) {
        state.field = action.payload;
    },
    setCurrencies(state, action) {
      state.currencies = action.payload;
    },
    setPageNumber(state, action) {
      state.pageNumber = action.payload;
    },
    startLoading(state) {
      state.isLoading = true;
    },
    endLoading(state) {
      state.isLoading = false;
    },
    setRowsPerPage(state, action) {
      state.rowsPerPage = action.payload;
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
  setDirection,
  setField,
  setCurrencies,
  setPageNumber,
  startLoading,
  endLoading,
  setRowsPerPage,
  setIsError,
  setErrorMessage, 
} = currenciesSlice.actions;

export function fetchCurrencies(start:number, limit:number, fieldName:string, direction:"asc"|"desc"): AppThunkAction {
  return async (dispatch) => {
    try {
      dispatch(setIsError(false));
      dispatch(startLoading());
      const currencies = await getLatestCurrenciesAsync(start, limit, fieldName, direction);
      dispatch(setPageNumber(0));
      dispatch(setCurrencies(currencies));
    } catch (err) {
      dispatch(setIsError(true));
      dispatch(setErrorMessage(err.toString()))
      dispatch(setCurrencies([]));
    }finally{
      dispatch(endLoading());
    }
  }
}

export default currenciesSlice.reducer;