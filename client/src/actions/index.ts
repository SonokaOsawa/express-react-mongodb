import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

// export const setItem = actionCreator<{items:any}>('SET_ITEM');
export const setTopping = actionCreator('SET_TOPPING')

export const SETITEM = 'setItem'
export const setItem = (items:any) => {
    return({
        type:SETITEM,
        itemList: items
    })
}