const express = require('express');
const hbs = require('express-handlebars');

const { home } = require('./controllers/home');
const { about } = require('./controllers/about');
const { details } = require('./controllers/details');
const { notFound } = require('./controllers/notFound');

const carService = require('./services/carService');
const accessoryService = require('./services/accessoryService');
const init = require('./models/index');

const createController = require('./controllers/create');
const deleteController = require('./controllers/delete');
const editController = require('./controllers/edit');
const accessoryController = require('./controllers/accessory');
const attachController = require('./controllers/attach');

const app = express();

init();

app.engine('hbs', hbs.create({
    extname: '.hbs'
}).engine);

app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));
app.use(carService());
app.use(accessoryService());

app.get('/', home);
app.get('/about', about);
app.get('/details/:id', details);

app.use('/create', createController);
app.use('/delete', deleteController);
app.use('/edit', editController);
app.use('/accessory', accessoryController);
app.use('/attach', attachController);

app.all('*', notFound);

app.listen(3000, () => console.log('Server started on port 3000'));