import {SETITEM} from '../actions/index'
import {Item} from '../views/store'

interface State {
    type: string,
    itemList: Item[]
}

export const ItemReducer = (state:Item[] = [], action:State) => {
    switch(action.type){
        case SETITEM:
            state = []
            const itemArray = action.itemList
            return itemArray
        default:
            return state
    }
}