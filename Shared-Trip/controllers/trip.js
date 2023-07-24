const { isUser } = require('../middlewares/guards');

const { createOffer, getAllOffers, getOfferById, deleteOfferById, editOffer, joinTrip, getOfferAndBuddies } = require('../services/trip');
const { getUserById, putTripOnList } = require('../services/user');

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

    } catch (errors) {

        if (errors.errors) {
            let messages = Object.values(errors.errors).map(m => Object.assign({ msg: m.message }));
            res.locals.errors = messages;
            res.render('trip-create', { title: 'Create offer trip', data: offer });
        } else {
            res.locals.errors = [{ msg: errors.message }];
            res.render('trip-create', { title: 'Create offer trip', data: offer });
        }
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
    const buddies = await getOfferAndBuddies(req.params.id);
    const isUserTheCreator = ownerOfTheOffer._id == req.session.user?._id;
    const isTheUserJoined = offer.buddies.some(b => b == req.session.user?._id);
    const availableSeats = offer.seats - offer.buddies.length;

    const tripers = buddies.buddies.map(b => b.email).join(', ');

    res.render('trip-details', {
        title: 'Details', offer, ownerOfTheOffer,
        isThereUser, isUserTheCreator, isTheUserJoined, availableSeats, tripers
    });
})

router.get('/delete/:id', isUser(), async (req, res) => {
    const offerId = req.params.id;
    const ownerId = req.session.user._id;

    try {
        if (await deleteOfferById(offerId, ownerId)) {
            res.redirect('/trips');
        } else {
            res.redirect('/404');
        }

    } catch (error) {
        console.log(error);
        res.redirect('/404');
    }
})

router.get('/edit/:id', isUser(), async (req, res) => {
    const offerId = req.params.id;
    const offer = await getOfferById(offerId);
    if (offer.owner != req.session.user._id) {
        res.redirect('/404');
    }
    res.render('trip-edit', { offer, title: 'Edit' });
})

router.post('/edit/:id', isUser(), async (req, res) => {
    const offerId = req.params.id;
    const info = req.body;
    const offer = {
        _id: offerId,
        start: info.start,
        end: info.end,
        date: info.date,
        time: info.time,
        carImage: info.carImage,
        carBrand: info.carBrand,
        seats: Number(info.seats),
        price: Number(info.price),
        description: info.description,
        owner: req.session.user._id

    }
    try {

        if (await editOffer(offerId, offer, req.session.user._id)) {
            res.redirect(`/details/${offerId}`);
        } else {
            res.redirect('/404');
        }
    } catch (errors) {
        if (errors.errors) {
            let messages = Object.values(errors.errors).map(m => Object.assign({ msg: m.message }));
            res.locals.errors = messages;
            res.render('trip-edit', { title: 'Edit', offer });
        } else {
            res.locals.errors = [{ msg: errors.message }];
            res.render('trip-edit', { title: 'Edit', offer });
        }
    }
})

router.get('/join/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const user = req.session.user;
    const offer = await getOfferById(id);

    try {
        if (await joinTrip(id, user._id, offer.seats, offer.buddies.length) && await putTripOnList(id, user._id)) {
            res.redirect(`/details/${id}`);
        } else {
            res.redirect('/404');
        }

    } catch (error) {
        console.log(error);
        res.redirect('/404');

    }
})

module.exports = router;