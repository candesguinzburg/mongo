const mongoose = require ('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    mail:{
        type: String,
        require: true
    }
})
const User = mongoose.model('User', UserSchema)

module.exports = User