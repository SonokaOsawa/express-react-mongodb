import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {ItemReducer} from '../reducers/item';
import {ToppingReducer} from '../reducers/topping';
import {UserReducer} from '../reducers/user';
import {LoginReducer} from '../reducers/login';

const RootReducer = combineReducers({
    item: ItemReducer,
    topping: ToppingReducer,
    user: UserReducer,
    login: LoginReducer
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
    _id?: string
}