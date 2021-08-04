import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from './store';
import { setTopping, setItem, cart } from '../actions/index';
import OrderForm from './OrderForm'
import { Box, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core';


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
            dispatch(cart(orderArray))
        })
    },[user, dispatch])
    
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        if(Object.keys(order).length !== 0){
            const total = order.iteminfo.reduce((a,b) => a + b.price, 0)
            setTotalPrice(total)
        }
    },[order])

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
        <Box mt={10} mx={5}>
            ショッピングカート
            {Object.keys(order).length === 0 ? (
                <div>カートに商品がありません</div>
            ) : (
                <>
                {order.iteminfo.length <= 0 ? (
                <div>カートに商品がありません</div>
                ) : (
                <>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>商品名</TableCell>
                                <TableCell>サイズ、単価</TableCell>
                                <TableCell>個数</TableCell>
                                <TableCell>トッピング</TableCell>
                                <TableCell>削除</TableCell>
                            </TableRow>
                        </TableHead>
                            {order.iteminfo.map((cart) => (
                                <TableBody key={cart._id}>
                                    <TableRow>
                                    {items.filter((item) => {
                                        return cart.itemid === item.id
                                    }).map((i) => (
                                        <React.Fragment key={i._id}>
                                            <TableCell>
                                                <p>{i.name}</p>
                                                <img src={i.imgpath} 
                                                alt="商品画像"
                                                style={{ width: 224, height: 224 }}/>
                                            </TableCell>
                                            <TableCell>
                                            {cart.size === 'M' ? 
                                            <><p>M</p><p>{i.pm}円</p></> : <><p>L</p><p>{i.pl}円</p></>}
                                            </TableCell>
                                            <TableCell>{cart.buynum}</TableCell>
                                            {cart.toppings.length <= 0 ? (
                                                <TableCell>なし</TableCell>
                                            ) : (
                                                <TableCell>
                                                    {cart.toppings.map((topping) => (
                                                <React.Fragment key={topping._id}>
                                                {toppings.filter((top) => {
                                                return topping.topid === top.id
                                                }).map((t) => (
                                                <React.Fragment key={t._id}>
                                                    <React.Fragment><p>{t.name}</p><p>{t.p}円</p></React.Fragment>
                                                </React.Fragment>
                                                ))}
                                                </React.Fragment>
                                            ))}
                                                </TableCell>
                                            )}
                                        </React.Fragment>
                                    ))}
                            <TableCell><Button variant="outlined" onClick={() => deleteCart(cart._id)}>削除</Button></TableCell>
                    </TableRow>
                    </TableBody>
                ))}
                    </Table>
                </TableContainer>
                <p></p>
                <Box textAlign="right" mx={5}>
                <h3>合計金額：{totalPrice.toLocaleString()}円</h3>
                </Box>
                <Button variant="outlined" onClick={() => showOrderForm()}>注文に進む</Button>
                {show && <OrderForm/>}
                </>
                )}
            </>
            )
            }

        </Box>
    )
}

export default CartItem
