const { body, validationResult } = require('express-validator');

const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('register', { title: 'Register' });
});

router.post('/',
    body('username').trim(),
    body('email').trim(),
    body('password').trim(),
    body('repeatPassword').trim(),
    body('username')
        .isLength({ min: 5 }).withMessage('The username should be at least five characters long').bail(),
    body('email')
        .isLength({ min: 10 }).withMessage('The email should be at least ten character long').bail(),
    body('password')
        .isLength({ min: 4 }).withMessage('The password should be at least four characters long').bail(),
    body('repeatPassword').custom((value, { req }) => {
        return value == req.body.password;
    }).withMessage('The repeat password should be equal to the password'),
    async (req, res) => {

        const info = req.body;
        const { errors } = validationResult(req);

        try {

            if (errors.length > 0) {
                throw errors;
            }

            await req.auth.register(info.username, info.email, info.password);
            res.redirect('/');

        } catch (errors) {
            if (errors.code == 11000) {
                res.render('register', {
                    errors: [{ msg: 'Email already exists' }], data: {
                        email: req.body.email,
                        username: req.body.username
                    }
                });
            }
            res.render('register', {
                errors, data: {
                    email: req.body.email,
                    username: req.body.username
                }
            });
        }

    });

module.exports = router;