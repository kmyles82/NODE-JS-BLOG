const User = require('../database/models/User')

module.exports = (req, res) => {
    console.log(req.body)
    User.create(req.body, (error, user) => {
        if (error) {
            return res.redirect('/auth/register')
        }

        res.redirect('/')
    })

}