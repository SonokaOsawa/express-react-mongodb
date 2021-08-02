import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios'
import { setItem } from "../actions/index";
import { RootState } from './store'
import { TextField, Button } from "@material-ui/core";

const Home = () => {
    const dispatch = useDispatch()
    const items = useSelector((state:RootState) => state.item)
    const [array, setArray] = useState(items)
    const [word, setWord] = useState("")
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
        setArray(items)
    },[items])
    const [noResult, setNoresult] = useState(false)
    const search = () => {
        setArray(items)
        let searchArray = items.filter((item) => {
            return item.name.indexOf(word) >= 0
        })
        setArray(searchArray)
        if(searchArray.length === 0){
            setNoresult(true)
            setArray(items)
        }
    }
    return (
        <React.Fragment>
            <h1>Home</h1>
            <TextField label="商品検索" value={word} onChange={(e) => setWord(e.target.value)} />
            <Button onClick={search}>検索</Button>
            {noResult && (
                <h2>検索ワードに一致する商品はありません</h2>
            )}
            {array.map((item) => (
                <div key={item.id}>
                    <Link to={`/item-detail/${item.id}`}>
                    <p>{item.name}</p>
                    <p>M:{item.pm}(税込)</p>
                    <p>L:{item.pl}(税込)</p>
                    <img
                      style={{ width: 224, height: 224 }}
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
