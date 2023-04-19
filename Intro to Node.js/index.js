const http = require('http');
const router = require('./router');
const host = 5000;

const homeController = require('./controllers/homeController');
const aboutController = require('./controllers/aboutController');
const catalogController = require('./controllers/catalogController');
const contactController = require('./controllers/contactController');

const server = http.createServer(router.main);

router.routes['/'] = homeController;
router.routes['/about'] = aboutController;
router.routes['/catalog'] = catalogController;
router.routes['/contact'] = contactController;

server.listen(host);