const express = require('express');
const hbs = require('express-handlebars');

const { home } = require('./controllers/home');
const { about } = require('./controllers/about');
const { details } = require('./controllers/details');
const { notFound } = require('./controllers/notFound');

const carService = require('./services/carService');

const createController = require('./controllers/create');
const deleteController = require('./controllers/delete');
const editController = require('./controllers/edit');


const app = express();

app.engine('hbs', hbs.create({
    extname: '.hbs'
}).engine);

app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));
app.use(carService());

app.get('/', home);
app.get('/about', about);
app.use('/create', createController);


app.route('/delete/:id')
    .get(deleteController.get)
    .post(deleteController.post);

app.route('/edit/:id')
    .get(editController.get)
    .post(editController.post);

app.get('/details/:id', details);


app.all('*', notFound);


app.listen(3000, () => console.log('Server started on port 3000'));