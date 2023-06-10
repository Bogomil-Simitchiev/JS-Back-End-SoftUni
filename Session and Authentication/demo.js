const express = require('express');
const expressSession = require('express-session');
const bcrypt = require('bcrypt');

const users = {
    'Peter': {
        username: 'Peter',
        password: '$2b$10$tsZQL3Ew5UGETJFalZZ4ceaFSFqQV8ZJ751Rkhm/ZfU92C8WrU7gO'
    }
}

const app = express();

// body parser
app.use(express.urlencoded({ extended: false }))

// session
app.use(expressSession({
    secret: 'Super secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' }
}))

app.get('/', (req, res) => {
    const user = req.session.user || {
        username: 'Anonymous'
    }
    console.log(users);
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>First page</title>
    </head>
    <body>
        <h2>Hello, ${user.username}</h2>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        <a href="/logout">Logout</a>
    </body>
    </html>`);
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
})
app.post('/login', async (req, res) => {
    const user = users[req.body.username];

    if (user && await bcrypt.compare(req.body.password, user.password)) {
        req.session.user = user;
        console.log(user);
        res.redirect('/');
    }
    else {
        res.status(401).send('Incorrect username or password!');
    }
})

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
})
app.post('/register', async (req, res) => {

    if (users[req.body.username] == undefined) {

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {
            username: req.body.username,
            password: hashedPassword
        }

        users[req.body.username] = user;

        console.log(user);

        res.redirect('/login');
    } else {
        res.status(409).send('User already exists!');
    }
})

app.get('/logout', (req, res) => {
    if (req.session.user) {
        req.session.user = undefined;
    }
    res.redirect('/');
})
app.listen(3000, () => console.log('Server is listening on port 3000'));