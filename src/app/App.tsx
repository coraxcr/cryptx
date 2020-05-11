import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import './App.css';
import Currencies   from './currencies';
import Currency from './currency';


function App() {
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
