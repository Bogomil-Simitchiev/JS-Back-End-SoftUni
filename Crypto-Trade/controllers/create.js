const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('create', { title: 'Create offer'});
});

router.post('/', (req, res) => {
    const information = req.body;
    console.log(information);
    res.render('create');
});

module.exports = router;