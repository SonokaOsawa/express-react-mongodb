import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios'
import { setItem } from "../actions/index";
import { RootState } from './store'

const Home = () => {
    const dispatch = useDispatch()
    const items = useSelector((state:RootState) => state.item)
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
            {items.map((item) => (
                <div key={item.id}>
                    <Link to={`/item-detail/${item.id}`}>
                    <p>{item.name}</p>
                    <p>M:{item.pm}(税込)</p>
                    <p>L:{item.pl}(税込)</p>
                    <img
                      style={{ width: 345, height: 200 }}
                      src={item.imgpath}
                      alt="Pic"
                    />
                    </Link>
                </div>
                
            ))}            
        </React.Fragment>
    )
}

export default Home;
