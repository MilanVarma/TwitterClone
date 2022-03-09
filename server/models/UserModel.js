import mongoose from 'mongoose';

const UserModel = mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    username:String,
    password:String
})

const Users = mongoose.model("Users",UserModel)
export default Users;