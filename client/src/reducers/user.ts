import {REGIST, CHANGEEMAIL, CHANGEPASS} from '../actions/index';
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
    login:false,
    _id:"0",
    userid: 1
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