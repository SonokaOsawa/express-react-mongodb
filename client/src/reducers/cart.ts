import {CART} from '../actions/index';
import {Order} from '../views/store';

interface State {
    type: string,
    cartList: Order
}

const initialState:Order = {
    iteminfo:[{
        _id: '123',
        price:100,
        buynum:1,
        itemid:1,
        size:'M',
        toppings:[{
            _id: '111',
            topid:1
        }]
    }]
}

export const CartReducer = (state:Order = initialState, action:State) => {
    switch(action.type){
        case CART:
            return action.cartList
        default:
            return state
    }
}