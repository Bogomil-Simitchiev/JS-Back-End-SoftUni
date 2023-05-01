const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello from catalog page <a href="/">home page</a> <a href="/catalog/someProductHere">product page</a>');
})

router.get('/:id', (req, res) => {
    res.send(`Hello from current product ${req.params.id} <a href='/'>home page</a>`);
})

module.exports = router;