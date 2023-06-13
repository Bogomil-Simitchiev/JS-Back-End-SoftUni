module.exports = {
     logout(req, res) {
        req.auth.logout();
        res.redirect('/');
    }
}