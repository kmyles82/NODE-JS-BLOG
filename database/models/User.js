const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide your username']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide your email.']
    },
    password: {
        type: String,
        required: [true, 'Please provide your password.']
    }
})

UserSchema.pre('save', async function (next) {
    const user = this;

    //ecrypts user password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    next()
})

module.exports = mongoose.model('User', UserSchema);