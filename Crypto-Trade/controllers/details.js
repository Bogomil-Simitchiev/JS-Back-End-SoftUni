const { Router } = require('express');

const router = Router();

router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    res.render('details', { title: 'Details' });
});

module.exports = router;