import mongoose from 'mongoose';

mongoose.Promise = global.Promise

const OrderSchema = new mongoose.Schema({
    name: String,
    email: String,
    zipcode: String,
    address: String,
    tel: String,
    time: String,
    paymethod: Number,
    card: String,
    orderdate: String,
    price: Number,
    status: Number,
    iteminfo:{
        buynum: Number,
        itemid: Number,
        size: String,
        toppings:{
            topid: Number,
        }
    }
})

const order = mongoose.model('Order', OrderSchema);

export default order;