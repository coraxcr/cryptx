import { configureStore, combineReducers, Action } from '@reduxjs/toolkit';
import currenciesSliceReducers from '../currencies/CurrenciesSlide'
import currencySliceReducers from '../currency/CurrencySlide'
import { ThunkAction } from 'redux-thunk'

const rootReducer = combineReducers({
  currencies: currenciesSliceReducers,
  currency: currencySliceReducers
})

export type RootState = ReturnType<typeof rootReducer>

const store =  configureStore({
  reducer: rootReducer
});

export type AppThunkAction = ThunkAction<void, RootState, unknown, Action<string>>

export default store