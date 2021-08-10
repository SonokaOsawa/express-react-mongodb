import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RootState } from './store'
import {regist, changeEmail, changePass} from '../actions/index'
import { Box, TextField, FormHelperText, Button } from '@material-ui/core';


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
        <Box mt={10} mx={2}>
            <h2>新規登録</h2>
            <TextField {...register("email", {required: true, pattern: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/})}
            label="メールアドレス" value={email} onChange={(e) => dispatch(changeEmail(e.target.value))} style={{width: 400}}/>
            {errors.email && <FormHelperText>メールアドレスを正しく入力してください</FormHelperText>}
            <Box mt={3} mb={1}>
            <div>パスワード(※半角英小文字大文字数字をそれぞれ1種類以上含め、6文字以上10文字以下で入力してください)</div>
            </Box>
            <TextField {...register("pass", {required: true, min: 6, max: 10, pattern:/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{6,10}$/})}
            value={pass} onChange={(e) => dispatch(changePass(e.target.value))} label="パスワード" style={{width: 400}}/>
            {errors.pass && <FormHelperText>パスワードは半角英小文字大文字数字をそれぞれ1種類以上含め、6文字以上10文字以下で入力してください</FormHelperText>}
            <Box mt={2}>
            <Button onClick={handleSubmit(onSubmit,onError)} variant="outlined">新規登録</Button>
            </Box>
        </Box>
    )
}

export default Regist;