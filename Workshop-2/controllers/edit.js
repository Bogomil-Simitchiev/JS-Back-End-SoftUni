const { Router } = require('express');

const router = Router();

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const car = await req.storage.getCarById(id);
    try {
        if (car) {
            res.render('edit', { car });
        } else {
            res.redirect('/404');
        }
    } catch (error) {
        console.log(error);
        res.redirect('/404');
    }

});

router.post('/:id', async (req, res) => {
    const id = req.params.id;
    const info = req.body;
    try {
        if (info.name != '' && info.description != '' && info.imageUrl != '' && info.price != '') {
            const car = {
                name: info.name,
                description: info.description,
                imageUrl: info.imageUrl,
                price: Number(info.price),
                id: id,
            }

            await req.storage.editCar(id, car);
            res.redirect('/');
        } else {
            res.redirect('/edit');
        }
    } catch (error) {
        console.log(error);
        res.redirect('/404');
    }

});

module.exports = router;