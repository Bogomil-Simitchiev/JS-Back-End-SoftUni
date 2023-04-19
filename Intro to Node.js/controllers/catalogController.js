const { html, data } = require("../util");

const catalogPage = `
<h1>Catalog page</h1>
<ul>
${data.map(e => `<li>${e.name} -> ${e.price}</li>`)}
</ul>
`

function catalogController(req, res) {
    res.write(html(catalogPage));
    res.end();
}

module.exports = catalogController;