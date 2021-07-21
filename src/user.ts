import mongoose from 'mongoose';

mongoose.Promise = global.Promise

const UserSchema = new mongoose.Schema({
    userid: Number,
    email: String,
    pass: String,
    login: Boolean,
    name: String,
    zipcode: String,
    address: String,
    tel: String,
    card: String,
})

const user = mongoose.model('User', UserSchema);

export default user;