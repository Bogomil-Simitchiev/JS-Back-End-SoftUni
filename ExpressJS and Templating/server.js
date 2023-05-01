const express = require('express');
const app = express();

const catalogController = require('./catalog');

app.use('/catalog', catalogController);

app.get('/', (req, res) => {
    res.send('Hellp from expressJS! Home page <a href="/create">create page</a> <a href="/catalog">catalog page</a>');
})

app.get('/create', (req, res) => {
    res.send('<form method="POST"><input type="text"><button>submit</button></form> <a href="/">home page</a>');
})

app.post('/create', (req, res) => {
    res.send('succesfully created! <a href="/">home page</a>');
})

app.listen(3000);