const express = require('express');
const expressSession = require('express-session');

const app = express();

app.use(expressSession({
    secret: 'Super secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' }
}))

app.get('/', (req, res) => {
    
    if (req.session.visited) {
        req.session.visited++;    
    }else{
        req.session.visited = 1;
    }

    res.send(`<p>Site is visited ${req.session.visited} times</p>`);
})

app.listen(3000, () => console.log('Server is listening on port 3000'));