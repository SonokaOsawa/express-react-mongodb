import mongoose from 'mongoose';

mongoose.Promise = global.Promise

const ItemSchema = new mongoose.Schema({
    id: Number,
    name: String,
    des: String,
    pm: Number,
    pl: Number,
    imgpath: String
})

const item = mongoose.model('Item', ItemSchema);

export default item;