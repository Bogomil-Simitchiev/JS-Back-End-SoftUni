const routes = {};

const notFoundPage = `
<h1>404 Not Found</h1>
<a href="/">back</a>
`

function defaultController(req, res) {
    res.write(notFoundPage);
    res.end();
}

function main(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const handler = routes[url.pathname];
    if (typeof handler == 'function') {
        handler(req, res);
    } else {
        defaultController(req, res);
    }
}

module.exports = {
    routes,
    main
}