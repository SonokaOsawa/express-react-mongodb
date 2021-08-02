import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from './store';
import { setTopping, setItem, cart } from '../actions/index';
import OrderForm from './OrderForm'


const CartItem = () => {
    const dispatch = useDispatch()
    const items = useSelector((state:RootState) => state.item)
    const toppings = useSelector((state:RootState) => state.topping)
    const user = useSelector((state:RootState) => state.user)
    const order = useSelector((state:RootState) => state.cart)
    useEffect(() => {
        axios.get('/api/items')
        .then(res => {
            const itemArray = res.data
            dispatch(setItem(itemArray))
        })
        .catch(err => {
            console.error(new Error(err))
        })

        axios.get('/api/toppings')
        .then(res => {
            const topArray = res.data
            dispatch(setTopping(topArray))
        })
        .catch(err => {
            console.error(new Error(err))
        })

        const id = user.userid
        axios.get(`/api/orders/cart/${id}`)
        .then(res => {
            const orderArray = res.data
            console.log(orderArray)
            dispatch(cart(orderArray))
        })
    },[user, dispatch])
    
    // useEffect(() => {
    //     const price = order.iteminfo.map(p => p.price)
    //     console.log(price)
    // },[order])
    // if(user.login){
    //     const price = order.iteminfo.map(p => p.price)
    //     console.log(price)
    // }
    // const price = order.iteminfo.map(p => p.price)
    // console.log(price)
    // const totalPrice = order.iteminfo.reduce((a,b) => a + b.price, 0)
    // console.log(totalPrice)

    const deleteCart = (id:string | undefined) => {
        const delOrderId = order._id
        axios.put(`/api/orders/delete/${delOrderId}`,{id})
        .then(res => {
            const orderArray = res.data
            dispatch(cart(orderArray))
        })
    }

    const [show, setShow] = useState(false)
    const showOrderForm = () => {
        if(user.login) {
            setShow(!show)
        }
    }
    return (
        <React.Fragment>
            ショッピングカート
            {Object.keys(order).length === 0 ? (
                <div>カートに商品がありません</div>
            ) : (
                <>
                {order.iteminfo.length <= 0 ? (
                <div>カートに商品がありません</div>
                ) : (
                <>
                {order.iteminfo.map((cart) => (
                    <div key={cart._id}>
                    {items.filter((item) => {
                        return cart.itemid === item.id
                    }).map((i) => (
                        <div key={i._id}>
                            <p>{i.name}</p>
                            <img src={i.imgpath} 
                            alt="商品画像"
                            style={{ width: 224, height: 224 }}/>
                            <p>
                                {cart.size === 'M' ? 
                                <span>{i.pm}円</span> : <span>{i.pl}円</span>}
                            </p>
                            {cart.toppings.map((topping) => (
                                <div key={topping._id}>
                                    {toppings.filter((top) => {
                                        return topping.topid === top.id
                                    }).map((t) => (
                                        <div key={t._id}>
                                            <p>{t.name}</p>
                                            <p>{t.p}円</p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                    <button onClick={() => deleteCart(cart._id)}>削除</button>
                    </div>
                ))}
                <div>合計金額：{}</div>
                <button onClick={() => showOrderForm()}>注文に進む</button>
                {show && <OrderForm/>}
                </>
                )
                }
            </>
            )
            }

        </React.Fragment>
    )
}

export default CartItem
