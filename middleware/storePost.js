module.exports = (req, res) => {
    console.log(req)
    if (!req.files || !req.body.username || !req.body.title || !req.body.subtitle || !req.body.content) {
        return res.redirect('/posts/new')
    }
        next()
}