import express from 'express';
import mongoose from 'mongoose';
import item from './item';
import topping from './topping';
import user from './user';
import order from './order'

const app = express()
const port = 3001
const dbUrl = 'mongodb://localhost:27017/coffee'

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

mongoose.connect(dbUrl, 
{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
(dbError) => {
    if(dbError) {
        console.log(dbError)
        throw new Error(`${dbError}`)
    }else{
        console.log('db connected')
    }

    app.get('/api/items', (req, res) => {
        item.find({}, (err, itemArray) => {
            if(err) {
                res.status(500).send()
            } else {
                res.status(200).send(itemArray)
            }
        })
    })

    app.get('/api/toppings', (req, res) => {
        topping.find({},(err, topArray) => {
            if(err) {
                res.status(500).send()
            } else {
                res.status(200).send(topArray)
            }
        })
    })

    app.get('/api/users', (req,res) => {
        user.find({},(err, userArray) => {
            if(err) {
                res.status(500).send()
            } else {
                res.status(200).send(userArray)
            }
        })
    })

    app.post('/api/users/register', (req,res) => {
        const {email, pass} = req.body
        console.log("新規登録")
        console.log(req.body)
        const createId = () => {
            return Math.floor(Math.random() * 101)
        }
        new user({
            email,
            pass,
            login:true,
            userid: createId()
        }).save((err:any) => {
            if (err) res.status(500)
            else {
                user.find({},(err, userArray) => {
                    if(err) {
                        res.status(500).send()
                    } else {
                        res.status(200).send(userArray)
                        console.log(userArray)
                    }
                })
            }
        })
    })

    app.put('/api/users/logout/:id', (req,res) => {
        const id = req.params.id
        console.log(id)
        console.log("ログアウト")
        user.findByIdAndUpdate(id, {$set:{login:false}}, err =>{
            if (err) res.status(500).send()
            else{
                user.find({}, (err, userArray) => {
                    if(err) {
                        res.status(500).send()
                    } else {
                        res.status(200).send(userArray)
                    }
                })
            }
        })
    })

    app.put('/api/users/login/:id', (req,res) => {
        const id = req.params.id
        console.log(id)
        console.log("ログイン")
        user.findByIdAndUpdate(id, {$set:{login:true}}, (err) => {
            if(err) res.status(500).send()
            else{
                user.find({}, (err, userArray) => {
                    if(err) {
                        res.status(500).send()
                    } else {
                        res.status(200).send(userArray)
                    }
                })
            }
        })
    })

    app.post('/api/orders/cart', (req,res) => {
        console.log("カートに入れる")
        const cart = {
            ...req.body.cartItem
        }
        new order(cart).save((err:any) => {
            if (err) res.status(500)
            else{
                order.find({},(err, orderArray) => {
                    if(err) {
                        res.status(500).send()
                    }else{
                        res.status(200).send(orderArray)
                        console.log(orderArray)
                    }
                })
            }
        })
    })

    app.get('/api/orders/cart/:id', (req,res) => {
        const id = req.params.id
        console.log(id)
        console.log("get cart")
        order.findOne({ orderid: id, status: 0}).then((cart:any) => {
                res.status(200).send(cart)
                console.log(cart)
        })
    })

    app.put('/api/orders/addcart/:id', (req, res) => {
        const id = req.params.id
        console.log(id)
        console.log(req.body.iteminfo)
        console.log("add cart")
        order.findOneAndUpdate(
            { orderid: id, status: 0},
            {$push:{iteminfo:req.body.iteminfo}},
            {new:true}
            ).then((cart:any) => {
                console.log(cart)
                res.status(200).send(cart)
            })
    })

    app.put('/api/orders/delete/:id', (req, res) => {
        const id = req.params.id
        console.log(id)
        console.log(req.body.id)
        console.log("削除")
        order.findOneAndUpdate(
            {_id: id},
            {$pull:{iteminfo:{_id:req.body.id}}},
            {new:true}
        ).then((cart:any) => {
            console.log(cart)
            res.status(200).send(cart)
        })
    })

    app.listen(port, () => {
        console.log('server start')
    })
})