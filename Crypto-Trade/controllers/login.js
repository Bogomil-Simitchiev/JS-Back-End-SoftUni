const { body, validationResult } = require('express-validator');

const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/',
    body('email').trim(),
    body('password').trim(),
    body('email')
        .isLength({ min: 10 }).withMessage('The email should be at least ten character long').bail(),
    body('password')
        .isLength({ min: 4 }).withMessage('The password should be at least four characters long').bail(),
    async (req, res) => {
        const info = req.body;
        const { errors } = validationResult(req);

        try {
            if (errors.length > 0) {
                throw errors;
            }
            await req.auth.login(info.email, info.password);
            res.redirect('/');

        } catch (errors) {
            if (errors.message == 'Incorrect email or password!') {
                res.locals.errors = [{ msg: errors.message }];
                res.render('login');
            }else{
                res.render('login', { errors });
            }
        }
    });

module.exports = router;