import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from './store'
import {User} from './store'
import axios from 'axios';
import { regist } from "../actions";


const Header = () => {
    const history = useHistory();
    const handleLink = (path: string) => history.push(path);
    const user = useSelector((state:RootState) => state.user)
    const dispatch = useDispatch()

    const logout = (id:string | undefined) => {
        axios.put(`/api/users/logout/${id}`)
        .then(res => {
            const user = res.data
            dispatch(regist(user))
        })
        .catch(err => {
            console.log(new Error(err))
        })
        handleLink('/')
    }


    return (
        <nav>
            <button onClick={() => handleLink('/')}>Home</button>
            <button onClick={() => handleLink('/cart-item')}>ショッピングカート</button>
            {user.login ? 
            <>
            <button onClick={() => handleLink('/order-history')}>注文履歴</button>
            <button onClick={() => logout(user._id)}>ログアウト</button>
            </>
            :
            <>
            <button onClick={() => handleLink('/login')}>ログイン</button>
            <button onClick={() => handleLink('/regist')}>新規登録</button>
            </>
            }
        </nav>
    )
}

export default Header;