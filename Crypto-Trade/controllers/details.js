const { Router } = require('express');

const router = Router();

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const cryptoOffer = await req.storage.getCryptoById(id);
    if (req.session.user) {
        cryptoOffer.isLoggedin = true;
        if (cryptoOffer.buyers.includes(req.session.user.id)) {
            cryptoOffer.boughtCrypto = true;     
        }    
    }
    if (req.session.user && req.session.user.id == cryptoOffer.owner) {
        cryptoOffer.isOwner = true;
    }
   
    res.render('details', { title: 'Details', cryptoOffer });
});

module.exports = router;