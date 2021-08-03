import axios from 'axios';
import React, {useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from './store';
import { setTopping, setItem, setOrders } from '../actions/index';
import {makeStyles} from "@material-ui/core/styles";
import {List, Divider, ListItem, ListItemAvatar, ListItemText, Button, Grid, Box} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    orderList: {
      background: theme.palette.grey["100"],
      margin: '0 auto',
      padding: 32,
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      },
      [theme.breakpoints.up('md')]: {
        width: 768
      }
    },
    list: {
      background: '#fff',
      height: 'auto'
    },
    image: {
      objectFit: 'cover',
      margin: '8px 16px 8px 0',
      height: 96,
      width: 96
    },
    text: {
      width: '100%'
    },
    title: {
      flexGrow: 1,
    }
  }))

const OrderHistory = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const items = useSelector((state:RootState) => state.item)
    const toppings = useSelector((state:RootState) => state.topping)
    const user = useSelector((state:RootState) => state.user)
    const orders = useSelector((state:RootState) => state.order)
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
    },[user, dispatch])

    useEffect(() => {
        const id = user.userid
        axios.get(`/api/orders/getorders/${id}`)
        .then(res => {
            const orderArray = res.data
            dispatch(setOrders(orderArray))
        })
    },[dispatch, user.userid])

    const cancelBtn = (id:string | undefined) => {
        const orderid = user.userid
        axios.put(`/api/orders/cancel/${id}`, {orderid})
        .then(res => {
            const order = res.data
            dispatch(setOrders(order))
        })
    }
    return (
        <Box mt={10}>
            注文履歴
            { orders.length <= 0 ? (
                <div>注文履歴がありません</div>
            ) : (
                <section className="c-section-wrapin">
                    {orders.map(order => (
                        <List className={classes.orderList} key={order._id}>
                            {/* <div className="module-spacer--small" /> */}
                            <div>注文日時：{order.orderdate}</div>
                            {order.iteminfo.map(orderitem => (
                                <List key={orderitem._id}>
                                    {items.filter(ite => {
                                        return orderitem.itemid === ite.id
                                    }).map(item => (
                                        <ListItem className={classes.list} key={item._id}>
                                            <ListItemAvatar>
                                                <img
                                                src={`/${item.imgpath}`} 
                                                width="200" 
                                                height="200" 
                                                style={{objectFit: "cover"}}
                                                alt="itemimage" />
                                            </ListItemAvatar>
                                            <div className={classes.text} />
                                            <div className={classes.text}>
                                                <ListItemText primary={item.name} />
                                                {orderitem.size === "M" ? <span><ListItemText secondary="サイズ：M" /> <ListItemText secondary={"単価：" + item.pm + "円"} /></span> : <span><ListItemText secondary="サイズ：L" /><ListItemText secondary={"単価：" + item.pl + "円"} /></span> }
                                                <ListItemText secondary={"個数：" + orderitem.buynum} />
                                                {orderitem.toppings.length > 1 && <ListItemText primary={"トッピング"} /> }
                                                {orderitem.toppings.map(topping => (
                                                    <div key={topping._id}>
                                                        {toppings.filter(top => {
                                                            return topping.topid === top.id
                                                        }).map(to => (
                                                            <div key={to._id}>
                                                                <ListItemText secondary={to.name} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                        </ListItem>
                                        ))}
                                </List>
                            ))}
                            <div className="module-spacer--extra-extra-small" />
                            <Grid container justifyContent="flex-end">
                                <div>お支払い金額：{order.totalprice.toLocaleString()}円</div>
                            </Grid>
                            <Grid container justifyContent="flex-end">
                                {order.status === 9 ? <div>キャンセル済み</div> : <Button variant="outlined" onClick={() => cancelBtn(order._id)}>キャンセル</Button>}
                            </Grid>
                            <p></p>
                            <Divider />
                        </List>
                    ))}
                </section>
            )}
        </Box>
    ) 
}

export default OrderHistory