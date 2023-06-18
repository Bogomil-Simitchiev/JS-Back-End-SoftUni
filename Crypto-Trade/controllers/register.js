const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('register', { title: 'Register'});
});

router.post('/', (req, res) => {
    
    res.render('register');
});

module.exports = router;