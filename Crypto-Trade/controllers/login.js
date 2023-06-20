const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/', async (req, res) => {
    const info = req.body;
    try {
        await req.auth.login(info.email, info.password);
        res.redirect('/');

    } catch (err) {
        console.log(err);
        res.locals.errors = [{ msg: err.message }];
        res.render('login', { title: 'Login' });
    }

});

module.exports = router;