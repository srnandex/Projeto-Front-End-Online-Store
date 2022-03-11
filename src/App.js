import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/shoppingCart" component={ ShoppingCart } />
        <Route exact path="/products/:id" component={ Products } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
