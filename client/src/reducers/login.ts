import {LOGIN} from '../actions/index';
import {User} from '../views/store';

interface State {
    type: string,
    user: User[]
}

export const LoginReducer = (state:User[] = [], action:State) => {
    switch(action.type){
        case LOGIN:
            state = []
            const UserArray = action.user
            return UserArray
        default:
            return state
    }
}