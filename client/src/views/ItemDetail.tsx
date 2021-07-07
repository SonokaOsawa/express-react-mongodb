import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setTopping, setItem } from '../actions/index'
import axios from 'axios';
import { RootState } from './store'

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
    console.log(item_id)
    const itemId = parseInt(item_id)
    console.log(itemId)
    
    return (
        <React.Fragment>
            商品詳細
            {items.filter((item) =>{
                return item.id === parseInt(item_id)
            }).map((it) => (
                <div key={it.id}>
                    <p>{it.name}</p>
                    <p>
                        <img
                        style={{ width: 345, height: 200 }}
                        src={`/${it.imgpath}`}
                        alt="Pic"
                        />
                    </p>
                    <p>{it.des}</p>
                    
              </div>
            ))}
            <p>トッピング</p>
            {toppings.map((top:any) => (
                <div key={top.id}>
                    {top.name}
                    
                </div>
            ))}
        </React.Fragment>
    )
}

export default ItemDetail