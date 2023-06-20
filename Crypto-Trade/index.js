const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser')
const session = require('express-session');
const init = require('./models/index');

const app = express();

//database
init();

//setup
app.use(session({
    secret: 'super secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' }
}))
app.engine('hbs', hbs.create({
    extname: '.hbs'
}).engine);
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }));


//controllers
const homeController = require('./controllers/home');
const catalogController = require('./controllers/catalog');
const logoutController = require('./controllers/logout');
const notFoundController = require('./controllers/notFound');

const createController = require('./controllers/create');
const editController = require('./controllers/edit');
const detailsController = require('./controllers/details');
const loginController = require('./controllers/login');
const registerController = require('./controllers/register');
const searchController = require('./controllers/search');

//middlewares
const authMiddleware = require('./middlewares/auth');

app.use(authMiddleware());

app.get('/', homeController);
app.get('/catalog', catalogController);
app.get('/logout', logoutController);
app.use('/create', createController);
app.use('/edit', editController);
app.use('/details', detailsController);
app.use('/login', loginController);
app.use('/register', registerController);
app.use('/search', searchController);

app.all('*', notFoundController);

app.listen(3000, () => console.log('Server is listening on port 3000'));