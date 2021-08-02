import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {ItemReducer} from '../reducers/item';
import {ToppingReducer} from '../reducers/topping';
import {UserReducer} from '../reducers/user';
import {LoginReducer} from '../reducers/login';
import { OrderReducer } from "../reducers/orders";
import { CartReducer } from "../reducers/cart";

const RootReducer = combineReducers({
    item: ItemReducer,
    topping: ToppingReducer,
    user: UserReducer,
    login: LoginReducer,
    order: OrderReducer,
    cart: CartReducer
})

export type RootState = ReturnType<typeof RootReducer>
const store = createStore(RootReducer, applyMiddleware(thunk))
export default store

export interface Item {
    id: number,
    name: string,
    des: string,
    pm: number,
    pl: number,
    imgpath: string,
    _id: string
}

export interface Topping {
    id: number,
    name: string,
    p: number,
    size: string,
    _id: string
}

export interface User {
    email: string,
    pass: string,
    login: boolean,
    _id: string,
    userid: number,
    name?: string,
    zipcode?: string,
    address?: string,
    tel?: string,
    card?: string,
}

export interface Order {
    _id?: string,
    orderid?: number,
    name?: string,
    email?: string,
    zipcode?: string,
    address?: string,
    tel?: string,
    deliverydate?: string, 
    deliverytime?: string,
    paymethod?: number,
    card?: string,
    orderdate?: string,
    status?: number,
    totalprice: number,
    iteminfo:[{
        _id: string,
        price: number,
        buynum: number,
        itemid: number,
        size: string,
        toppings:[{
            _id?: string,
            topid: number
        }]
    }]
}