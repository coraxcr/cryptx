import { createSlice } from '@reduxjs/toolkit'
import { getCurrencyAsync } from '../api/CoinMarketCapGateway'
import { AppThunkAction } from '../store/store'

export interface Currency {
    id: number, 
    name: string,
    symbol: string,
    slug: string,
    is_active: boolean,
    is_fiat: boolean,
    circulating_supply: number,
    total_supply: number,
    max_supply: number,
    date_added: Date,
    num_market_pairs: number,
    cmc_rank: number,
    last_updated: Date,
    tags: string[],
    platform: null | {
      id:number, 
      name : string,
      slug: string,
      symbol:string,
      token_address: string
    },
    quote: {
    USD: {
      price: number,
      volume_24h: number,
      percent_change_1h: number,
      percent_change_24h: number,
      percent_change_7d: number,
      market_cap: number,
      last_updated: Date
    }
  }
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
      dispatch(setCurrency(null));
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