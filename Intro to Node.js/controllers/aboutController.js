const { html } = require("../util");

const aboutPage = `
<h1>About page</h1>
`

function aboutController(req, res) {
    res.write(html(aboutPage));
    res.end();
}

module.exports=aboutController;