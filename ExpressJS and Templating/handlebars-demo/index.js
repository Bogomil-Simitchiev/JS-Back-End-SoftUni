const app = require('express')();

const handlebars = require('express-handlebars');

const hbs = handlebars.create({
    extname: '.hbs',
})

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

let visitors = 0;

const products = [
    { name:'Bogi', age:18 },
    { name:'Angel', age:17 },
    { name:'Gosho', age:12 },
]

app.get('/', (req, res) => {
    res.locals = {
        count: visitors++
    }
    res.render('home');
})
app.get('/catalog', (req, res) => {
    res.locals = {
       products
    }
    res.render('catalog');
})


app.listen(3000);