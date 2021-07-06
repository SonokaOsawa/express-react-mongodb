import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios'
// import { State } from '../reducers/item'
import { setItem } from "../actions";

const Home = () => {
    const dispatch = useDispatch()
    const items = useSelector((state:any) => state.item)
    const [array, setArray] = useState(items)
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
    return (
        <React.Fragment>
            Home
            {items.map((item:any) => (
                <div key={item.id}>
                    {item.name}
                    <img
                      style={{ width: 345, height: 200 }}
                      src={item.imgpath}
                      alt="Logo"
                    />
                </div>
                
            ))}            
        </React.Fragment>
    )
}

export default Home;
