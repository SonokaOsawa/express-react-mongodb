import express from 'express';
import mongoose from 'mongoose';
import item from './item';
import topping from './topping';

const app = express()
const port = 3001
const dbUrl = 'mongodb://localhost:27017/coffee'

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

mongoose.connect(dbUrl, 
{ useNewUrlParser: true, useUnifiedTopology: true },
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

    app.listen(port, () => {
        console.log('server start')
    })
})