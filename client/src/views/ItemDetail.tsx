import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setTopping, setItem } from '../actions/index';
import axios from 'axios';
import { RootState, Item } from './store';
import TextField from '@material-ui/core/TextField';

const ItemDetail = () => {
    const {item_id}:{item_id:string} = useParams()
    const dispatch = useDispatch()
    const items = useSelector((state:RootState) => state.item)
    const toppings = useSelector((state:RootState) => state.topping)
    useEffect(() => {
        axios.get('/api/items')
        .then(res => {
            const itemArray = res.data
            dispatch(setItem(itemArray))
        })
        .catch(err => {
            console.error(new Error(err))
        })
    },[])
    useEffect(() => {
        axios.get('/api/toppings')
        .then(res => {
            const topArray = res.data
            dispatch(setTopping(topArray))
        })
        .catch(err => {
            console.error(new Error(err))
        })
    },[])
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
    }else if(size == 'L'){
        totalPrice = (item.pl + (200 * topM) + (300 * topL)) * buyNum
    }
    
    const handleCartIn = () => {

    }

    return (
        <React.Fragment>
            商品詳細
                <p>{item.name}</p>
                <p>
                    <img
                    style={{ width: 345, height: 200 }}
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
                数量
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