// import { reducerWithInitialState } from 'typescript-fsa-reducers';
// import * as actions from '../actions/index';
// import {Item} from '../views/store'
import {SETITEM} from '../actions/index'

// export interface State {
//     items:any
// }

// const initialState: State = {
//     items: []
// }

// export default reducerWithInitialState(initialState)
//     .case(actions.setItem, (state, payload) => ({
//         items: payload.items
//     }))

export default (state:any = [], action:any) => {
    switch(action.type){
        case SETITEM:
            state = []
            const itemArray = action.itemList
            return itemArray
        default:
            return state
    }
}