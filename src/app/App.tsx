import React, {useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store'
import {
  BrowserRouter,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import Currencies   from './currencies';
import Currency from './currency';
import { fetchCurrencies } from './currencies/CurrenciesSlide';


function App() {

  const {
    direction,
    field,
    numberOfRows,
  } = useSelector((state: RootState) => state.currencies);

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(fetchCurrencies(1, numberOfRows, field, direction));

  }, [dispatch, numberOfRows, field, direction]);


  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={ Currencies } />
          <Route exact path='/currency/:id' component={ WrapCurrency } />
          <Route path='*' component={ Currencies } />
        </Switch>
      </BrowserRouter>
      </main>
    </div>
  );
}

function WrapCurrency(){

  let { id } = useParams();
  
  return <Currency id={Number(id)}></Currency>

}

export default App;
