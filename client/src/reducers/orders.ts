import {SETORDERS} from '../actions/index';
import {Order} from '../views/store';

interface State {
    type: string,
    orderList: Order[]
}

export const OrderReducer = (state:Order[] = [], action:State) => {
    switch(action.type){
        case SETORDERS:
            state = []
            const orderArray = action.orderList
            return orderArray
        default:
            return state
    }
}