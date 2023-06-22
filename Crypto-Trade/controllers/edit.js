const { body, validationResult } = require('express-validator');

const { Router } = require('express');

const validOptions = ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'];

const router = Router();

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const offer = await req.storage.getCryptoById(id);
    try {

        if (offer.owner != req.session.user.id) {
            console.log('User is not the owner!');
            return res.redirect('/login');
        }
        res.render('edit', { offer });

    } catch (error) {
        console.log(error);
        res.redirect('/404');
    }
});

router.post('/:id',
    body('name').trim(),
    body('imageUrl').trim(),
    body('price').trim(),
    body('description').trim(),
    body('name')
        .isLength({ min: 2 }).withMessage('The username should be at least five characters long').bail(),
    body('price')
        .isFloat({ min: 0 }).withMessage('Price must be a positive number').bail(),
    body('description')
        .isLength({ min: 10 }).withMessage('The Description should be a minimum of 10 characters long.').bail(),
    body('payment').matches(new RegExp(`^(${validOptions.join('|')})$`)).withMessage('The Payment Method must be one of the options'),
    async (req, res) => {
        const id = req.params.id;
        const info = req.body;

        const { errors } = validationResult(req);
        try {
            if (errors.length > 0) {
                throw errors;
            }
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

        } catch (errors) {
            if (errors.code == 11000) {
                res.render('edit', {
                    errors: [{ msg: 'Email already exists' }], offer: {
                        name: req.body.name,
                        description: req.body.description,
                        imageUrl: req.body.imageUrl,
                        price: req.body.price
                    }
                });
            }
            res.render('edit', {
                errors, offer: {
                    name: req.body.name,
                    description: req.body.description,
                    imageUrl: req.body.imageUrl,
                    price: req.body.price
                }
            });
        }
    });

module.exports = router;