const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {
    const info = req.body;
    try {
        if (info.username != '' && info.password != '') {

            await req.auth.login(info.username, info.password);
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.log(error);
        res.redirect('/login');
    }

});

module.exports = router;