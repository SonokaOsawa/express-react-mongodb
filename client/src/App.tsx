import React from 'react';
import Header from './views/Header';
import Home from './views/Home';
import CartItem from './views/CartItem';
import OrderHistory from './views/OrderHistory';
import OrderComplete from './views/OrderComplete';
import ItemDetail from './views/ItemDetail';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/item-detail/:item_id' component={ItemDetail} exact />
        <Route path='/cart-item' component={CartItem} exact />
        <Route path='/order-history' component={OrderHistory} exact />
        <Route path='/order-complete' component={OrderComplete} exact />
      </Switch>
    </Router>
  );
}

export default App;
