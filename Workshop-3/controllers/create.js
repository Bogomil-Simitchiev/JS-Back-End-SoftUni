const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('create');
});

router.post('/', async (req, res) => {
    const info = req.body;
    try {
        if (info.name != '' && info.description != '' && info.imageUrl != '') {
            const car = {
                name: info.name,
                description: info.description,
                imageUrl: info.imageUrl,
                price: Number(info.price),
            }

            await req.storage.createCar(car);
            res.redirect('/');
        } else {
            res.redirect('/404');
        }
    } catch (error) {
        console.log(error);
        res.redirect('/404');
    }

});

module.exports = router;