import {SETTOPPING} from '../actions/index'
import {Topping} from '../views/store'

interface State {
    type: string,
    toppingList: Topping[]
}
export const ToppingReducer = (state:Topping[] = [], action:State) => {
    switch(action.type){
        case SETTOPPING:
            state = []
            const toppingArray = action.toppingList
            return toppingArray
        default:
            return state
    }
}