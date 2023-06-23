const { Router, query } = require('express');

const router = Router();

router.get('/', async (req, res) => {
    const offers = await req.storage.getAllCryptos();
    res.render('search', { title: 'Search', offers });
});

router.post('/', async (req, res) => {
    const offers = await req.storage.getCryptosBySearch(req.body);
    res.render('search', { title: 'Search', offers, info: { name: req.body.name } });
});

module.exports = router;