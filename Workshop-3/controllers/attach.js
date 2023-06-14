const { Router } = require('express');

const router = Router();

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    const [car, accessories] = await Promise.all([
        req.storage.getCarById(id),
        req.accessory.getAllAccessories(),
    ]);

    if (car.owner!= req.session.user.id) {
        console.log('User is not the owner!');
        return res.redirect('/login');
    }
    
    const existingIds = car.accessories.map(a => a.id.toString());
    const availableAccessories = accessories.filter(a => existingIds.includes(a.id.toString()) == false);

    res.render('attach', { car, accessories: availableAccessories });
});

router.post('/:id', async (req, res) => {
    const carId = req.params.id;
    const accessoryId = req.body.accessory;
    try {
        if (await req.storage.attachAccessory(carId, accessoryId, req.session.user.id)) {
            res.redirect(`/`);
        } else {
            res.redirect('/login');
        }

    } catch (error) {
        console.log(error);
        res.redirect('/attach' + carId);
    }
});

module.exports = router;