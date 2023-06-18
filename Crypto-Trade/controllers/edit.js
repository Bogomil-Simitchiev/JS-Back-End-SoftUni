const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('edit', { title: 'Edit page'});
});

router.post('/', (req, res) => {
    const information = req.body;
    console.log(information);
    res.render('edit');
});

module.exports = router;