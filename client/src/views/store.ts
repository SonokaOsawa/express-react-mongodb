import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {ItemReducer} from '../reducers/item'
import {ToppingReducer} from '../reducers/topping'

const RootReducer = combineReducers({
    item: ItemReducer,
    topping: ToppingReducer
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
        pm: number,
        pl: number,
        _id: string
}