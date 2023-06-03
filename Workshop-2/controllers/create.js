const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('create');
});

router.post('/', async (req, res) => {
    const info = req.body;
    if (info.name != '' && info.description != '' && info.imageUrl != '' && info.price != '') {
        const car = {
            name:info.name,
            description:info.description,
            imageUrl:info.imageUrl,
            price: Number(info.price),
        }

        await req.storage.createCar(car);
        res.redirect('/');
    }else{
        res.redirect('/create');
    }
});

module.exports = router;