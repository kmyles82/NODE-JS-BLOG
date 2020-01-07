module.exports = (req, res) => {
    if (req.session.userID) {
        res.render('create')
    }

    res.redirect('/auth/login');
}