const { html } = require("../util");

const contactPage = `
<h1>Contact page</h1>
`

function contactController(req, res) {
    res.write(html(contactPage));
    res.end();
}

module.exports=contactController;