import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState, User } from './store'
import axios from 'axios';
import { regist } from "../actions";
import { AppBar, Button, Toolbar } from "@material-ui/core";

const Header = () => {
    const history = useHistory();
    const handleLink = (path: string) => history.push(path);
    const user = useSelector((state:RootState) => state.user)
    const dispatch = useDispatch()

    const logout = (id:string | undefined) => {
        axios.put(`/api/users/logout/${id}`)
        .then(res => {
            const initialState:User = {
                email:'',
                pass:'',
                login:false,
                _id:"0",
                userid: 1
            }
            dispatch(regist(initialState))
        })
        .catch(err => {
            console.log(new Error(err))
        })
        handleLink('/')
    }


    return (
        <AppBar>
            <Toolbar>
                <nav>
                    <Button  color="inherit" onClick={() => handleLink('/')}>Home</Button>
                    {user.login ? 
                    <>
                    <Button color="inherit" onClick={() => handleLink('/cart-item')}>ショッピングカート</Button>
                    <Button color="inherit" onClick={() => handleLink('/order-history')}>注文履歴</Button>
                    <Button color="inherit" onClick={() => logout(user._id)}>ログアウト</Button>
                    </>
                    :
                    <>
                    <Button color="inherit" onClick={() => handleLink('/login')}>ログイン</Button>
                    <Button color="inherit" onClick={() => handleLink('/regist')}>新規登録</Button>
                    </>
                    }
                </nav>
            </Toolbar>
        </AppBar>
    )
}

export default Header;