const { body, validationResult } = require('express-validator');

const { Router } = require('express');

const validOptions = ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'];

const router = Router();

router.get('/', (req, res) => {
    res.render('create', { title: 'Create offer' });
});

router.post('/',
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
        const information = req.body;
        const { errors } = validationResult(req);

        try {
            if (errors.length > 0) {
                throw errors;
            }
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
        } catch (errors) {
            if (errors.code == 11000) {
                res.render('create', {
                    errors: [{ msg: 'Email already exists' }], offer: {
                        name: req.body.name,
                        description: req.body.description,
                        imageUrl: req.body.imageUrl,
                        price: req.body.price
                    }
                });
            }
            res.render('create', {
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