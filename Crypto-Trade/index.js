const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser')

const app = express();

//setup
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
const notFoundController = require('./controllers/notFound');

const createController = require('./controllers/create');
const editController = require('./controllers/edit');
const detailsController = require('./controllers/details');
const loginController = require('./controllers/login');
const registerController = require('./controllers/register');
const searchController = require('./controllers/search');

app.get('/', homeController);
app.get('/catalog', catalogController);
app.use('/create', createController);
app.use('/edit', editController);
app.use('/details', detailsController);
app.use('/login', loginController);
app.use('/register', registerController);
app.use('/search', searchController);

app.all('*', notFoundController);

app.listen(3000, () => console.log('Server is listening on port 3000'));