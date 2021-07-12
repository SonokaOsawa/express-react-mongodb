import mongoose from 'mongoose';

mongoose.Promise = global.Promise

const UserSchema = new mongoose.Schema({
    email: String,
    pass: String,
    login: Boolean
})

const user = mongoose.model('User', UserSchema);

export default user;