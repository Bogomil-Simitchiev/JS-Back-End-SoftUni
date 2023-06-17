const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {
    const info = req.body;
    try {
        await req.auth.login(info.username, info.password);
        res.redirect('/');

    } catch (err) {
        console.log(err);
        res.locals.errors = [{ msg: err.message }];
        res.render('login');
    }

});

module.exports = router;