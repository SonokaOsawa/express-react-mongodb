import React, { useEffect, useState } from "react";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios'
import { setItem } from "../actions/index";
import { RootState } from './store'
import { TextField, IconButton, ImageList, ImageListItem, ImageListItemBar, Box } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    imageList: {
      width: 900,
      height: 640,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }),
);

const Home = () => {
    const classes = useStyles();
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
        <Box mt={10}>
            <Box textAlign="center">
            <TextField label="検索" value={word} onChange={(e) => setWord(e.target.value)} style={{width:200}} variant="outlined"/>
            <IconButton onClick={search}>
                <SearchIcon/>
            </IconButton>
            </Box>
            <Box mt={2}>
            {noResult && (
                <h2>検索ワードに一致する商品はありません</h2>
            )}
            <div className={classes.root}>
                <ImageList rowHeight={300} className={classes.imageList}>
                {array.map((item) => (
                    <ImageListItem key={item.id}>
                        <Link to={`/item-detail/${item.id}`}>
                        <img
                        src={item.imgpath}
                        alt="Pic"
                        />
                        <ImageListItemBar
                            title={item.name }
                            subtitle={<span>M:{item.pm}円(税込)　L:{item.pl}円(税込)</span>}
                        />
                        </Link>
                    </ImageListItem>
                ))}
                </ImageList>
            </div>
            </Box>      
        </Box>
    )
}

export default Home;
