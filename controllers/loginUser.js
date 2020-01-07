const User = require('../database/models/User')
const bcrypt = require('bcrypt')

module.exports = (req, res) => {
    
    const { email, password } = req.body;
    
    //try to find user
    User.findOne({ email: email }, (error, user) => {
        if (user) {
            //compare user password
            bcrypt.compare(password, user.password, (error, samePassword) => {
                //if user password is correct login user
                if (samePassword) {
                    //store user session

                    res.redirect('/');
                } else {
                    //else redirect user back
                    res.redirect('/auth/login');
                }
            })
        } else {
            return res.redirect('/auth/login');
        }
    }) 
}