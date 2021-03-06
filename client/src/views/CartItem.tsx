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
            ???????????????????????????
            {Object.keys(order).length === 0 ? (
                <div>????????????????????????????????????</div>
            ) : (
                <>
                {order.iteminfo.length <= 0 ? (
                <div>????????????????????????????????????</div>
                ) : (
                <>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>?????????</TableCell>
                                <TableCell>??????????????????</TableCell>
                                <TableCell>??????</TableCell>
                                <TableCell>???????????????</TableCell>
                                <TableCell>??????</TableCell>
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
                                                alt="????????????"
                                                style={{ width: 224, height: 224 }}/>
                                            </TableCell>
                                            <TableCell>
                                            {cart.size === 'M' ? 
                                            <><p>M</p><p>{i.pm}???</p></> : <><p>L</p><p>{i.pl}???</p></>}
                                            </TableCell>
                                            <TableCell>{cart.buynum}</TableCell>
                                            {cart.toppings.length <= 0 ? (
                                                <TableCell>??????</TableCell>
                                            ) : (
                                                <TableCell>
                                                    {cart.toppings.map((topping) => (
                                                <React.Fragment key={topping._id}>
                                                {toppings.filter((top) => {
                                                return topping.topid === top.id
                                                }).map((t) => (
                                                <React.Fragment key={t._id}>
                                                    <React.Fragment><p>{t.name}</p><p>{t.p}???</p></React.Fragment>
                                                </React.Fragment>
                                                ))}
                                                </React.Fragment>
                                            ))}
                                                </TableCell>
                                            )}
                                        </React.Fragment>
                                    ))}
                            <TableCell><Button variant="outlined" onClick={() => deleteCart(cart._id)}>??????</Button></TableCell>
                    </TableRow>
                    </TableBody>
                ))}
                    </Table>
                </TableContainer>
                <p></p>
                <Box textAlign="right" mx={5}>
                <h3>???????????????{totalPrice.toLocaleString()}???</h3>
                </Box>
                <Button variant="outlined" onClick={() => showOrderForm()}>???????????????</Button>
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
