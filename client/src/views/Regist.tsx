import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RootState } from './store'
import {regist, changeEmail, changePass} from '../actions/index'

type Inputs = {
    email: string,
    pass: string
}

const Regist = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const history = useHistory()
    const handleLink = (path: string) => history.push(path);
    const dispatch = useDispatch()
    const user = useSelector((state:RootState) => state.user)
    let email = user.email
    let pass = user.pass
    
    const onSubmit:SubmitHandler<Inputs> = () => {
        axios.post('/api/users/register',{email, pass})
        .then(res => {
            const userArray = res.data
            userArray.forEach((u:any) => {
                if(u.login){
                    dispatch(regist(u))}
            })
        })
        .catch(err => {
            console.log(new Error(err))
        })
        handleLink('/')
    }
    const onError = () => {
        alert("正しく入力してください")
    }
    return (
        <React.Fragment>
            新規登録
            <p>メールアドレス</p>
            <input {...register("email", {required: true, pattern: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/})} value={email} onChange={(e) => dispatch(changeEmail(e.target.value))}/>
            {errors.email && <p>メールアドレスを正しく入力してください</p>}
            <p>パスワード(※半角英小文字大文字数字をそれぞれ1種類以上含め、6文字以上10文字以下で入力してください)</p>
            <input {...register("pass", {required: true, min: 6, max: 10, pattern:/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{6,10}$/})} value={pass} onChange={(e) => dispatch(changePass(e.target.value))}/>
            {errors.pass && <p>パスワードは半角英小文字大文字数字をそれぞれ1種類以上含め、6文字以上10文字以下で入力してください</p>}
            <button onClick={handleSubmit(onSubmit,onError)}>登録</button>
        </React.Fragment>
    )
}

export default Regist;