const { isUser } = require('../middlewares/guards');

const { createOffer, getAllOffers } = require('../services/trip');

const router = require('express').Router();

router.get('/offer', isUser(), (req, res) => {
    res.render('trip-create', { title: 'Create offer trip' });
})

router.post('/offer', isUser(), async (req, res) => {
    const offer = {
        start: req.body.start,
        end: req.body.end,
        date: req.body.date,
        time: req.body.time,
        carImage: req.body.carImage,
        carBrand: req.body.carBrand,
        seats: Number(req.body.seats),
        price: Number(req.body.price),
        description: req.body.description,
        owner: req.session.user._id,
    }
    try {
        await createOffer(offer);
        res.redirect('/trips');
    } catch (error) {
        console.log(error);
        res.redirect('/offer');
    }
})

router.get('/trips', async (req, res) => {
    const offers = await getAllOffers();
    res.render('shared-trips', { title: 'Trips', offers });
})

module.exports = router;