const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');

const { home } = require('./controllers/home');
const { about } = require('./controllers/about');
const { details } = require('./controllers/details');
const { logout } = require('./controllers/logout');
const { notFound } = require('./controllers/notFound');

const carService = require('./services/carService');
const authService = require('./services/auth');
const accessoryService = require('./services/accessoryService');
const init = require('./models/index');

const createController = require('./controllers/create');
const deleteController = require('./controllers/delete');
const editController = require('./controllers/edit');
const accessoryController = require('./controllers/accessory');
const attachController = require('./controllers/attach');
const loginController = require('./controllers/login');
const registerController = require('./controllers/register');
const { isLoggedIn } = require('./utils/utils');

const app = express();

init();

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
app.use(authService());
app.use(carService());
app.use(accessoryService());

app.get('/', home);
app.get('/about', about);
app.get('/details/:id', details);
app.get('/logout', isLoggedIn() , logout);

app.use('/create', isLoggedIn(), createController);
app.use('/delete', isLoggedIn(), deleteController);
app.use('/edit', isLoggedIn(), editController);
app.use('/accessory', isLoggedIn(), accessoryController);
app.use('/attach', isLoggedIn(), attachController);
app.use('/login', loginController);
app.use('/register', registerController);


app.all('*', notFound);

app.listen(3000, () => console.log('Server started on port 3000'));