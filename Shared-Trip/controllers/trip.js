const { isUser } = require('../middlewares/guards');

const router = require('express').Router();

router.get('/offer', isUser(), (req, res) => {
    res.render('trip-create', { title: 'Create offer trip' });
})

module.exports = router;