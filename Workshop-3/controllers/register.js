const { body, validationResult } = require('express-validator');

const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
    res.render('register');
});

router.post('/',
    body('username')
        .notEmpty().withMessage('Username is required!')
        .isLength({ min: 3 }).withMessage('The length of username must be more than 3 symbols'),
    body('password')
        .notEmpty().withMessage('Password is required!'),
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
        } catch (error) {
            console.log(error);
            res.redirect('/register');
        }

    });

module.exports = router;