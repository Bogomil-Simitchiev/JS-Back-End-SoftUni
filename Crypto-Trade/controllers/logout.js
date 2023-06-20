module.exports = (req, res) => {
    req.auth.logout();
    res.redirect('/');
}