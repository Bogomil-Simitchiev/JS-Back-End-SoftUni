const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
    const offers = await req.storage.getAllCryptos();
    res.render('search', { title: 'Search', offers });
});

router.post('/', (req, res) => {

    res.render('search', { title: 'Search' });
});

module.exports = router;