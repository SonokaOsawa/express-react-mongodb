import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from "react-router-dom";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { RootState } from './store';
import { setOrders } from '../actions/index';
import { Box, Button, TextField, FormHelperText, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl, MenuItem } from "@material-ui/core";

type Inputs = {
    name: string,
    email: string,
    zipcode: string,
    address: string,
    tel: string,
    date: string,
    time: string,
    paymethod: number,
    card: string
}

const OrderForm = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm<Inputs>();
    const history = useHistory()
    const handleLink = (path: string) => history.push(path)
    const dispatch = useDispatch()
    const user = useSelector((state:RootState) => state.user)
    const order = useSelector((state:RootState) => state.cart)
    const [name, setName] = useState('')
    const changeName = (e:any) => {
        setName(e.target.value)
    }
    const [email, setEmail] = useState('')
    const changeEmail = (e:any) => {
        setEmail(e.target.value)
    }
    const [zipcode, setZipcode] = useState('')
    const changeZipcode = (e:any) => {
        setZipcode(e.target.value)
    }
    const [address, setAddress] = useState('')
    const changeAddress = (e:any) => {
        setAddress(e.target.value)
    }
    const [tel, setTel] = useState('')
    const changeTel = (e:any) => {
        setTel(e.target.value)
    }
    const today = new Date()
    const year = today.getFullYear()
    let month = '';
    if((1 + today.getMonth()) - 10 >= 0){
        month = String(1 + today.getMonth())
    }else if((1 + today.getMonth()) - 10 < 0){
        month = "0" + (1 + today.getMonth())
    }
    let day = ''
    if(today.getDate() - 10 >= 0){
        day = String(today.getDate())
    }else if(today.getDate() - 10 < 0){
        day = "0" + today.getDate()
    }
    const hour = today.getHours()
    const minut = today.getMinutes()
    const orderDate = Number(year + month + day)
    const orderTime = year + "-" + month + "-" + day + "-" + hour + ":" + minut
    const [date, setDate] = useState('')
    const selectedDate = new Date(date)
    const changeDate = (e:any) => {
        setDate(e.target.value)
    }
    const selestedYear = selectedDate.getFullYear()
    let selectedMonth = ""
    if((1 + selectedDate.getMonth()) - 10 >= 0){
        selectedMonth = String(1 + selectedDate.getMonth())
    }else if((1 + selectedDate.getMonth()) - 10 < 0){
        selectedMonth = "0" + (1 + selectedDate.getMonth())
    }
    let selectedDay = ""
    if(selectedDate.getDate() - 10 >= 0){
        selectedDay = String(selectedDate.getDate())
    }else if(selectedDate.getDate() - 10 < 0){
        selectedDay = "0" + selectedDate.getDate()
    }
    const selDate = Number(selestedYear + selectedMonth + selectedDay)
    const [showTime, setShowtime] = useState(false)
    const [showValTime, setShowvaltime] = useState(false)
    
    useEffect(() => {
        if(selDate - orderDate > 0){
            setShowtime(true)
            setShowvaltime(false)
        }else if(orderDate === selDate){
            setShowtime(false)
            setShowvaltime(true)
        }else{
            setShowtime(false)
            setShowvaltime(false)
        }
    },[selDate, orderDate])
    const [paymethod, setPaymethod] = useState(0)
    const changePaymethod = (e:any) => {
        setPaymethod(e.target.value)
    }
    const [card, setCard] = useState('')
    const changeCard = (e:any) => {
        setCard(e.target.value)
    }

    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        if(Object.keys(order).length !== 0){
            const total = order.iteminfo.reduce((a,b) => a + b.price, 0)
            setTotalPrice(total)
        }
    },[order])

    const onSubmit:SubmitHandler<Inputs> = (data) => {
        const orderinfo = {
            name: data.name,
            email: data.email,
            zipcode: data.zipcode,
            address: data.address,
            tel: data.tel,
            orderdate: orderTime,
            deliveryDate: data.date,
            deliveryTime: data.time,
            paymethod: data.paymethod,
            card: data.card,
            totalprice: totalPrice
        }
        const id = user.userid
        axios.put(`/api/orders/order/${id}`, {orderinfo})
        .then(res => {
            const order = res.data
            console.log(order)
            dispatch(setOrders(order))
        })
        handleLink('/order-complete')
    }
    const onError = () => {
        alert("正しく入力してください")
    }
    return (
        <Box textAlign="center">
            お届け先情報
            <Box>
                <TextField {...register("name", {required:true})}　type="text" label="お名前" value={name} onChange={changeName} />
                {errors.name && <FormHelperText>お名前を入力してください</FormHelperText> }
            </Box>
            <Box>
                <TextField {...register("email", {required:true, pattern: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/})} 
                type="email" label="メールアドレス" value={email} onChange={changeEmail} />
                {errors.email && <FormHelperText>メールアドレスを正しく入力してください</FormHelperText>}
            </Box>
            <Box>
                <TextField {...register("zipcode", {required:true, pattern: /^[0-9]{3}-[0-9]{4}$/})}
                label="郵便番号" value={zipcode} onChange={changeZipcode} />
                {errors.zipcode?.type === "required" && <FormHelperText>郵便番号を入力してください</FormHelperText>}
                {errors.zipcode?.type === "pattern" && <FormHelperText>郵便番号はXXX-XXXXの形式で入力してください</FormHelperText>}
            </Box>
            <Box>
                <TextField {...register("address", {required:true})} type="text" label="住所" value={address} onChange={changeAddress} />
                {errors.address && <FormHelperText>住所を入力してください</FormHelperText>}
            </Box>
            <Box>
                <TextField {...register("tel", {required:true, pattern: /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/})}
                label="携帯電話番号" value={tel} onChange={changeTel} />
                {errors.tel?.type === "required" && <FormHelperText>携帯電話番号を入力してください</FormHelperText>}
                {errors.tel?.type === "pattern" && <FormHelperText>携帯電話番号はXXX-XXXX-XXXXの形式で入力してください</FormHelperText>}
            </Box>
            <Box>
                <TextField {...register("date", {required:true, validate: value => (orderDate - selDate) <= 0})} type="date" label="配達希望日" value={date} onChange={changeDate} />
                {errors.date?.type === "required" && <FormHelperText>配達希望日を選択してください</FormHelperText>}
                {errors.date?.type === "validate" && <FormHelperText>過去の日付は選択できません</FormHelperText>}
            </Box>
            {showTime && (
            <Box>
                <Controller 
                name="time" 
                control={control} 
                rules={{required:true}}
                defaultValue="10"
                render={({ field: {value, onChange} }) => (
                    <FormControl>
                    <FormLabel>配達希望時間</FormLabel>
                    <RadioGroup value={value} onChange={onChange}>
                        <FormControlLabel value="10" control={<Radio />} label="10:00" />
                        <FormControlLabel value="11" control={<Radio />} label="11:00" />
                        <FormControlLabel value="12" control={<Radio />} label="12:00" />
                        <FormControlLabel value="13" control={<Radio />} label="13:00" />
                        <FormControlLabel value="14" control={<Radio />} label="14:00" />
                        <FormControlLabel value="15" control={<Radio />} label="15:00" />
                        <FormControlLabel value="16" control={<Radio />} label="16:00" />
                        <FormControlLabel value="17" control={<Radio />} label="17:00" />
                        <FormControlLabel value="18" control={<Radio />} label="18:00" />
                    </RadioGroup>
                    </FormControl>
                )} />
            </Box>
            )}
            {showValTime && (
                <Box>
                    <Controller
                    name="time"
                    control={control} 
                    rules={{required:true, validate: value => Number(value) - hour >= 3 }}
                    defaultValue="10"
                    render={({ field: {value, onChange}}) => (
                    <FormControl>
                    <FormLabel>配達希望時間</FormLabel>
                    <RadioGroup value={value} onChange={onChange}>
                        <FormControlLabel value="10" control={<Radio />} label="10:00" />
                        <FormControlLabel value="11" control={<Radio />} label="11:00" />
                        <FormControlLabel value="12" control={<Radio />} label="12:00" />
                        <FormControlLabel value="13" control={<Radio />} label="13:00" />
                        <FormControlLabel value="14" control={<Radio />} label="14:00" />
                        <FormControlLabel value="15" control={<Radio />} label="15:00" />
                        <FormControlLabel value="16" control={<Radio />} label="16:00" />
                        <FormControlLabel value="17" control={<Radio />} label="17:00" />
                        <FormControlLabel value="18" control={<Radio />} label="18:00" />
                    </RadioGroup>
                    {errors.time?.type === "required" && <FormHelperText>配達希望時間を選択してください</FormHelperText>}
                    {errors.time?.type === "validate" && <FormHelperText>3時間後以降の時間を選択してください</FormHelperText>}
                    </FormControl>
                    )} />
                </Box>
            )}
            <Box>
                <TextField 
                select 
                label="お支払い方法"
                value={paymethod}
                {...register("paymethod", {required:true})}
                onChange={changePaymethod}>
                    <MenuItem value={0}>代金引換</MenuItem>
                    <MenuItem value={1}>クレジットカード</MenuItem>
                </TextField>
            </Box>
            {paymethod === 1 && (
                <Box>
                    <TextField
                    {...register("card", {pattern:/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/})}
                    label="クレジットカード番号"
                    value={card}
                    onChange={changeCard} />
                    {errors.card?.type === "pattern" && <FormHelperText>クレジットカード番号はXXXX-XXXX-XXXX-XXXXの形式で入力してください</FormHelperText>}
                </Box>
            )}
            <Button onClick={handleSubmit(onSubmit,onError)}>この内容で注文する</Button>
        </Box>
    )
}

export default OrderForm