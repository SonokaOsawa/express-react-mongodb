import mongoose from 'mongoose';

mongoose.Promise = global.Promise

const OrderSchema = new mongoose.Schema({
    orderid: Number,
    name: String,
    email: String,
    zipcode: String,
    address: String,
    tel: String,
    deliverydate: String,
    deliverytime: String,
    paymethod: Number,
    card: String,
    orderdate: String,
    status: Number,
    iteminfo:[{
        price: Number,
        buynum: Number,
        itemid: Number,
        size: String,
        toppings:[{
            topid: Number,
        }]
    }]
})

const order = mongoose.model('Order', OrderSchema);

export default order;