const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const tripController = require('../controllers/trip');
const notFoundController = require('../controllers/notFound');


module.exports = (app) => {
    app.use(authController);
    app.use(homeController);
    app.use(tripController);
    app.all('*', notFoundController);
}