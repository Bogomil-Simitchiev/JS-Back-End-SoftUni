const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('search', { title: 'Search'});
});

router.post('/', (req, res) => {
    
    res.render('search');
});

module.exports = router;