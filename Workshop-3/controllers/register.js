const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
    res.render('register');
});

router.post('/', async (req, res) => {
    const info = req.body;
    try {
        if (info.username == '' || info.password == '') {
            return res.redirect('/register');
        }
        if (info.password !== info.repeatPassword) {
            return res.redirect('/register');
        }

        await req.auth.register(info.username, info.password);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.redirect('/404');
    }

});

module.exports = router;