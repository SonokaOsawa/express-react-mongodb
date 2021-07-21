import React, { useEffect, useState } from 'react';
import { RootState } from './store';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {login} from '../actions/index';
import {regist} from '../actions/index';

const Login = () => {
    const history = useHistory()
    const handleLink = (path: string) => history.push(path)
    const users = useSelector((state:RootState) => state.login)
    const user = useSelector((state:RootState) => state.user)
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const dispatch = useDispatch()
    let emailError = ''
    let passError = ''
    useEffect(() => {
        axios.get('/api/users')
        .then(res => {
            const userArray = res.data
            dispatch(login(userArray))
        })
        .catch(err => {
            console.log(new Error(err))
        })
        users.forEach((u) => {
            if(email === u.email && pass === u.pass){
                dispatch(regist(u))
            }
        })
        
    },[email,pass])
    
    const changeEmail = (e:any) => {
        setEmail(e.target.value)
    }
    if(email === ''){
        emailError = "メールアドレスを入力して下さい"
    }else if(email === user.email){
        emailError = ''
    }else{
        emailError = "メールアドレスが間違っています"
    }

    
    const changePass = (e:any) => {
        setPass(e.target.value)
    }
    
    if(pass === ''){
        passError = "パスワードを入力して下さい"
    }else if(pass !== user.pass){
        passError = 'パスワードが間違っています'
    }else if(pass === user.pass){
        passError = ""
    }
    
    const handleLogin = (id:string | undefined) => {
        if(email === user.email && pass === user.pass){
            axios.put(`/api/users/login/${id}`)
            .then(res => {
                const user = res.data
                user.forEach((u:any) => {
                    if(u.login){
                        dispatch(regist(u))
                    }
                })
            })
            .catch(err => {
                console.log(new Error(err))
            })
            handleLink('/')
        }else{
            alert("登録した情報を正しく入力してください。登録をしていない方は新規登録ボタンから新規登録してください。")
        }
    }
    return (
        <React.Fragment>
            ログイン
            <p>メールアドレス</p>
            <input value={email} onChange={(e) => changeEmail(e)}/>
            <p>{emailError}</p>
            <p>パスワード</p>
            <input value={pass} onChange={(e) => changePass(e)}/>
            <p>{passError}</p>
            <button onClick={() => handleLogin(user._id)}>ログイン</button>
        </React.Fragment>
    )
}

export default Login;