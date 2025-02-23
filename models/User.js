const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        required: true,
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema)