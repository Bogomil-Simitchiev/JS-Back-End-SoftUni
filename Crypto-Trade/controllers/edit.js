const { Router } = require('express');

const router = Router();

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const offer = await req.storage.getCryptoById(id);
    try {

        if (offer.owner != req.session.user.id) {
            console.log('User is not the owner!');
            return res.redirect('/login');
        }

        if (offer) {
            res.render('edit', { offer });
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
        const offer = {
            name: info.name,
            description: info.description,
            imageUrl: info.imageUrl,
            price: Number(info.price),
            payment: info.payment,
            id: id,

        }
        if (await req.storage.editOffer(id, offer, req.session.user.id)) {
            res.redirect(`/details/${id}`);
        } else {
            res.redirect('/login');
        }

    } catch (error) {
        console.log(error);
        res.redirect('/404');
    }
});

module.exports = router;