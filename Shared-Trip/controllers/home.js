const { isUser } = require('../middlewares/guards');
const { getAllOffersForCurrentUser } = require('../services/trip');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home', { title: 'Home page' });
})

router.get('/profile', isUser(), async (req, res) => {
    const isMaleOrFemale = res.locals.user.gender;
    const user = req.session.user;
    const offersForCurrentUser = await getAllOffersForCurrentUser(user._id);

    res.render('profile', { title: 'Home page', isMaleOrFemale, user, offersForCurrentUser });
})

module.exports = router;