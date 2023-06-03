const { Router } = require('express');

const router = Router();

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const car = await req.storage.getCarById(id);
    if (car) {
        res.render('delete', { car });
    } else {
        res.redirect('/404');
    }
});

router.post('/:id', async (req, res) => {
    const id = req.params.id;
    await req.storage.deleteCar(id);
    res.redirect('/');
});

module.exports = router;