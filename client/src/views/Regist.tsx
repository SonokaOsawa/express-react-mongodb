import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { RootState } from './store'
import {regist, changeEmail, changePass} from '../actions/index'

const Regist = () => {
    const history = useHistory()
    const handleLink = (path: string) => history.push(path);
    const dispatch = useDispatch()
    const user = useSelector((state:RootState) => state.user)
    let email = user.email
    let pass = user.pass
    console.log(email)
    console.log(pass)
    console.log(user)
    // const changeEmail = (e:any) => {
    //     email = e.target.value
    // }
    // const changePass = (e:any) => {
    //     pass = e.target.value
    // }
    const newRegist = () => {
        axios.post('/api/users',{email,pass})
        .then(res => {
            const user = res.data
            if(user.login){
            dispatch(regist(user))}
        })
        .catch(err => {
            console.log(new Error(err))
        })
        handleLink('/')
        email = ''
        pass = ''
    }
    return (
        <React.Fragment>
            新規登録
            <p>メールアドレス</p>
            <input type='text' value={email} onChange={(e) => dispatch(changeEmail(e.target.value))}/>
            <p>パスワード</p>
            <input type='text' value={pass} onChange={(e) => dispatch(changePass(e.target.value))}/>
            <button onClick={() => {newRegist()}}>登録</button>
        </React.Fragment>
    )
}

export default Regist;