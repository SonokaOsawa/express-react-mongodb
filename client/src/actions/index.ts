import {Item, Topping, User} from '../views/store'
export const SETITEM = 'setItem'
export const setItem = (items:Item[]) => {
    return({
        type:SETITEM,
        itemList: items
    })
}

export const SETTOPPING = 'setTopping'
export const setTopping = (toppings:Topping[]) => {
    return({
        type:SETTOPPING,
        toppingList: toppings
    })
}

export const REGIST = 'regist'
export const regist = (user:User) => {
    return ({
        type:REGIST,
        user
    })
}

export const CHANGEEMAIL = 'changeEmail'
export const changeEmail = (email:string) => {
    return ({
        type: CHANGEEMAIL,
        email
    })
}

export const CHANGEPASS = 'changePass'
export const changePass = (pass:string) => {
    return({
        type: CHANGEPASS,
        pass
    })
}

export const LOGIN = 'logIn'
export const logIn = (user:User) => {
    return({
        type:LOGIN,
        user
    })
}