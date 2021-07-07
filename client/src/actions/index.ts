import {Item, Topping} from '../views/store'
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