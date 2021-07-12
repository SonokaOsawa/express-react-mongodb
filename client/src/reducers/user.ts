import {REGIST, LOGIN, CHANGEEMAIL, CHANGEPASS} from '../actions/index';
import {User} from '../views/store';

interface State {
    type: string,
    user: User,
    email: string,
    pass: string
}

const initialState:User = {
    email:'',
    pass:'',
    login:false
}

export const UserReducer = (state:User = initialState, action:State) => {
    switch(action.type){
        case REGIST:
            return action.user
        case CHANGEEMAIL:
            return {
                ...state,
                email: action.email
            }
        case CHANGEPASS:
            return {
                ...state,
                pass: action.pass
            }
        default:
            return state
    }
}