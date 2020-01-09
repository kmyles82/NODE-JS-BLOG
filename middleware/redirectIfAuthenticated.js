const User = require('../database/models/User');

module.exports = (req, res, next) => {
    //fetch user from database
    if (req.session.userId) {
        return res.redirect('/')
    } else {
        next()
    }

}