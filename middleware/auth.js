const User = require('../database/models/User');

module.exports = (req, res, next) => {
    //fetch user from database
    User.findById(req.session.userId, (error, user) => {
        //verify user
        if (error || !user) {
            //else redirect
            return res.redirect('/');
        }

        //if user is valid, permit request
        next()
    })


}