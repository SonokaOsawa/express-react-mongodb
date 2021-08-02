import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setTopping, setItem, cart } from '../actions/index';
import axios from 'axios';
import { RootState, Item } from './store';
import TextField from '@material-ui/core/TextField';

const ItemDetail = () => {
    const history = useHistory()
    const handleLink = (path: string) => history.push(path)
    const {item_id}:{item_id:string} = useParams()
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
    },[dispatch])

    useEffect(() => {
        axios.get('/api/toppings')
        .then(res => {
            const topArray = res.data
            dispatch(setTopping(topArray))
        })
        .catch(err => {
            console.error(new Error(err))
        })
    },[dispatch])

    useEffect(() => {
        const id = user.userid
        axios.get(`/api/orders/cart/${id}`)
        .then(res => {
            const orderArray = res.data
            console.log(orderArray)
            dispatch(cart(orderArray))
        })
    },[user, dispatch])
    let item:Item = {
        id:1,
        name:'',
        des:'',
        pm:100,
        pl:100,
        imgpath:'',
        _id:''
    }
    items.forEach((i) => {
        if(i.id === parseInt(item_id)){
            item = i
        }
    })
    const [size, setSize] = useState('M')
    const changeSize = (e:any) => {
        setSize(e.target.value)
    }
    interface Top {
        topid:number
    }
    let sample:Top[] = []
    const [topp, setTopp] = useState(sample)
    const addTop = (e:any) => {
        if(e.target.checked) {
            let selectedTop = [...topp, {topid:Number(e.target.value)}]
            setTopp(selectedTop)
        }else if(!e.target.checked) {
            let selectedTop = topp.filter(val => val.topid !== Number(e.target.value))
            setTopp(selectedTop)
        }
    }
    const [buyNum, setBuyNum] = useState(1)
    const changebuyNum = (e:any) => {
        setBuyNum(e.target.value)
    }
    let totalPrice = item.pm
    let topM = 0
    let oddTop = topp.filter(top => top.topid % 2 !== 0)
    topM = oddTop.length
    let topL = 0
    let evenTop = topp.filter(top => top.topid % 2 === 0)
    topL = evenTop.length
    if(size === 'M'){
        totalPrice = (item.pm + (200 * topM) + (300 * topL)) * buyNum
    }else if(size === 'L'){
        totalPrice = (item.pl + (200 * topM) + (300 * topL)) * buyNum
    }
    const handleCartIn = () => {
        if(user.login){
            const cartItem = {
                orderid: user.userid,
                status: 0,
                iteminfo:[{
                    price: totalPrice,
                    buynum: buyNum,
                    itemid: item.id,
                    size: size,
                    toppings: topp
                }]
            }
            const iteminfo = {
                price:totalPrice,
                buynum: buyNum,
                itemid: item.id,
                size: size,
                toppings: topp
            }
            if(Object.keys(order).length !== 0){
                const id = user.userid
                axios.put(`/api/orders/addcart/${id}`, {iteminfo})
                .then(res => {
                    const orderArray = res.data
                    dispatch(cart(orderArray))
                })
            }else {
                const id = user.userid
                axios.post(`/api/orders/cartin/${id}`,{cartItem})
                .then(res => {
                    const orderArray = res.data
                    console.log(orderArray)
                    dispatch(cart(orderArray))
                })
            }
            // alert("ショッピングカートに商品を追加しました")
            handleLink('/cart-item')
        }else{
            alert("ログインしてください。会員登録がまだの方は新規登録をお願いします。")
        }
    }
    return (
        <React.Fragment>
            商品詳細
                <p>{item.name}</p>
                <p>
                    <img
                    src={`/${item.imgpath}`}
                    alt="Pic"
                    />
                </p>
                <p>{item.des}</p>
                <p>サイズ
                    <label>
                        <input type='radio' value='M' onChange={(e) => {changeSize(e)}} checked={size === 'M'}/>
                        <span>M {item.pm}円</span>
                    </label>
                    <label>
                        <input type='radio' value='L'checked={size === 'L'} onChange={(e) => {changeSize(e)}}/>
                        <span>L {item.pl}円</span>
                    </label>
                </p>
            <p>トッピング</p>
            {toppings.map((top) => (
                <div key={top.id}>
                    <label>
                        <input type='checkbox' value={top.id} onChange={(e) => addTop(e)}/>
                        <span>{top.size} {top.name} {top.p}円</span>
                    </label>
                </div>
            ))}
            <div>
                個数
                <TextField
                id='outlined-number'
                type='number'
                value={buyNum}
                InputProps={{ inputProps: { min: 1, max: 10 } }}
                onChange={(e) => { changebuyNum(e) }}
                />
            </div>
            <p>合計金額:{totalPrice.toLocaleString()}円</p>
            <button onClick={handleCartIn}>カートに入れる</button>
        </React.Fragment>
    )
}

export default ItemDetail