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
        const createId = () => {
            return Math.floor(Math.random() * 101)
        }
        new user({
            email,
            pass,
            login:true,
            userid: createId()
        }).save((err:any) => {
            if (err) res.status(500).send()
            else {
                user.find({},(err, userArray) => {
                    if(err) {
                        res.status(500).send()
                    } else {
                        res.status(200).send(userArray)
                    }
                })
            }
        })
    })

    app.put('/api/users/logout/:id', (req,res) => {
        const id = req.params.id
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

    app.post('/api/orders/cartin/:id', (req,res) => {
        const id = req.params.id
        const cart = {
            ...req.body.cartItem
        }
        new order(cart).save((err:any) => {
            if (err) res.status(500)
            else{
                order.findOne({orderid:id, status:0})
                .then((order:any) => {
                    res.status(200).send(order)
                })
                .catch(() => res.status(500).send())
            }
        })
    })

    app.get('/api/orders/cart/:id', (req,res) => {
        const id = req.params.id
        order.findOne({ orderid: id, status: 0})
        .then((cart:any) => {
            res.status(200).send(cart)
        })
        .catch(() => res.status(500).send())
    })

    app.put('/api/orders/addcart/:id', (req, res) => {
        const id = req.params.id
        order.findOneAndUpdate(
            { orderid: id, status: 0},
            {$push:{iteminfo:req.body.iteminfo}},
            {new:true},
            (err) => {
                if(err) res.status(500).send()
                else{
                    order.findOne({orderid:id, status:0})
                    .then((order:any) => {
                        res.status(200).send(order)
                    })
                    .catch(() => res.status(500).send())
                }
            })
    })

    app.put('/api/orders/delete/:id', (req, res) => {
        const id = req.params.id
        order.findOneAndUpdate(
            {_id: id},
            {$pull:{iteminfo:{_id:req.body.id}}},
            {new:true}
        ).then((cart:any) => {
            res.status(200).send(cart)
        })
        .catch(() => res.status(500).send())
    })

    app.put('/api/orders/order/:id', (req, res) => {
        const id = req.params.id
        const orderinfo = req.body.orderinfo
        order.findOneAndUpdate(
            { orderid:id, status:0 },
            { $set:{
                status:1, 
                name:orderinfo.name,
                email:orderinfo.email,
                zipcode:orderinfo.zipcode,
                address:orderinfo.address,
                tel:orderinfo.tel,
                orderdate:orderinfo.orderdate,
                deliverydate:orderinfo.deliveryDate,
                deliverytime:orderinfo.deliveryTime,
                paymethod:orderinfo.paymethod,
                card:orderinfo.card,
                totalprice:orderinfo.totalprice
                }},
            {new:true},
            (err) => {
                if(err) res.status(500).send()
                else{
                    order.find({orderid:id, status:{$ne:0}})
                    .then((order:any) => {
                        res.status(200).send(order)
                    })
                    .catch(() => res.status(500).send())
                }
            }
        )
    })

    app.get('/api/orders/getorders/:id', (req, res) => {
        const id = req.params.id
        order.find({orderid:id, status:{$ne:0}})
        .then((orders:any) => {
            res.status(200).send(orders)
        })
        .catch(() => res.status(500).send())
    })

    app.put('/api/orders/cancel/:id', (req, res) => {
        const id = req.params.id
        const orderid = req.body.orderid
        order.findByIdAndUpdate(id, {$set:{status:9}},(err) => {
            if(err) res.status(500).send()
            else{
                order.find({orderid:orderid, status:{$ne:0}})
                .then((order:any) => {
                    res.status(200).send(order)
                })
                .catch(() => res.status(500).send())
            }
        })
    })

    app.listen(port, () => {
        console.log('server start')
    })
})