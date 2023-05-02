const { Router } = require('express');

const router = Router();

const products = [
    { name:'Iphone 10', price:1300},
    { name:'Iphone 9', price:1000},
]

router.get('/', (req, res) => {
    res.locals = {
        products
    }
    res.render('catalog');
})
router.get('/create', (req, res) => {
    res.render('create');
})



module.exports = router;