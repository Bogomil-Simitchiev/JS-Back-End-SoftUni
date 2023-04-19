const { html } = require("../util");

const homePage = `
<h1>Hello from the home page</h1>
`

function homeController(req, res) {
    res.write(html(homePage));
    res.end();
}

module.exports = homeController;