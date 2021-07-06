import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from '../actions/index';

const initialState = {
    topping: []
}

export default reducerWithInitialState(initialState)
    .case(actions.setTopping, (state) => ({
        ...state
    }))