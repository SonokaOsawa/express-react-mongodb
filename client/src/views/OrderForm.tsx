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
        alert("?????????????????????????????????")
    }
    return (
        <Box textAlign="center">
            <h3>??????????????????</h3>
            <Box>
                <TextField {...register("name", {required:true})}???type="text" label="?????????" value={name} onChange={changeName} style={{width: 400}}/>
                {errors.name && <FormHelperText>????????????????????????????????????</FormHelperText> }
            </Box>
            <Box mt={2}>
                <TextField {...register("email", {required:true, pattern: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/})} 
                type="email" label="?????????????????????" value={email} onChange={changeEmail} style={{width: 400}}/>
                {errors.email && <FormHelperText>?????????????????????????????????????????????????????????</FormHelperText>}
            </Box>
            <Box mt={2}>
                <TextField {...register("zipcode", {required:true, pattern: /^[0-9]{3}-[0-9]{4}$/})}
                label="????????????" value={zipcode} onChange={changeZipcode} style={{width: 400}}/>
                {errors.zipcode?.type === "required" && <FormHelperText>???????????????????????????????????????</FormHelperText>}
                {errors.zipcode?.type === "pattern" && <FormHelperText>???????????????XXX-XXXX????????????????????????????????????</FormHelperText>}
            </Box>
            <Box mt={2}>
                <TextField {...register("address", {required:true})} type="text" label="??????" value={address} onChange={changeAddress} style={{width: 400}}/>
                {errors.address && <FormHelperText>?????????????????????????????????</FormHelperText>}
            </Box>
            <Box mt={2}>
                <TextField {...register("tel", {required:true, pattern: /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/})}
                label="??????????????????" value={tel} onChange={changeTel} style={{width: 400}}/>
                {errors.tel?.type === "required" && <FormHelperText>?????????????????????????????????????????????</FormHelperText>}
                {errors.tel?.type === "pattern" && <FormHelperText>?????????????????????XXX-XXXX-XXXX????????????????????????????????????</FormHelperText>}
            </Box>
            <Box mt={2}>
                <TextField {...register("date", {required:true, validate: value => (orderDate - selDate) <= 0})} type="date" label="???????????????" value={date} onChange={changeDate} style={{width: 400}}/>
                {errors.date?.type === "required" && <FormHelperText>??????????????????????????????????????????</FormHelperText>}
                {errors.date?.type === "validate" && <FormHelperText>???????????????????????????????????????</FormHelperText>}
            </Box>
            {showTime && (
            <Box mt={2}>
                <Controller 
                name="time" 
                control={control} 
                rules={{required:true}}
                defaultValue="10"
                render={({ field: {value, onChange} }) => (
                    <FormControl>
                    <FormLabel>??????????????????</FormLabel>
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
                <Box mt={2}>
                    <Controller
                    name="time"
                    control={control} 
                    rules={{required:true, validate: value => Number(value) - hour >= 3 }}
                    defaultValue="10"
                    render={({ field: {value, onChange}}) => (
                    <FormControl>
                    <FormLabel>??????????????????</FormLabel>
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
                    {errors.time?.type === "required" && <FormHelperText>?????????????????????????????????????????????</FormHelperText>}
                    {errors.time?.type === "validate" && <FormHelperText>3???????????????????????????????????????????????????</FormHelperText>}
                    </FormControl>
                    )} />
                </Box>
            )}
            <Box mt={2}>
                <TextField 
                select 
                label="??????????????????"
                value={paymethod}
                style={{width: 400}}
                {...register("paymethod", {required:true})}
                onChange={changePaymethod}>
                    <MenuItem value={0}>????????????</MenuItem>
                    <MenuItem value={1}>????????????????????????</MenuItem>
                </TextField>
            </Box>
            {paymethod === 1 && (
                <Box mt={2}>
                    <TextField
                    {...register("card", {pattern:/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/})}
                    label="??????????????????????????????"
                    value={card}
                    style={{width: 400}}
                    onChange={changeCard} />
                    {errors.card?.type === "pattern" && <FormHelperText>?????????????????????????????????XXXX-XXXX-XXXX-XXXX????????????????????????????????????</FormHelperText>}
                </Box>
            )}
            <Box my={2}>
            <Button variant="outlined" onClick={handleSubmit(onSubmit,onError)}>???????????????????????????</Button>
            </Box>
        </Box>
    )
}

export default OrderForm