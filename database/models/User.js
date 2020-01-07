const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
        // unique: true
        // match: [
        //     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        //     'Please add a valid email'
        // ]
    },
    password: {
        type: String,
        required: true
    }
    // createAt: {
    //     type: Date,
    //     default: new Date()
    // }
})

UserSchema.pre('save', async function (next) {
    const user = this;

    //ecrypts user password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    next()
})

module.exports = mongoose.model('User', UserSchema);