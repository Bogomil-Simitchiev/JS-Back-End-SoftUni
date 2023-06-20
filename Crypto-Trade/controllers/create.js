const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('create', { title: 'Create offer'});
});

router.post('/', async (req, res) => {
    const information = req.body;
    try {
        const offer = {
            name: information.name,
            imageUrl: information.imageUrl,
            price: Number(information.price),
            description: information.description,
            payment: information.payment,     
            owner: req.session.user.id
        }

        await req.storage.createCryptoOffer(offer);
        res.redirect('/catalog');
    } catch (error) {
        console.log(error);
        res.redirect('/404');
    }
});

module.exports = router;