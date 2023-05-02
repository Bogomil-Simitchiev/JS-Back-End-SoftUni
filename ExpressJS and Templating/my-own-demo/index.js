const app = require('express')();

const handlebars = require('express-handlebars');

const homeController = require('./src/home');
const catalogRouter = require('./src/catalog');
const aboutController = require('./src/about');

const hbs = handlebars.create({
    extname: '.hbs',
})

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.get('/', homeController);
// this is a router!
app.use('/catalog', catalogRouter);

app.get('/about', aboutController);


app.listen(3000, ()=> console.log('Server is listening on port 3000'));