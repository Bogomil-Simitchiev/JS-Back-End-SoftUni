const { validationResult } = require('express-validator');

const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('register', { title: 'Register'});
});

router.post('/', async (req, res) => {
    
    const info = req.body;
    const { errors } = validationResult(req);

    try {

        if (errors.length > 0) {
            throw errors;
        }

        await req.auth.register(info.username, info.email, info.password);
        res.redirect('/');

    } catch (errors) {

        console.log(errors);

        if (errors.code == 11000) {

            res.render('register', {
                errors: [{ msg: 'Email already exists' }], data: {
                    email: req.body.email
                }
            });
        }
        res.render('register', {
            errors, data: {
                email: req.body.email
            }
        });
    }
});

module.exports = router;