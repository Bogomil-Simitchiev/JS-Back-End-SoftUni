const http = require('http');

function html(body){
return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Node.js</title>
</head>
<body>
<nav>
  <a href="/">Home</a> |
  <a href="/about">About</a> |
  <a href="/catalog">Catalog</a> |
  <a href="/contact">Contact</a> |
</nav>
    ${body}
</body>
</html>
`
}

const homePage = `
<h1>Hello from home page</h1>
`
const aboutPage = `
<h1>About page</h1>
`

const catalogPage = `
<h1>Catalog page</h1>
`

const contactPage = `
<h1>Contact page</h1>
`
const notFoundPage = `
<h1>Not Found</h1>
<a href="/">back</a>
`

function homeController(req, res) {
    res.write(html(homePage));
    res.end();
}
function aboutController(req, res) {
    res.write(html(aboutPage));
    res.end();
}

function catalogController(req, res) {
    res.write(html(catalogPage));
    res.end();
}
function contactController(req, res) {
    res.write(html(contactPage));
    res.end();
}



function defaultController(req, res) {
    res.write(notFoundPage);
    res.end();
}

const routes = {
    '/': homeController,
    '/about': aboutController,
    '/catalog':catalogController,
    '/contact':contactController
}


const server = http.createServer((req, res) => {

    const url = new URL(req.url, `http://${req.headers.host}`);
    const handler = routes[url.pathname];
    if (typeof handler == 'function') {
        handler(req, res);
    } else {
        defaultController(req, res);
    }

})
server.listen(5000);