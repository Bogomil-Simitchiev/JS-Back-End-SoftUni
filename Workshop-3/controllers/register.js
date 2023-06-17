const { body, validationResult } = require('express-validator');

const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
    res.render('register');
});

router.post('/',
    body('username').trim(),
    body('password').trim(),
    body('repeatPassword').trim(),
    body('username')
        .isLength({ min: 5 }).withMessage('Username must be at least 5 symbols').bail()
        .isAlphanumeric().withMessage('Only english letters and digits'),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 symbols').bail()
        .isAlphanumeric().withMessage('Only english letters and digits'),
    body('repeatPassword').custom((value, { req }) => {
        return value == req.body.password;
    }).withMessage('Passwords don\'t match'),
    async (req, res) => {
        const info = req.body;
        const { errors } = validationResult(req);

        try {
            if (errors.length > 0) {
                throw errors;
            }
            await req.auth.register(info.username, info.password);
            res.redirect('/');
        } catch (errors) {
            console.log(errors);
            if (errors.code == 11000) {
                res.render('register', {
                    errors: [{ msg: 'Username already exists' }], data: {
                        username: req.body.username
                    }
                });
            }
            res.render('register', {
                errors, data: {
                    username: req.body.username
                }
            });
        }

    });

module.exports = router;