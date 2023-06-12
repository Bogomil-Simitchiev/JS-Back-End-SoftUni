const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {
    const info = req.body;
    try {
        if (info.username != '' && info.password != '') {
            const user = {
                username: info.username,
                password: info.password,
            }

            console.log(user);
            res.redirect('/');
        } else {
            res.redirect('/edit');
        }
    } catch (error) {
        console.log(error);
        res.redirect('/404');
    }

});

module.exports = router;