const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('details', { title: 'Details' });
});

router.get('/buy', (req, res) => {
    console.log('bought crypto!');
    res.redirect('/details');
});

module.exports = router;