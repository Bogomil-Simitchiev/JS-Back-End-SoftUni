const { isUser } = require('../middlewares/guards');

const { createOffer, getAllOffers, getOfferById, deleteOfferById } = require('../services/trip');
const { getUserById } = require('../services/user');

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

router.get('/details/:id', async (req, res) => {
    const isThereUser = req.session.user ? true : false;
    const offer = await getOfferById(req.params.id);
    const ownerOfTheOffer = await getUserById(offer.owner);
    const isUserTheCreator = ownerOfTheOffer._id == req.session.user?._id;
    let availableSeats = offer.seats - offer.buddies.length > 0;
    let currentSeats = offer.seats - offer.buddies.length;

    const didUserJoinedTheTrip = offer.buddies.find(buddy => buddy == req.session.user?.id);

    res.render('trip-details', {
        title: 'Details', offer, ownerOfTheOffer,
        isThereUser, isUserTheCreator, availableSeats, currentSeats: 0
    });
})

router.get('/delete/:id', async (req, res) => {
    const offerId = req.params.id;
    const ownerId = req.session.user._id;

    try {
        if (await deleteOfferById(offerId, ownerId)) {
            res.redirect('/trips');
        } else {
            res.redirect('/login');
        }

    } catch (error) {
        console.log(error);
        res.redirect('/404');
    }
})

module.exports = router;