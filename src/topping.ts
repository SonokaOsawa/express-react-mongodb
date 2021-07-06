import mongoose from 'mongoose';

mongoose.Promise = global.Promise

const ToppingSchema = new mongoose.Schema({
    id: Number,
    name: String,
    pm: Number,
    pl: Number
})

const topping = mongoose.model('Topping', ToppingSchema);

export default topping;