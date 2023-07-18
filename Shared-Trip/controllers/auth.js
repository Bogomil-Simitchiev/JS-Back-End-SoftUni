const { isGuest, isUser } = require('../middlewares/guards');
const { register, login } = require('../services/user');

const router = require('express').Router();

//register controllers

router.get('/register', isGuest(), (req, res) => {
    res.render('register', { title: 'Register' });
})

router.post('/register', isGuest(), async (req, res) => {
    try {
        if (req.body.password.trim() == '') {
            throw new Error('Password is required!');

        }
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match!');
        }

        const user = await register(req.body.email, req.body.password, req.body.gender);
        req.session.user = user;
        res.redirect('/');

    } catch (error) {
        console.log(error);

    }
})

//login controllers

router.get('/login', isGuest(), (req, res) => {
    res.render('login', { title: 'Login' });
})

router.post('/login', isGuest(), async (req, res) => {
    try {

        const user = await login(req.body.email, req.body.password);
        req.session.user = user;
        res.redirect('/');

    } catch (error) {
        console.log(error);

    }
})

router.get('/logout', isUser(), (req, res) => {
    delete req.session.user;
    res.redirect('/');
})


module.exports = router;