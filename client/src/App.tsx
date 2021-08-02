import React, { useEffect } from 'react';
import Header from './views/Header';
import Home from './views/Home';
import CartItem from './views/CartItem';
import OrderHistory from './views/OrderHistory';
import OrderComplete from './views/OrderComplete';
import ItemDetail from './views/ItemDetail';
import Login from './views/Login';
import Regist from './views/Regist';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RootState } from './views/store';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import {regist} from './actions/index';

function App() {
  const user = useSelector((state:RootState) => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get('/api/users')
    .then(res => {
      const userArray = res.data
      userArray.forEach((u:any) => {
        if(u.login){
          dispatch(regist(u))
        }
      })
    })
    .catch(err => {
      console.log(new Error(err))
    })
  },[dispatch])
  console.log(user)
  return (
    <Router>
      <Header/>
      {user.login ? 
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/item-detail/:item_id' component={ItemDetail} exact />
        <Route path='/cart-item' component={CartItem} exact />
        <Route path='/order-history' component={OrderHistory} exact />
        <Route path='/order-complete' component={OrderComplete} exact />
      </Switch>
      :
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/item-detail/:item_id' component={ItemDetail} exact />
        <Route path='/cart-item' component={CartItem} exact />
        <Route path='/login' component={Login} exact/>
        <Route path='/regist' component={Regist} exact/>
      </Switch>
      }
    </Router>
  );
}

export default App;
