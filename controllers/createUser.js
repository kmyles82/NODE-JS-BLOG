
module.exports = async (req, res) => {
    console.log(req.session.registrationErrors)
    res.render('register')
}