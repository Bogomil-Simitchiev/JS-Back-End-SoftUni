const authController = require('../controllers/auth');
const homeController = require('../controllers/home');

module.exports = (app) => {
    app.use(authController);
    app.use(homeController);
}